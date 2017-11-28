import React, { Component } from "react";

import gql from "graphql-tag"; // allows us to write queries from inside a component file
import { graphql } from "react-apollo"; // same bonding lib that gives us <ApolloProvider />
// another notes ^ this is a HOC, similar to 'connect' in react-redux

import { Link } from "react-router";

import fetchSongs from "../queries/fetchSongs";

class SongList extends Component {
  renderSongs() {
    const { data } = this.props;
    return data.songs.map(({ id, title }) => (
      <li key={id} className="collection-item">
        <Link to={`songs/${id}`}>{title}</Link>
        <div onClick={() => this.onSongDelete(id)}>
          <i className="material-icons">delete_forever</i>
        </div>
      </li>
    ));
  }

  onSongDelete(id) {
    const { mutate, data: { refetch } } = this.props;
    mutate({
      variables: {
        id
      }
      // refetchQueries: [{ query: fetchSongs }]
    }).then(() => refetch());
  }

  render() {
    const { data } = this.props;
    if (data.loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <ul className="collection">{this.renderSongs()}</ul>
        <Link to="/songs/new" className="btn-floating btn-large red right">
          <i className="material-icons">add</i>
        </Link>
      </div>
    );
  }
}

const mutation = gql`
  mutation DeleteSong($id: ID) {
    deleteSong(id: $id) {
      id
    }
  }
`;

export default graphql(mutation)(graphql(fetchSongs)(SongList));
