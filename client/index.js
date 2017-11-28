import React from "react";
import { render } from "react-dom";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import { Router, Route, hashHistory, IndexRoute } from "react-router";

import App from './components/App';
import SongList from "./components/SongList";
import SongCreate from './components/SongCreate';

import './style/style.css'; // styles!

// should remind you of Redux patterns
const client = new ApolloClient({});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <Router history={hashHistory}>
        <Route path="/" component={App}>
          <IndexRoute component={SongList} />
          <Route path="songs/new" component={SongCreate} />
        </Route>
      </Router>
    </ApolloProvider>
  );
};

render(<Root />, document.querySelector("#root"));
