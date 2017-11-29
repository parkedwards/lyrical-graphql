import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

import getSongById from "../queries/getSongById";

class LyricCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: ""
    };

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onFormSubmit(e) {
    const { content } = this.state;
    const { mutate, songId } = this.props;
    e.preventDefault();
    mutate({
      variables: {
        content,
        songId
      },
      // refetchQueries: [{ query: getSongById, variables: { id: songId } }]
    });
    this.setState({ content: "" });
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <label htmlFor="">Add A Lyric</label>
        <input
          value={this.state.content}
          onChange={e => this.setState({ content: e.target.value })}
        />
      </form>
    );
  }
}

const addLyricToSong = gql`
  mutation AddLyricToSong($content: String, $songId: ID) {
    addLyricToSong(content: $content, songId: $songId) {
      id
      lyrics {
        id
        content
        likes
      }
    }
  }
`;

export default graphql(addLyricToSong)(LyricCreate);
