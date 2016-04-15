import React, { PropTypes, Component } from 'react';
import {Motion, spring} from 'react-motion';
// Utils
import { validatLectureLength } from '../../../utils/ValidationUtils';

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
              <span className="list-head">対象</span>
              <span className="list-body">
                {`${l.lecture.department.faculty.name}・${l.lecture.department.name}・${l.lecture.grade}`}
              </span>
            </li>
            <li className="list-group-item">
              <span className="list-head">授業名</span>
              <span className="list-body">{l.lecture.title}</span>
            </li>
            <li className="list-group-item">
              <span className="list-head">開講時期</span>
              <span>{`${l.lecture.year} ${l.lecture.semester.name} ${l.lecture.timeSlot}限`}</span>
            </li>
            {
              me.user !== null && !me.isFetching &&
              <li className="list-group-item">
                <span className="list-head">担当講師</span>
                <span className="list-body">{`${me.user.name}`}</span>
              </li>
            }
            <li className="list-group-item">
              <span className="list-head">授業の長さ</span>
              <input className="overview-title input-large" id="input-length" maxLength={3} type="number" step="10"
                style={{width: 200}}
                name="length" 
                placeholder="入力してください"
                value={length}
                onChange={(e) => setState({ length: validatLectureLength(e.target.value) })}
              />
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
