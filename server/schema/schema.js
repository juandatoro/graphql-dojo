const graphql = require('graphql');
const _ = require('lodash');
const Book = require('../../models/book');
const Author = require('../../models/author');

const { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: ()=>({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType, 
      resolve(parent, args){
        const { authorId = '' } = parent
        return Author.findById(authorId);
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: ()=>({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        const { id = '' } = parent;
        return Book.find({
          authorId: id
        });
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    book: {
      type: BookType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        const { id = '' } = args;
        return Book.findById(id);
      }
    },
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        const { id = '' } = args;
        return Author.findById(id);
      }
    },
    books: {
      type: GraphQLList(BookType),
      resolve(parent, args){
        return Book.find({});
      }
    },
    authors: {
      type: GraphQLList(AuthorType),
      resolve(parent, args){
        return Author.find({});
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) }
      },
      resolve(parent, args){
        const { name, age } = args
        let author = new Author({
          name,
          age
        });
        return author.save();
      }
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args){
        const { name, genre, authorId } = args;
        let book = new Book({
          name,
          genre,
          authorId
        });
        return book.save();
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})