import { prisma } from './generated/prisma-client';
import { GraphQLServer } from 'graphql-yoga';
import { request } from 'https';

const resolvers = {
  Query: {
    publishedPosts(parent, args, context) {
      return context.prisma.posts({ where: { published: true } });
    },
    post(parent, args, context) {
      return context.prisma.post({ id: args.postId });
    },
    postsByUser(parent, args, context) {
      return context.prisma
        .user({
          id: args.userId,
        })
        .posts();
    },
    me(parent, args, context) {
      console.log(context.request.headers);
      return null;
    },
  },
  Mutation: {
    createUser(parent, args, context) {
      return context.prisma.createUser({ name: args.name });
    },
    signIn(parent, { email, password }, context) {
      const user = prisma.user({ email });
    },
  },
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
      request,
    };
  },
});

server.express.use(async (req, res, next) => {
  if (req.headers.authorization) {
    return next();
  }

  next();
});

server.start(() => console.log('Server is running on http://localhost:4000'));
