import React, { PropTypes, Component } from 'react';
import {Motion, spring} from 'react-motion';

class ConfirmConference extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { conference } = this.props;

    return (
      <div className="space-top-4 space-bottom-3">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="list-head">タイトル</span>
            <span className="list-body">{conference.title}</span>
          </li>
          <li className="list-group-item">
            <span className="list-head">場所</span>
            <span className="list-body">{conference.place}</span>
          </li>
          <li className="list-group-item">
            <span className="list-head">時間</span>
            <span className="list-body">{conference.time}</span>
          </li>
          <li className="list-group-item">
            <span className="list-head">説明</span>
            <span className="list-body">{conference.description}</span>
          </li>
        </ul>
      </div>
    );
  }
}

ConfirmConference.propTypes = {
  conference: PropTypes.array.isRequired,
};

export default ConfirmConference;
