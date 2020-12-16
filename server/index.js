const { ApolloServer} = require('apollo-server');
const { importSchema } = require('graphql-import');
const ArticleDatasource = require('../datasource/api/articleDatasource');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = importSchema('../typeDefs/schema.graphql');

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    // 記事情報を全件取得するクエリ
    articles: async(_source, {}, { dataSources }) => {
      return dataSources.articleDatasource.getArticles();
    }
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ 
  typeDefs, 
  resolvers, 
  tracing: true, 
  dataSources: () => {
    return {
      articleDatasource: new ArticleDatasource(),
    };
  },
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
