import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class LyricList extends Component {
  onLike(lyricId, likes) {
    const { mutate } = this.props;
    mutate({
      variables: { id: lyricId },
      
      optimisticResponse: {
        __typename: "Mutation",
        
        likeLyric: {
          id: lyricId,
          __typename: "LyricType",
          likes: likes + 1
        }
      }
    });
  }

  renderLyrics() {
    const { lyrics } = this.props;
    return lyrics.map(({ id, content, likes }) => (
      <li key={id} className="collection-item">
        {content}
        <div className="vote-box">
          <i className="material-icons" onClick={() => this.onLike(id, likes)}>
            thumb_up
          </i>
          {likes}
        </div>
      </li>
    ));
  }

  render() {
    const { lyrics } = this.props;

    if (!lyrics || !lyrics.length) {
      return null;
    }

    return <ul className="collection">{this.renderLyrics()}</ul>;
  }
}

const mutation = gql`
  mutation LikeLyric($id: ID) {
    likeLyric(id: $id) {
      id
      content
      likes
    }
  }
`;

export default graphql(mutation)(LyricList);
