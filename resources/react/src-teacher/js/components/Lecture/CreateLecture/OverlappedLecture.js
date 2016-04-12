import React, { PropTypes, Component } from 'react';
import {Motion, spring} from 'react-motion';
// Config
import { SCHOOL_NAME } from '../../../../config/env';

class OverlappedLecture extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { myId, lecture, setState, push } = this.props;
    const defaultStyle = {
      opacity: 0,
    }
    const style = {
      opacity: spring(1),
    }

    return (
      <Motion defaultStyle={defaultStyle} style={style}>
        {style => 
        <div className="right-panel has-border hint-box" style={style}>
          <img src="/images/icons/exclamation.svg" width="32" height="32"/>
          <div className="space-top-4 space-bottom-3">
            <p>同じ講義がすでに登録されています</p>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <p>{`対象　： ${lecture.department.name} ${lecture.grade}`}</p>
              </li>
              <li className="list-group-item">
                <p>{`講義名： ${lecture.title}`}</p>
              </li>
              <li className="list-group-item">
                <p>{`開講期： ${lecture.year} ${lecture.semester.name}`}</p>
              </li>
              <li className="list-group-item">
                <p>講師　： 
                  {lecture.users.map(t =>
                    <span className="space-right-2">{` ${t.familyName} ${t.givenName}`}</span>
                  )}
                </p>
              </li>
            </ul>
            {
              lecture.users.some(u => u.id === myId) ?
              <button
                className="btn btn-primary center-block space-top-3"
                onClick={() => push(`/${SCHOOL_NAME}/teacher/lectures/${lecture.id}`)}
              >
                <span className="glyphicon glyphicon-pencil"></span>　授業を編集
              </button> :
              <button
                className="btn btn-primary center-block space-top-3"
                onClick={() => setState({
                  open: true,
                  join: true
                })}
              >
                <span className="glyphicon glyphicon-pencil"></span>　担当授業に追加
              </button>               
            }
          </div>
        </div>
        }
      </Motion>
    );
  }
}

OverlappedLecture.propTypes = {
  focused: PropTypes.string.isRequired,
};

export default OverlappedLecture;
