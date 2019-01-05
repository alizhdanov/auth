/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SignUp
// ====================================================

export interface SignUp_createUser {
  __typename: "Token";
  token: string | null;
}

export interface SignUp {
  createUser: SignUp_createUser | null;
}

export interface SignUpVariables {
  email: string;
  password: string;
}
