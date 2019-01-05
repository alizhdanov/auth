/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SignIn
// ====================================================

export interface SignIn_signIn_user {
  __typename: "User";
  email: string;
}

export interface SignIn_signIn {
  __typename: "Token";
  token: string | null;
  user: SignIn_signIn_user | null;
}

export interface SignIn {
  signIn: SignIn_signIn | null;
}

export interface SignInVariables {
  email: string;
  password: string;
}
