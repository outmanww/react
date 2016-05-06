import React, { PropTypes, Component } from 'react';

class Description extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { focused } = this.props;
    let description;

    function getDescription (focused) {
      switch (focused) {
        case 'default': return (
          <div>
            <p>登録する授業の情報を登録してください</p>
          </div>
        );
        case 'target': return (
          <div>
            <p>講義の対象学部・学科・学年を選択してください</p>
            <p>この項目は作成後の修正ができません</p>
          </div>
        );
        case 'title': return (
          <div>
            <p>講義の名前を入力してください</p>
            <p>学生が入室する際に表示されます</p>
            <p>英数字・漢数字・ローマ数字は区別されます</p>
          </div>
        );
        case 'code': return (
          <div>
            <p>講義コードを入力してください</p>
            <p>授業担当者が複数人いる場合こちらのコード及び講義の対象学部・学科で識別するため正確に入力してください</p>
            <p>この項目は作成後の修正ができません</p>
          </div>
        );
        case 'time': return (
          <div>
            <p>開講する時期を選択してください</p>
            <p>学生が入室する際に表示されます</p>
          </div>
        );
        case 'place': return (
          <div>
            <p>主に講義を行う教室または実験室を入力してください</p>
          </div>
        );
        case 'length': return (
          <div>
            <p>講義の長さを入力してください</p>
            <p>授業ルームをオープンする際にデフォルト値として利用します</p>
          </div>
        );
        case 'description': return (
          <div>
            <p>講義の説明を入力してください</p>
          </div>
        );
        default: 
      }
    }

    return (
      <div className="right-panel has-border hint-box">
        <img src="/images/icons/hint.svg" width="32" height="32"/>
        <div className="space-top-4 space-bottom-3">{getDescription(focused)}</div>
      </div>
    );
  }
}

Description.propTypes = {
  focused: PropTypes.string.isRequired,
};

export default Description;
