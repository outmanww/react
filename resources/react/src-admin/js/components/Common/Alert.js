import React, { PropTypes, Component } from 'react';
import { TransitionMotion, spring, presets } from 'react-motion';
import { FormattedMessage } from 'react-intl';

class Alert extends Component {
  componentDidMount() {
    // setInterval(() => {
    //   const { alerts: {access}, deleteAccessAlerts } = this.props;
    //   const shouldDelete = Object.keys(access).filter(key => key < Date.now() - 3000);
    //   deleteAccessAlerts(shouldDelete)
    // }, 5000);
  }

  getDefaultValue() {
    const { alerts } = this.props;
    return alerts.map(alert => ({
      ...alert,
      style: {
        height: 0,
        opacity: 1,
        padding: 0,
        marginBottom: 0,
      }
    }));
  }

  getEndValue() {
    const { alerts } = this.props;
    return alerts.map(alert => ({...alert, style: {
      height: spring(50, presets.gentle),
      opacity: spring(1, presets.gentle),
      padding: spring(15, presets.gentle),
      marginBottom: spring(15, presets.gentle),
    }}));
  }

  willEnter() {
    return {
      height: 0,
      opacity: 1,
      padding: 0,
      marginBottom: 0,
    };
  }

  willLeave() {
    return {
      height: spring(0),
      opacity: spring(0),
      padding: spring(0),
      marginBottom: spring(0),
    };
  }

  handleClick(key) {
    const { deleteSideAlerts } = this.props;
    deleteSideAlerts([key]);
  }

  render() {
    const { alerts } = this.props;
    return (
      <div>
      {alerts.length > 0 &&
      <TransitionMotion
        defaultStyles={this.getDefaultValue.bind(this)()}
        styles={this.getEndValue.bind(this)()}
        willLeave={this.willLeave.bind(this)}
        willEnter={this.willEnter.bind(this)}>
        {alerts =>
          <div className="alert-wrap">
            {alerts.map(({ key, data: {status, messageId, value}, style }) => {
              return (
                <div className={`callout custom-alert callout-${status}`} style={style} key={key}>
                  <FormattedMessage id={messageId} values={value}>
                    {text => <p>{text}</p>}
                  </FormattedMessage>
                  <span className="btn-close" title={key} onClick={this.handleClick.bind(this, key)}>×</span>
                </div>
              );
            })}
          </div>
        }
      </TransitionMotion>}
      </div>
    );
  }
}

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
  deleteSideAlerts: PropTypes.func.isRequired
};

export default Alert;
