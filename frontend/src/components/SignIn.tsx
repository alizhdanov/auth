import React, { useState, useContext } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Cookie from 'js-cookie';
import { withRouter, RouteComponentProps } from 'react-router';
import { USER_FRAGMENT, USER_QUERY } from './User';
import { Context } from '../App';
import { SignIn as SignInData, SignInVariables } from './__generated__/SignIn';

class SignInMutation extends Mutation<SignInData, SignInVariables> {}

const SIGN_IN = gql`
  mutation SignIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      token
      user {
        ...User
      }
    }
  }
  ${USER_FRAGMENT}
`;

const SignIn = ({ history }: RouteComponentProps) => {
  const [email, changeEmail] = useState('');
  const [password, changePassword] = useState('');
  const { setAuth } = useContext(Context);

  return (
    <SignInMutation
      mutation={SIGN_IN}
      variables={{ email, password }}
      update={(cache, { data }) => {
        const user = data && data.signIn && data.signIn.user;

        if (user) {
          cache.writeQuery({
            query: USER_QUERY,
            data: { me: user },
          });
        }
      }}
    >
      {(signIn, { loading, error, called }) => (
        <form
          onSubmit={async e => {
            e.preventDefault();
            const response = await signIn();
            if (response) {
              const token =
                response.data &&
                response.data.signIn &&
                response.data.signIn.token;
              if (token) {
                Cookie.set('token', token);
                setAuth(true);
                history.push('/');
              }
            }
          }}
        >
          <h2>Login</h2>
          {loading && <div>Loading...</div>}
          {error && <div>{error.toString()}</div>}
          {!loading && !error && called && <div>User succesfuly loged in</div>}
          <div>
            <label htmlFor="signin-email">Email</label>
            <input
              id="signin-email"
              name="email"
              type="email"
              value={email}
              onChange={e => changeEmail(e.currentTarget.value)}
            />
          </div>
          <div>
            <label htmlFor="signin-password">Password</label>
            <input
              id="signin-password"
              name="password"
              type="password"
              value={password}
              onChange={e => changePassword(e.currentTarget.value)}
            />
          </div>

          <button type="submit">Log in</button>
        </form>
      )}
    </SignInMutation>
  );
};

export default withRouter(SignIn);
