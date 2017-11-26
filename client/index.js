import React from "react";
import { render } from "react-dom";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";

// should remind you of Redux patterns
const client = new ApolloClient({});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <div>Lyrical</div>
    </ApolloProvider>
  );
};

render(<Root />, document.querySelector("#root"));
