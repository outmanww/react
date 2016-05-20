/*eslint-disable max-len,quotes*/
export default {
  "unexpected": `接続エラーです。もう一度実行してください`,

  "nav.dashboard": `ダッシュボード`,
  "nav.lecture": `授業の管理`,
  "nav.user": `ユーザー情報`,

  "user.alreadyHasRoom": `すでに開講中の授業が存在しています`,

  "lecture.store.success": `新しく講義を作成しました`,
  "lecture.join.success": `新しい講義を登録しました`,

  "room.open.success": `授業を開始しました`,
  "room.close.success": `授業を終了しました`,

  "room.overSize": `現在一時的に授業の開講ができません`,



  "validate.required": `入力必須項目です`,
  "validate.num": `英数字で入力してください`,
  "validate.alpha": `アルファベットで入力してください`,
  "validate.alphaNum": `アルファベットまたは英数字で入力してください`,
  "validate.max:8": `8文字以内で入力してください`,
  "validate.max:15": `15文字以内で入力してください`,
  "validate.max:30": `30文字以内で入力してください`,
  "validate.max:120": `120文字以内で入力してください`,

  "user.update.success": `ユーザー情報を更新しました`,
  "user.store.success": `ユーザー情報を作成しました`,
  "user.changePassword.success": `ユーザーのパスワードを変更しました`,
  "user.activate.success": `ユーザーの利用停止を解除しました`,
  "user.deactivate.success": `ユーザーを利用停止にしました`,
  "user.restore.success": `ユーザーを復旧しました`,
  "user.destroy.success": `ユーザーを削除しました`,
  "user.delete.success": `ユーザーを完全に削除しました`,
  "user.resend.success": `ユーザーにメールを送信しました`,

  "generatePin.success": `PINコードを作成しました`,
  "sideAlert.success": `{attribute, plural,
    =user {ユーザー} =role {ロール} =permission {パーミッション}}{method, plural,
    =activate {の停止を解除} =deactivate {を停止} =restore{を復旧} =destroy{を削除} =delete{を完全に削除} =resend{に確認メールを送信}}しました`,
  "sideAlert.fail": `{attribute, plural,
    =user {ユーザー} =role {ロール} =permission {パーミッション}}{method, plural,
    =activate {の停止解除} =deactivate {の停止} =restore{の復旧} =destroy{の削除} =delete{の完全削除} =resend{へのメール送信}}に失敗しましたもう一度実行してください`,
  
};
