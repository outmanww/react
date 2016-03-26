import React, { PropTypes, Component } from 'react';
import { FormattedMessage } from 'react-intl';
//Config
import { _ADMIN_DOMAIN_NAME } from '../../../config/env';
//Components
import { Avatar, Divider, List, ListItem } from 'material-ui';
import Flag from 'material-ui/lib/svg-icons/content/flag';
import Dashboard from 'material-ui/lib/svg-icons/action/dashboard';
import AccountBox from 'material-ui/lib/svg-icons/action/account-box';
import DateRange from 'material-ui/lib/svg-icons/action/date-range';
import MapPlace from 'material-ui/lib/svg-icons/maps/place';


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
      this.props.push(index);
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
      dashboard: `${_ADMIN_DOMAIN_NAME}dashboard`,
      access: `${_ADMIN_DOMAIN_NAME}access/users`,
      plans: `${_ADMIN_DOMAIN_NAME}flight/plans`,
      types: `${_ADMIN_DOMAIN_NAME}flight/types`,
      places: `${_ADMIN_DOMAIN_NAME}flight/places`,
      pinList: `${_ADMIN_DOMAIN_NAME}pins/list`,
      pinGenerate: `${_ADMIN_DOMAIN_NAME}pins/generate`,
    };
    return (
      <SelectableList pathname={pathname} push={push}>
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
          value={path.access}
          primaryText={
            <FormattedMessage id="nav.access">text</FormattedMessage>
          }
          innerDivStyle={styles.innerDiv}
          leftIcon={<AccountBox style={styles.icon}/>}/>

        <ListItem
          autoGenerateNestedIndicator={false}
          nestedListStyle={{ margin: 0 }}
          primaryText={
            <FormattedMessage id="nav.flight">text</FormattedMessage>
          }
          innerDivStyle={styles.innerDiv}
          leftIcon={<DateRange style={styles.icon}/>}
          initiallyOpen={false}
          primaryTogglesNestedList
          nestedItems={[
            <ListItem
              value={path.plans}
              primaryText={
                <FormattedMessage id="nav.flight.plan">text</FormattedMessage>
              }
              innerDivStyle={styles.innerDiv}
              leftIcon={<DateRange style={styles.icon}/>}/>,
            <ListItem
              value={path.types}
              primaryText={
                <FormattedMessage id="nav.flight.type">text</FormattedMessage>
              }
              innerDivStyle={styles.innerDiv}
              leftIcon={<Flag style={styles.icon}/>}/>,
            <ListItem
              value={path.places}
              primaryText={
                <FormattedMessage id="nav.flight.place">text</FormattedMessage>
              }
              innerDivStyle={styles.innerDiv}
              leftIcon={<MapPlace style={styles.icon}/>}/>
          ]}
        />
        <ListItem
          id="pin"
          value={path.pinList}
          primaryText={
            <FormattedMessage id="nav.pin">text</FormattedMessage>
          }
          innerDivStyle={styles.innerDiv}
          leftIcon={<MapPlace style={styles.icon}/>}/>
      </SelectableList>
    )
  }
}

MainSidebar.propTypes = {
  push: PropTypes.func.isRequired,
};

export default MainSidebar;
