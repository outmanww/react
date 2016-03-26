import React, { PropTypes, Component } from 'react';
import { Treebeard } from 'react-treebeard';
import { trans } from '../../../utils/TransUtils';
//components
//import AssociatedPermissions from './AssociatedPermissions';

const data = {
  name: 'root',
  toggled: true,
  children: [
    {
      name: 'parent',
      children: [
        { name: 'child1' },
        { name: 'child2' }
      ]
    },
    {
      name: 'loading parent',
      loading: true,
      children: []
    },
    {
      name: 'parent',
      children: [
        {
          name: 'nested parent',
          children: [
            { name: 'nested child 1' },
            { name: 'nested child 2' }
          ]
        }
      ]
    }
  ]
};

class AssociatedPermissions extends Component {
  constructor(props, context) {
    super(props, context);
    //const { name } = this.props.user;
    this.state = {};
    this.onToggle = this.onToggle.bind(this);
  }

  onToggle(node, toggled) {
    if (this.state.cursor) {this.state.cursor.active = false;}
    node.active = true;
    if (node.children) { node.toggled = toggled; }
    this.setState({ cursor: node });
  }

  render() {
    return (
      <div className="form-group">
        <label className="col-xs-2 control-label">Associated Permissions</label>
        <div className="col-xs-10">
          <select className="form-control" name="associated-permissions">
            <option value="all" selected="selected">All</option>
            <option value="custom">Custom</option>
          </select>
          <div id="available-permissions">
            <div className="row">
              <div className="col-xs-12">
                <div className="alert alert-info">
                  <i className="fa fa-info-circle" />
                  {trans('en', 'alert.access.roles.associatedPermissionsPxplanation')}
                </div>
              </div>

              <div className="col-xs-6">
                <Treebeard data={data} onToggle={this.onToggle}/>
              </div>
              <div className="col-xs-6">
                <p><strong>Ungrouped Permissions</strong></p>
                <p>There are no ungrouped permissions.</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

AssociatedPermissions.propTypes = {
  message: PropTypes.array,
  reservation: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

export default AssociatedPermissions;
