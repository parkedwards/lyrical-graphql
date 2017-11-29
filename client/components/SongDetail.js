import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";

import LyricCreate from "./LyricCreate";
import LyricList from './LyricList';

import getSongById from "../queries/getSongById";

class SongDetail extends Component {
  requestData() {
    const { params: { id } } = this.props;
  }

  render() {
    const { data: { song } } = this.props;

    if (!song) return <div>Fetching Song...</div>;
    return (
      <div>
        <Link to="/">Back</Link>
        <h3>{song.title}</h3>
        <LyricList lyrics={song.lyrics} />
        <LyricCreate songId={this.props.params.id} />
      </div>
    );
  }
}

export default graphql(getSongById, {
  options: props => {
    return { variables: { id: props.params.id } };
  }
})(SongDetail);
