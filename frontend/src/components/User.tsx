import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

export const USER_FRAGMENT = gql`
  fragment User on User {
    email
  }
`;

export const USER_QUERY = gql`
  query User {
    publishedPosts {
      id
    }
    me {
      ...User
    }
  }
  ${USER_FRAGMENT}
`;

const User = () => {
  return (
    <Query query={USER_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <div>'Loading...'</div>;
        if (error) return <div>{error.toString()}</div>;
        if (!data.me) return null;

        return (
          <div>
            <h2>User - {data.me.email}</h2>
          </div>
        );
      }}
    </Query>
  );
};

User.fragments = {
  data: USER_QUERY,
};

export default User;
