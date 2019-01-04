import React, { Component } from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import './theme.css';
import './App.css';
import logo from './spacex-logo-light.png'
import Launches from './components/Launches';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="container">
          <img src={logo} id="logo" />
          <Launches />
        </div>
      </ApolloProvider>
    );
  }
}

export default App;
