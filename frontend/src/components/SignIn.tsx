import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

type State = {
  email: string;
  password: string;
};

class SignIn extends Component<{}, State> {
  state = {
    email: '',
    password: '',
  };

  onChange = (evt: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = evt.currentTarget;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form>
        <h2>Sign in</h2>
        <div>
          <label htmlFor="signin-email">Email</label>
          <input
            id="signin-email"
            name="email"
            type="email"
            onChange={this.onChange}
          />
        </div>
        <div>
          <label htmlFor="signin-password">Password</label>
          <input
            id="signin-password"
            name="password"
            type="password"
            onChange={this.onChange}
          />
        </div>
        <button type="submit">Log in</button>
      </form>
    );
  }
}

export default SignIn;
