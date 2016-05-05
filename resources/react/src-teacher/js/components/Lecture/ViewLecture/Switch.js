import React, { PropTypes, Component } from 'react';

class Switch extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="switch-wrap edit-lecture-switch">
        <div className="either">
          <input type="radio" defaultChecked="checked" checked={editable} />
          <label
            className="switch-opened"
            data-label="編集"
            onClick={() => this.setState({
              editable: true,
              id: 0
            })}
          >
            編集
          </label>
          <input type="radio" checked={!editable}/>
          <label
            className="switch-closed"
            data-label="ロック"
            onClick={() => this.setState({
              editable: false,
              ...format(['id', 'name', 'en', 'description'])
            })}
          >
            ロック
          </label>
        </div>
      </div>
    )
  }
}

Switch.propTypes = {};

export default Switch;
