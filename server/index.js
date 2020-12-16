const { ApolloServer, gql } = require('apollo-server');
const { RESTDataSource } = require('apollo-datasource-rest');

class BooksApi extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://books-api/'
  }

  async getBook(id) {
    return this.get(`books/${id}`);
  }
}

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: Author
  }

  type Author {
    name: String
    age: Int
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
    authors: [Author]
    user(id: ID!): User
  }

  type User {
    id: ID!
    name:String
  }
`;

// booksのサンプルデータ
const books = [
  {
    title: 'The Awakening',
    author: {
      name: 'Kate Chopin',
      age: 23
    },
  },
  {
    title: 'City of Glass',
    author: {
      name: 'Paul Auster',
      age: 28
    },
  },
];

// userのサンプルデータ
const users = [
  {
    id: '1',
    name: 'Elizabeth'
  },
  {
    id: '2',
    name: 'Fitzwilliam'
  }
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
      user(parent, args, context, info) {
        return users.find(user => user.id === args.id);
      },
      books: () => books,
    },
  };

  // The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers, tracing: true });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
