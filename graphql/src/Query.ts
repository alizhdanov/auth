import { Resolvers } from '../generated/graphqlgen';

const Query: Resolvers['Query'] = {
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
    if (context.request.userId) {
      return context.prisma.user({
        id: context.request.userId,
      });
    }
    return null;
  },
};

export default Query;
