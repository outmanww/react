import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
// Utils
import { format, validatTypeName, validatTypeEn, validatTypeDesc } from '../../../utils/ValidationUtils2';
// Actions
import { routeActions } from 'react-router-redux';
import * as TypeActions from '../../../actions/Flight/type';
// Material-UiI-components
import { Paper, Card, CardHeader, CardText, CardActions, FlatButton, TextField } from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import FontIcon from 'material-ui/lib/font-icon';

class Types extends Component {
  constructor(props, context) {
    super(props, context);
    const { routeParams, actions } = props;
    actions.fetchTypes();
    this.state = {
      editMode: true,
      id: {value: 0}
    };
    this.hasError = false;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.types.length > this.props.types.length) {
      this.setState({
        id: {value: 0},
        ...format(['name', 'en', 'description'])
      })
    }  
  }

  setHasError() {
    this.hasError = Object.keys(this.state).some(key => 
      this.state[key].status === 2
    )
  }

  render() {
    const {
      types, isFetching, didInvalidate, actions: { updateType, createType, deleteType }
    } = this.props;
    const { editMode, id, name, en, description } = this.state;

    const beChanged = key => {
      const target = types.find(type => type.id === id.value);
      return target[key] !== this.state[key].value;
    };

    return (
      <Paper className="content-wrap" zDepth={1}>
        <div className="type-wrap">
          <div className="col-md-7">
            <div className="left-panel-wrap">
              {types.map(type =>
                <Card
                  key={type.id}
                  style={{
                    margin: '5px 5px 20px 5px',
                    backgroundColor: type.id === id.value ? Colors.grey300 : Colors.grey50,
                    cursor: editMode ? 'pointer' : 'auto'
                  }}
                  onClick={() => { editMode ? this.setState(format(type)) : null; }}
                >
                  <CardHeader
                    style={{ marginLeft: 0, height: 40 }}
                    titleStyle={{ float: 'left', fontSize: 16 }}
                    subtitleStyle={{ float: 'left', marginLeft: 20, fontSize: 16 }}
                    title={type.name}
                    subtitle={type.en}
                  />
                  <CardText>{type.description}</CardText>
                </Card>
              )}
            </div>
          </div>
          <div className="col-md-5">
            <div className="right-panel-wrap">
              <div className="type-switch-wrap">
                <div className="either">
                  <input type="radio" defaultChecked="checked" checked={editMode} />
                  <label
                    className="switch-opened"
                    data-label="編集"
                    onClick={() => this.setState({
                      editMode: true,
                      id: 0
                    })}
                  >
                    編集
                  </label>
                  <input type="radio" checked={!editMode}/>
                  <label
                    className="switch-closed"
                    data-label="新規作成"
                    onClick={() => this.setState({
                      editMode: false,
                      ...format(['id', 'name', 'en', 'description'])
                    })}
                  >
                    新規作成
                  </label>
                </div>
              </div>
              <div className="right-panel">
                {editMode && id.value === 0 ?
                  <p className="select">編集するタイプを選択してください</p> :
                  <div>
                    <p
                      className="saving-progress"
                      data-label={isFetching ? '保存中...' : ''}
                    >
                    </p>
                    <TextField
                      style={{ width: 300, textAlign: 'left' }}
                      hintText="タイプ名を入力"
                      floatingLabelText="タイプ名"
                      value={name.value}
                      errorText={ name.message &&
                        <FormattedMessage id={`validate.${name.message}`}>
                          {text => <p>{text}</p>}
                        </FormattedMessage>
                      }
                      onChange={(e) => this.setState({ name: validatTypeName(e.target.value) })}
                      onBlur={() => {
                        if (editMode && beChanged('name') && name.status === 1) {
                          updateType(id.value, { name: name.value });
                        }
                      }}
                    /><br/>
                    <TextField
                      style={{ width: 300, textAlign: 'left' }}
                      hintText="略称をアルファベットで入力"
                      floatingLabelText="略称"
                      value={en.value}
                      errorText={ en.message &&
                        <FormattedMessage id={`validate.${en.message}`}>
                          {text => <p>{text}</p>}
                        </FormattedMessage>
                      }
                      onChange={(e) => this.setState({ en: validatTypeEn(e.target.value) })}
                      onBlur={() => {
                        if (editMode && beChanged('en') && en.status === 1) {
                          updateType(id.value, { en: en.value });
                        }
                      }}
                    /><br/>
                    <TextField
                      style={{ width: 300, textAlign: 'left' }}
                      hintText="タイプの説明を入力"
                      floatingLabelText="詳細"
                      multiLine
                      rows={5}
                      rowsMax={5}
                      value={description.value}
                      errorText={ description.message &&
                        <FormattedMessage id={`validate.${description.message}`}>
                          {text => <p>{text}</p>}
                        </FormattedMessage>
                      }
                      onChange={(e) => this.setState({ description: validatTypeDesc(e.target.value) })}
                      onBlur={() => {
                        if (editMode && beChanged('description') && description.status === 1) {
                          updateType(id.value, { description: description.value });
                        }
                      }}
                    /><br/>
                    {editMode ? 
                      <FlatButton
                        label="削除"
                        labelStyle={{color: Colors.red600}}
                        style={{ margin: 10, position: 'absolute', bottom: 0, right: 0 }}
                        onClick={() => {deleteType(id.value)}}
                      /> :
                      <FlatButton
                        label="作成"
                        labelStyle={{color: Colors.blue600}}
                        style={{ margin: 10, position: 'absolute', bottom: 0, right: 0 }}
                        onClick={() => {
                          if (!editMode) {
                            this.setState({
                              name: validatTypeName(name.value),
                              en: validatTypeEn(en.value),
                              description: validatTypeDesc(description.value)                            
                            },
                              () => {
                                this.setHasError()
                                if (!this.hasError) {
                                  createType(name.value, en.value, description.value)
                                };
                              }
                            )
                          }
                        }}
                      />
                    }
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </Paper>
    );
  }
}

Types.propTypes = {
  types: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  didInvalidate: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { types, isFetching, didInvalidate } = state.types;
  return {
    types: types || [],
    isFetching: isFetching || false,
    didInvalidate: didInvalidate || false,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign(routeActions, TypeActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Types);
