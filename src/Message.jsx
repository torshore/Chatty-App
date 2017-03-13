import React, {Component} from 'react';

export default class Message extends Component {

  render() {

    return (
      <div>
        <div className="message">
          <span className="username">
            <strong>{this.props.username}</strong>
          </span>
          <span className="content">
            "{this.props.content}"
          </span>
        </div>
      </div>
    )
  }
  }


