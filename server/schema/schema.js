const graphql = require('graphql');
const _ = require('lodash');

const { 
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLID,
  GraphQLList
} = graphql;

// Dummy data 
const books = [
  {name: 'Name of the Wind', genre:'Fantasy', id: '1', authorId: '1'},
  {name: 'The Final Empyre', genre:'Fantasy', id: '2', authorId: '2'},
  {name: 'The long Earth', genre:'Sci-Fi', id: '3', authorId: '3'},
  {name: 'The Hero of Ages', genre:'Fantasy', id: '4', authorId: '2'},
  {name: 'The Colour of Magic', genre:'Sci-Fi', id: '5', authorId: '3'},
  {name: 'The Light Fantastic', genre:'Sci-Fi', id: '6', authorId: '3'}
];

const authors = [
  {name: 'Patrik Rothfuss', age: 44, id: '1'},
  {name: 'Brandon Sanderson', age: 42, id: '2'},
  {name: 'Terry Pratchett', age: 66, id: '3'}
]

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
        return _.find(authors, { id: authorId });
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
        return _.filter(books, {authorId: id})
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
        // Code to get data from DB or other source
        const { id = '' } = args;
        return _.find(books, { id });
      }
    },
    author: {
      type: AuthorType,
      args: {id: {type: GraphQLID}},
      resolve(parent, args){
        const { id = '' } = args;
        return _.find(authors, { id });
      }
    },
    books: {
      type: GraphQLList(BookType),
      resolve(parent, args){
        return books
      }
    },
    authors: {
      type: GraphQLList(AuthorType),
      resolve(parent, args){
        return authors
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})