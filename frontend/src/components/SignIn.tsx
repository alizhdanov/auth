import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Cookie from 'js-cookie';
import { USER_FRAGMENT, USER_QUERY } from './User';

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

const SignIn = () => {
  const [email, changeEmail] = useState('');
  const [password, changePassword] = useState('');

  return (
    <Mutation
      mutation={SIGN_IN}
      variables={{ email, password }}
      update={(cache, { data }) => {
        cache.writeQuery({
          query: USER_QUERY,
          data: { me: data.signIn.user },
        });
      }}
    >
      {(signIn, { loading, error, called }) => (
        <form
          onSubmit={async e => {
            e.preventDefault();
            const response = await signIn();
            if (response) {
              Cookie.set('token', response.data.signIn.token);
            }
          }}
        >
          <h2>Sign in</h2>
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
    </Mutation>
  );
};

export default SignIn;
