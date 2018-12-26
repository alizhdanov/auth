import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { prisma } from '../generated/prisma-client';

const Mutation = {
  async createUser(parent, { email, password }, context) {
    if (!email) {
      throw new Error('No email provided');
    }

    if (!password) {
      throw new Error('No password provided');
    }

    const hashedPassword = await hash(password, 10);

    return context.prisma.createUser({ email, password: hashedPassword });
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

    const token = sign({ userId: user.id }, process.env.APP_SECRET);
    // 4. Set the cookie with the token
    context.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
      // expires: Date.now() + 60 * 60 * 1000,
    });

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
