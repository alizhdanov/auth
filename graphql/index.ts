import { prisma } from './generated/prisma-client';
import { GraphQLServer } from 'graphql-yoga';
import { config } from 'dotenv';
import { join } from 'path';
import { decode } from 'jsonwebtoken';
// const cookieParser = require('cookie-parser');

import Query from './src/Query';
import Mutation from './src/Mutation';

config({ path: join(__dirname, '.env') });

const resolvers = {
  Query,
  Mutation: Mutation,
  User: {
    posts(parent, args, context) {
      return context.prisma
        .user({
          id: parent.id,
        })
        .posts();
    },
  },
  Post: {
    author(parent, args, context) {
      return context.prisma
        .post({
          id: parent.id,
        })
        .author();
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: ({ request, response }) => {
    return {
      prisma,
      response,
      request,
    };
  },
});

// server.express.use(cookieParser());

server.express.use(async (req, res, next) => {
  if (req.headers.authorization) {
    const tokenParsed = decode(
      req.headers.authorization.slice('Bearer '.length)
    );

    req.userId = typeof tokenParsed === 'object' ? tokenParsed.userId : null;
  }

  next();
});

server.start(() => console.log('Server is running on http://localhost:4000'));
