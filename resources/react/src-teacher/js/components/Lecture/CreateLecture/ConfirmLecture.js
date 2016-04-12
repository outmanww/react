import React, { PropTypes, Component } from 'react';
import {Motion, spring} from 'react-motion';

class ConfirmLecture extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { lecture } = this.props;

    console.log(lecture)

    return (
      <div className="space-top-4 space-bottom-3">
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="list-head">対象</span>
            <span className="list-body">{`${lecture.department}・${lecture.grade}`}</span>
          </li>
          <li className="list-group-item">
            <span className="list-head">授業名</span>
            <span className="list-body">{lecture.title}</span>
          </li>
          <li className="list-group-item">
            <span className="list-head">授業コード</span>
            { lecture.code === '' ?
              <span className="error">未入力</span> :
              <span className="list-body">{lecture.code}</span>
            }
          </li>
          <li className="list-group-item">
            <span className="list-head">開講時期</span><span>{`${lecture.yearSemester} ${lecture.weekday} ${lecture.timeSlot}`}</span>
          </li>
          <li className="list-group-item">
            <span className="list-head">授業の場所</span>
            { lecture.place === '' ?
              <span className="error">未入力</span> :
              <span className="list-body">{lecture.place}</span>
            }
          </li>
          <li className="list-group-item">
            <span className="list-head">授業の長さ</span>
            { lecture.length === '' ?
              <span className="error">未入力</span> :
              <span className="list-body">{`${lecture.length}分`}</span>
            }
          </li>
          <li className="list-group-item">
            <span className="list-head">授業の説明</span>
            { lecture.description === '' ?
              <span className="error">未入力</span> :
              <span className="list-body">{lecture.description}</span>
            }
          </li>
          {
            typeof lecture.otherTeacher !== 'undefined' &&
            <li className="list-group-item">
              <span className="list-head">担当講師</span>
                <span className="list-body">
                  {
                    `${lecture.me} ${lecture.otherTeacher.map(t => `${t} `)}`
                  }
                </span>
            </li>
          }
        </ul>
      </div>
    );
  }
}

ConfirmLecture.propTypes = {
  focused: PropTypes.string.isRequired,
};

export default ConfirmLecture;
