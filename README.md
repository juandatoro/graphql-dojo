# graphql-dojo

This repo is for learning GrapQL. This repo is based on the course from <https://github.com/iamshaunjp/graphql-playlist>

## What it is

Is a query language used to transfer data between the server and the client, is more efficient that the normal REST API

The greatest advantage is that we can have access to a lot of nested information in a single request.

## Tools

### Graphiql

Is a dummy front-end app where we can test our graphql queries

The schema that is inside graphqlHTTP is what tells grapql about the data and hou the graph looks.
The schema is the structure that descrives the relatinos between the data.

First we have to define the object types
the schema has 3 main tasks:

- Define types
- Define relations between types
- Define root queries this is how we descrive how the user jumps into the graph and grab data

### Root Query

### Mutations

Mutations is what allows us to mutate data, add data, delete data, edit data. We have to explicit declare the mutations

```js
mutation {
  addAuthor(name: "Juan", age:29){
    name
    age
  }
}

mutation {
  addBook(
    name: "React Instructions", 
    genre: "Tecnical data",
    authorId: "5d6f3da1734c243cb8c603c6" 
  ){
    name
    genre
  }
}
```
