import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import SignOut from './SignOut';
import { UserQuery as UserQueryType } from './__generated__/UserQuery';

class UserQuery extends Query<UserQueryType> {}

export const USER_FRAGMENT = gql`
  fragment User on User {
    email
  }
`;

export const USER_QUERY = gql`
  query UserQuery {
    me {
      ...User
    }
  }
  ${USER_FRAGMENT}
`;

const User = () => {
  return (
    <UserQuery query={USER_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <div>'Loading...'</div>;
        if (error) return <div>{error.toString()}</div>;
        if (!(data && data.me)) return null;

        return (
          <div>
            <p>
              User - <strong>{data.me.email}</strong>
            </p>
            <SignOut />
          </div>
        );
      }}
    </UserQuery>
  );
};

User.fragments = {
  data: USER_QUERY,
};

export default User;
