/*eslint-disable max-len,quotes*/
export default {


  "unexpected": `予期せぬエラーが発生しました。もう一度実行してください。`,
  "nav.dashboard": `ダッシュボード`,

  "nav.access": `アクセス管理`,
  "nav.flight": `フライト管理`,
  "nav.flight.plan": `プラン`,
  "nav.flight.type": `タイプ`,
  "nav.flight.place": `場所`,
  "nav.pin": `PINコード管理`,

  "user.update.success": `ユーザー情報を更新しました`,
  "user.store.success": `ユーザー情報を作成しました`,
  "user.changePassword.success": `ユーザーのパスワードを変更しました`,
  "user.activate.success": `ユーザーの利用停止を解除しました`,
  "user.deactivate.success": `ユーザーを利用停止にしました`,
  "user.restore.success": `ユーザーを復旧しました`,
  "user.destroy.success": `ユーザーを削除しました`,
  "user.delete.success": `ユーザーを完全に削除しました`,
  "user.resend.success": `ユーザーにメールを送信しました`,

  "plan.notFound": `指定されたプランは存在しません`,
  "plan.alreadyExist": `すでに同じプランが存在しています`,
  "plan.hasFlights": `このプランで開講しているフライトが存在しています`,

  "type.notFound": `指定されたタイプは存在しません`,
  "type.sameNameExist": `同じ名前のタイプが既に存在しています`,
  "type.hasPlans": `このタイプで開講しているプランが存在しています`,

  "place.notFound": `指定された場所は存在しません`,
  "place.sameNameExist": `同じ名前のタイプが既に存在しています`,
  "place.hasPlans": `このタイプで開講しているプランが存在しています`,

  "generatePin.success": `PINコードを作成しました`,
  "sideAlert.success": `{attribute, plural,
  	=user {ユーザー} =role {ロール} =permission {パーミッション}}{method, plural,
  	=activate {の停止を解除} =deactivate {を停止} =restore{を復旧} =destroy{を削除} =delete{を完全に削除} =resend{に確認メールを送信}}しました`,
  "sideAlert.fail": `{attribute, plural,
  	=user {ユーザー} =role {ロール} =permission {パーミッション}}{method, plural,
  	=activate {の停止解除} =deactivate {の停止} =restore{の復旧} =destroy{の削除} =delete{の完全削除} =resend{へのメール送信}}に失敗しました。もう一度実行してください`,
  "validate.required": `入力必須項目です`,
  "validate.alpha": `アルファベットで入力してください`,
  "validate.max:8": `8文字以内で入力してください`,
  "validate.max:120": `120文字以内で入力してください`,
};
