import React, { PropTypes, Component } from 'react';
//Components
import { SelectField, MenuItem } from 'material-ui';

class OpenMode extends Component {
  render() {
    const { capacity, changeCapacity } = this.props;
    return (
      <div className="right-panel">
        <div className="setting">
          <h5>予約枠</h5>
          <div className="select-wrap">
            <SelectField
              defaultValue={capacity}
              value={capacity}
              onChange={(event, index, value) => changeCapacity(value)}
              style={{ width: '100%' }}
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
    );
  }
}

OpenMode.propTypes = {
  capacity: PropTypes.number.isRequired,
  changeCapacity: PropTypes.func.isRequired
};

export default OpenMode;
