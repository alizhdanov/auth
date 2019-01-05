import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { prisma } from '../generated/prisma-client';
import { Resolvers } from '../generated/graphqlgen';

const createToken = (id: string) => {
  return sign({ userId: id }, process.env.APP_SECRET, {
    expiresIn: '1m',
  });
};

const Mutation: Resolvers['Mutation'] = {
  async createUser(parent, { email, password }, context) {
    if (!email) {
      throw new Error('No email provided');
    }

    if (!password) {
      throw new Error('No password provided');
    }

    const hashedPassword = await hash(password, 10);

    const user = context.prisma.createUser({ email, password: hashedPassword });

    const token = createToken(user.id);

    return {
      token,
      user,
    };
  },
  async signIn(parent, { email, password }, context) {
    const user = await prisma.user({ email });

    if (!user) {
      throw new Error('Cannot find user');
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw new Error('Invalid password');
    }

    const token = createToken(user.id);

    return {
      token,
      user,
    };
  },
  async signOut() {
    return {
      message: 'success',
    };
  },
};

export default Mutation;
