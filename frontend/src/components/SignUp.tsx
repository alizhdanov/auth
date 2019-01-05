import React, { useState, useContext } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Cookie from 'js-cookie';
import { withRouter, RouteComponentProps } from 'react-router';
import { Context } from '../App';
import { SignUp as SignUpData, SignUpVariables } from './__generated__/SignUp';

class SignUpMutation extends Mutation<SignUpData, SignUpVariables> {}

const SIGN_UP = gql`
  mutation SignUp($email: String!, $password: String!) {
    createUser(email: $email, password: $password) {
      token
    }
  }
`;

const SignUp = ({ history }: RouteComponentProps) => {
  const [email, changeEmail] = useState('');
  const [password, changePassword] = useState('');
  const { setAuth } = useContext(Context);

  return (
    <SignUpMutation mutation={SIGN_UP} variables={{ email, password }}>
      {(SignUp, { data, loading, error, called }) => (
        <form
          onSubmit={async e => {
            e.preventDefault();
            const response = await SignUp();
            if (response) {
              const token =
                response.data &&
                response.data.createUser &&
                response.data.createUser.token;

              if (token) {
                Cookie.set('token', token);
                setAuth(true);
                history.push('/');
              }
            }
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
    </SignUpMutation>
  );
};

export default withRouter(SignUp);
