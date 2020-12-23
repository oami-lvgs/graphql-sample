import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { importSchema } from 'graphql-import';
import { ArticleDatasource } from '../datasource/api/articleDatasource';
import { PrismaClient } from '@prisma/client';

const app = express();
const port = 4000;

app.use(cors());

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = importSchema('./typeDefs/schema.graphql');

const prisma = new PrismaClient();

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    // 記事情報(API)を全件取得するクエリ
    // {
    //   articles {
    //     id
    //     title
    //   }
    // }
    // TODO: 引数の型調べる
    articles: async(_source: any, {}: any, { dataSources }: any) => {
      return dataSources.articleDatasource.getArticles();
    },
    // DBから全件取得するクエリ
    // ex) 呼び出し
    // {
    //   hatenurse_contents {
    //     id
    //     title
    //   }
    // }
    hatenurse_contents: async() => {
      return prisma.hatenurse_contents.findMany();
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ 
  typeDefs, 
  resolvers, 
  context: {
    prisma
  },
  tracing: true, 
  dataSources: () => {
    return {
      articleDatasource: new ArticleDatasource(),
    };
  },
});

server.applyMiddleware({app, path: '/graphql'});

// The `listen` method launches a web server.
app.listen({port: port}, () => {
  console.log(`🚀  Server ready at http://localhost:4000/graphql`);
});
