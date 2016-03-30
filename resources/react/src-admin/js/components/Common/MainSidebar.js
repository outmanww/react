import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'react-intl';
//Config
import { SCHOOL_NAME } from '../../../config/env';
//Components
import { Avatar, Divider, List, ListItem } from 'material-ui';
import Flag from 'material-ui/lib/svg-icons/content/flag';
import Dashboard from 'material-ui/lib/svg-icons/action/dashboard';
import AccountBox from 'material-ui/lib/svg-icons/action/account-box';
import DateRange from 'material-ui/lib/svg-icons/action/date-range';
import MapPlace from 'material-ui/lib/svg-icons/maps/place';

import { Link } from 'react-router';


import { SelectableContainerEnhance } from 'material-ui/lib/hoc/selectable-enhance';
let SelectableList = SelectableContainerEnhance(List);

function wrapState(ComposedComponent) {
  class StateWrapper extends Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedIndex: props.pathname
      };
    }

    handleUpdateSelectedIndex(e, index) {
      console.log(index);
      //window.location.href = `/${SCHOOL_NAME}/teacher/${index}`;
      this.props.push({
        pathname: index
      });
      this.setState({
        selectedIndex: index,
      });
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          {...this.state}
          valueLink={{
            value: this.state.selectedIndex,
            requestChange: this.handleUpdateSelectedIndex.bind(this)
          }}
        />
      );
    }
  }

  StateWrapper.propTypes = {
    push: PropTypes.func.isRequired,
  };

  return StateWrapper;
}

SelectableList = wrapState(SelectableList);

class MainSidebar extends Component {
  render() {
    const { pathname, push } = this.props;
    const styles = {
      innerDiv: {
        paddingLeft: 50,
        fontSize: '1.5rem',
        textAlign: 'left'
      },
      icon: {
        height: 17,
        margin: 16
      },
    };
    const path = {
      dashboard: `/${SCHOOL_NAME}/teacher/dashboard`,
      lecture: `/${SCHOOL_NAME}/teacher/lectures`,
    };
    return (
      <SelectableList pathname={pathname} push={push}>
        <Link to="/dashboard" activeClassName="active" >フライト予約</Link>
        <ListItem
          disabled
          primaryText="shiichi saito"
          leftAvatar={<Avatar src="" />}/>
        <Divider />
        <ListItem
          value={path.dashboard}
          primaryText={
            <FormattedMessage id="nav.dashboard">text</FormattedMessage>
          }
          innerDivStyle={styles.innerDiv}
          leftIcon={<Dashboard style={styles.icon}/>}/>

        <ListItem
          value={path.lecture}
          primaryText={
            <FormattedMessage id="nav.lecture">text</FormattedMessage>
          }
          innerDivStyle={styles.innerDiv}
          leftIcon={<AccountBox style={styles.icon}/>}/>
      </SelectableList>
    )
  }
}

MainSidebar.propTypes = {
  push: PropTypes.func.isRequired,
};

export default MainSidebar;
