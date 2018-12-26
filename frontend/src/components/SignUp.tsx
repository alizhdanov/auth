import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const SIGN_UP = gql`
  mutation SignUp($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      token
    }
  }
`;

type State = {
  email: string;
  password: string;
};

const SignIn = () => {
  const [email, changeEmail] = useState('');
  const [password, changePassword] = useState('');

  return (
    <Mutation mutation={SIGN_UP}>
      {(signIn, { data, loading, error, called }) => (
        <form
          onSubmit={e => {
            e.preventDefault();
            signIn({ variables: { email, password } });
          }}
        >
          <h2>Sign Up</h2>
          {loading && <div>Loading...</div>}
          {error && <div>{error.toString()}</div>}
          {!loading && !error && called && <div>User succesfuly created</div>}
          <div>
            <label htmlFor="signup-email">Email</label>
            <input
              id="signup-email"
              name="email"
              type="email"
              value={email}
              onChange={e => changeEmail(e.currentTarget.value)}
            />
          </div>
          <div>
            <label htmlFor="signup-password">Password</label>
            <input
              id="signup-password"
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
