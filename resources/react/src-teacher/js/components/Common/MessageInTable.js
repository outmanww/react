import React, { Component } from 'react';
import Icon from 'react-fa';

class MessageInTable extends Component {
  render() {
    return (
      <tbody>
        <tr><td>
          <h3><Icon name="warning" className="text-red"/>err</h3>
        </td></tr>
      </tbody>
    );
  }
}

export default MessageInTable;
