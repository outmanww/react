import React, { PropTypes, Component } from 'react';
import {Motion, spring} from 'react-motion';
// Utils

class ConfirmLecture extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const l = this.props.lecture;
    const { me, length, setState } = this.props;

    return (
      <div className="space-top-4 space-bottom-3">
        {
          l.lecture !== null && !l.isFetching &&
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="list-head">タイトル</span>
              <span className="list-body">
                {l.lecture.title}
              </span>
            </li>
            <li className="list-group-item">
              <span className="list-head">開催場所</span>
              <span className="list-body">
                {l.lecture.place}
              </span>
            </li>
            <li className="list-group-item">
              <span className="list-head">開始時間</span>
              <span className="list-body">
                {l.lecture.startAt}
              </span>
            </li>
            <li className="list-group-item">
              <span className="list-head">説明</span>
              <span className="list-body">
                {l.lecture.description}
              </span>
            </li>
          </ul>
        }
      </div>
    );
  }
}

ConfirmLecture.propTypes = {
  focused: PropTypes.string.isRequired,
};

export default ConfirmLecture;
