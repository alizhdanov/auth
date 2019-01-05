/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserQuery
// ====================================================

export interface UserQuery_me {
  __typename: "User";
  email: string;
}

export interface UserQuery {
  me: UserQuery_me | null;
}
