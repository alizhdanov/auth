import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Cookie from 'js-cookie';
import { USER_QUERY } from './User';

const SIGN_OUT = gql`
  mutation SignOut {
    signOut {
      message
    }
  }
`;

type State = {
  email: string;
  password: string;
};

const SignIn = () => {
  return (
    <Mutation
      mutation={SIGN_OUT}
      update={cache => {
        cache.writeQuery({
          query: USER_QUERY,
          data: { me: null },
        });
      }}
    >
      {(signOut, { loading, error, called }) => (
        <form
          onSubmit={async e => {
            e.preventDefault();
            Cookie.remove('token');
            const response = await signOut();
          }}
        >
          <h2>Sign Out</h2>
          {loading && <div>Loading...</div>}
          {error && <div>{error.toString()}</div>}
          {!loading && !error && called && <div>User succesfuly sign out</div>}

          <button>sign out</button>
        </form>
      )}
    </Mutation>
  );
};

export default SignIn;
