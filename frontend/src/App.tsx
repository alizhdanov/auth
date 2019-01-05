import React, { Component, createContext } from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect,
  withRouter,
  RouteProps,
} from 'react-router-dom';
import Cookie from 'js-cookie';
import jwt from 'jsonwebtoken';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Home from './components/Home';
import Sidebar from './components/Sidebar';
import './App.css';

type State = {
  authenticated: boolean;
};

type ContextType = {
  authenticated: boolean;
  setAuth: (auth: boolean) => void;
};

export const Context = createContext({} as ContextType);

class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    const token = Cookie.get('token');

    this.state = {
      authenticated: !!token,
    };
  }

  setAuth = (authenticated: boolean) => {
    this.setState({ authenticated });
  };

  render() {
    const { authenticated } = this.state;

    return (
      <Context.Provider value={{ authenticated, setAuth: this.setAuth }}>
        <Router>
          <div className="App">
            <nav>
              <NavLink exact to="/">
                Home
              </NavLink>
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/register">Register</NavLink>
            </nav>
            <div className="layout">
              <main>
                <PrivateRoute
                  exact
                  authenticated={authenticated}
                  path="/"
                  component={Home}
                />
                <Route path="/register" component={SignUp} />
                <Route path="/login" component={SignIn} />
              </main>
              <aside>
                <Sidebar />
              </aside>
            </div>
          </div>
        </Router>
      </Context.Provider>
    );
  }
}

function PrivateRoute({
  component: Cmp,
  authenticated,
  ...rest
}: RouteProps & {
  component: React.ComponentType<any>;
  authenticated: boolean;
}) {
  return (
    <Route
      {...rest}
      render={props =>
        authenticated ? (
          <Cmp {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
}

export default App;
