import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Config
import { SCHOOL_NAME } from '../../../../config/env';
// Actions
import * as LectureActions from '../../../actions/lecture';
import { routeActions } from 'react-router-redux';
// Components
import { RaisedButton } from 'material-ui';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Icon from 'react-fa';
import Colors from 'material-ui/lib/styles/colors';

class Lectures extends Component {
  constructor(props, context) {
    super(props, context);
    props.actions.fetchLectures();
  }

  render() {
    const { lectures } = this.props;
    const weeks = ['月','火','水','木','金','土','日'];
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="panel panel-default panel-table">
            <div className="panel-heading">
              <div className="row">
                <div className="col col-xs-6">
                  <h3 className="panel-title">登録授業一覧</h3>
                </div>
                <div className="col col-xs-6 text-right">
                  <RaisedButton label="新規登録" secondary={true}/>
                </div>
              </div>
            </div>
            <div className="panel-body">
              <table className="table table-striped table-bordered table-list">
                <thead>
                  <tr>
                    <th>授業コード</th>
                    <th className="hidden-xs">授業名</th>
                    <th>開講日</th>
                    <th>学部・学科</th>
                    <th>アクション</th>
                  </tr> 
                </thead>
                <tbody>
                {
                  !lectures.isFetching &&
                  !lectures.didInvalidate &&
                  lectures.lectures !== null &&
                  lectures.lectures.map(l =>
                  <tr key={l.id} className="">
                    <td>{l.code}</td>
                    <td>{l.title}</td>
                    <td>{`${weeks[Math.floor((Number(l.timeSlot) - 1) % 5 / 5)]}曜${(Number(l.timeSlot) - 1) % 5 + 1}限`}</td>
                    <td>{`${l.department.name}・${l.department.faculty.name}`}</td>
                   <td>
                    <LinkContainer to={{ pathname: `/${SCHOOL_NAME}/teacher/lectures/${l.id}`}}>
                      <OverlayTrigger placement="top" overlay={(<Tooltip>詳細</Tooltip>)}>
                        <Button bsStyle="primary" bsSize="small"><Icon name="pencil"/></Button>
                      </OverlayTrigger>
                    </LinkContainer>
                    <LinkContainer to={{ pathname: `/${SCHOOL_NAME}/teacher/lectures/${l.id}`}}>
                      <OverlayTrigger placement="top" overlay={(<Tooltip>開講</Tooltip>)}>
                        <Button bsStyle="danger" bsSize="small" style={{marginLeft: 10}}><Icon name="book"/></Button>
                      </OverlayTrigger>
                    </LinkContainer>
                    </td>
                  </tr>
                )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Lectures.propTypes = {
  routes: PropTypes.array.isRequired,
  children: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    lectures: state.lectures,
    routes: ownProps.routes
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign(LectureActions, routeActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Lectures);
