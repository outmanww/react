import React, { PropTypes, Component } from 'react';
//Components
import {
  List, ListItem, Avatar, SelectField, MenuItem
} from 'material-ui';

class EditMode extends Component {
  render() {
    const { fetchingNodes, flightData, updateFlight, openFlight, closeFlight, push } = this.props;
    return (
      <div className="right-panel">
        {!flightData &&
          <div className="flight-status">
            <p>テーブルから編集するフライトを選んでください</p>
          </div>
        }
        {flightData &&
        <div>
          <p className={`saving-progress ${fetchingNodes.length === 0 ? 'saved' : 'saving'}`}>更新中...</p>
          <div className="flight-status">
            <div className="switch-wrap">
              <div className="either">
                <input type="radio" disabled={fetchingNodes.length > 0} defaultChecked="checked" checked={flightData.deletedAt === null} />
                <label
                  className="switch-opened"
                  data-label="開講中"
                  onClick={() => {
                    if (fetchingNodes.length === 0 && flightData.deletedAt !== null) {
                      openFlight(flightData.id, 1);
                    }
                  }}
                >
                  開講中
                </label>
                <input type="radio" disabled={fetchingNodes.length > 0} checked={flightData.deletedAt !== null}/>
                <label
                  className="switch-closed"
                  data-label="閉講中"
                  onClick={() => {
                    if (fetchingNodes.length === 0 && flightData.deletedAt === null) {
                      closeFlight(flightData.id, 1);
                    }
                  }}
                >
                  閉講中
                </label>
              </div>
            </div>
            <div className="row" style={{ width: '100%', margin: '0 0 20px 0' }}>
              <div className="col-xs-4" style={{ padding: 0 }}>
                <h5>予約枠</h5>
              </div>
              <div className="col-xs-8" style={{ padding: 0 }}>
              <div className="select-wrap">
                <SelectField
                  disabled={flightData.deletedAt !== null || fetchingNodes.length !== 0}
                  value={flightData.numberOfDrones}
                  onChange={this.handleChange}
                  style={{ width: '100%' }}
                  onChange={(event, index, value) => {
                    if (fetchingNodes.length === 0 && flightData.deletedAt === null) {
                      updateFlight(flightData.id, value);
                    }
                  }}
                >
                  <MenuItem value={1} primaryText="1人"/>
                  <MenuItem value={2} primaryText="2人"/>
                  <MenuItem value={3} primaryText="3人"/>
                  <MenuItem value={4} primaryText="4人"/>
                  <MenuItem value={5} primaryText="5人"/>
                </SelectField>
              </div>
              </div>
            </div>
          </div>
          {flightData.deletedAt === null &&
            <div className="infomation">
              <h5>予約者</h5>
              <div className="user-list">
                {flightData.users.length === 0 ? <p>予約はありません</p> :
                  <List>
                    {flightData.users.map(user =>
                      <ListItem
                        disabled={false}
                        leftAvatar={<Avatar>a</Avatar>}
                        onClick={() => push(`access/user/${user.id}/edit`)}
                      >
                        {user.name}
                      </ListItem>
                    )}
                  </List>
                }
              </div>
            </div>
          }
        </div>
        }
      </div>
    );
  }
}

EditMode.propTypes = {
  fetchingNodes: PropTypes.array.isRequired,
  flightData: PropTypes.object.isRequired,
  updateFlight: PropTypes.func.isRequired,
  openFlight: PropTypes.func.isRequired,
  closeFlight: PropTypes.func.isRequired,
  push: PropTypes.func
};

export default EditMode;
