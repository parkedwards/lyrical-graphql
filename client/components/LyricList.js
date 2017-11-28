import React, { Component } from "react";

class LyricList extends Component {
  render() {
    const { lyrics } = this.props.song;

    if(!lyrics || !lyrics.length) {
      return null;
    }

    return (
      <ul className="collection">
        {lyrics.map(({ id, content, likes }) => (
          <li key={id} className="collection-item">
            {content}
          </li>
        ))}
      </ul>
    );
  }
}

export default LyricList;
