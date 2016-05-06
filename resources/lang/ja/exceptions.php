<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Exception Language Lines
    |--------------------------------------------------------------------------
    |
    | The following language lines are used in Exceptions thrown throughout the system.
    | Regardless where it is placed, a button can be listed here so it is easily
    | found in a intuitive way.
    |
    */

    'backend' => [
        'access' => [
            'permissions' => [
                'create_error' => 'There was a problem creating this permission. Please try again.',
                'delete_error' => 'There was a problem deleting this permission. Please try again.',

                'groups' => [
                    'associated_permissions' => 'You can not delete this group because it has associated permissions.',
                    'has_children' => 'You can not delete this group because it has child groups.',
                    'name_taken' => 'There is already a group with that name',
                ],

                'not_found' => 'That permission does not exist.',
                'system_delete_error' => 'You can not delete a system permission.',
                'update_error' => 'There was a problem updating this permission. Please try again.',
            ],

            'roles' => [
                'already_exists' => 'That role already exists. Please choose a different name.',
                'cant_delete_admin' => 'You can not delete the Administrator role.',
                'create_error' => 'There was a problem creating this role. Please try again.',
                'delete_error' => 'There was a problem deleting this role. Please try again.',
                'has_users' => 'You can not delete a role with associated users.',
                'needs_permission' => 'You must select at least one permission for this role.',
                'not_found' => 'That role does not exist.',
                'update_error' => 'There was a problem updating this role. Please try again.',
            ],

            'users' => [
                'cant_deactivate_self' => 'You can not do that to yourself.',
                'cant_delete_self' => 'You can not delete yourself.',
                'create_error' => 'There was a problem creating this user. Please try again.',
                'delete_error' => 'There was a problem deleting this user. Please try again.',
                'email_error' => 'That email address belongs to a different user.',
                'mark_error' => 'There was a problem updating this user. Please try again.',
                'not_found' => 'That user does not exist.',
                'restore_error' => 'There was a problem restoring this user. Please try again.',
                'role_needed_create' => 'You must choose at lease one role. User has been created but deactivated.',
                'role_needed' => 'You must choose at least one role.',
                'update_error' => 'There was a problem updating this user. Please try again.',
                'update_password_error' => 'There was a problem changing this users password. Please try again.',
            ],
        ],
    ],

    'frontend' => [
        'auth' => [
            'confirmation' => [
                'already_confirmed' => 'すでにメールアドレスの確認が完了しています',
                'confirm' => 'メールアドレスの確認が完了しました',
                'created_confirm' => 'ユーザー登録が完了しました 確認のためのメールを送信しました',
                'mismatch' => '確認用のURLが間違っています。もう一度確認してください',
                'not_found' => '確認用のURLが間違っています。もう一度確認してください',
                'resend' => 'メールアドレスの確認が完了していません、メールを確認してください。または、<a href="/:school/account/confirm/resend/:token">こちらのリンク</a>より確認メールの再送信を行ってください。',
                'success' => 'メールアドレスの確認が完了しました',
                'resent' => '確認メールが送信されました。メールを確認してください',
            ],

            'deactivated' => 'このアカウントは現在利用できんません',
            'email_taken' => 'このメールアドレスはすでに利用されています',

            'password' => [
                'change_mismatch' => '現在のパスワードが間違っています',
            ],


        ],
    ],

    'lecture' => [
        'not_found' => '該当する授業が見つかりません',
    ],

    'room' => [
        'not_found' => '該当する授業が見つかりません',
        'not_room_in' => '入室されていません',
        'not_integer' => 'ルームキーは数字のみです',
        'closed' => 'この授業はすでに終了しました',
        'already_room_in' => 'すでに入室状態です',
        'already_room_out' => 'すでに退室状態です',
        'already_fore_in' => 'すでにbackground状態です',
        'already_fore_out' => 'すでにforeground状態です',
        'not_in_campus' => '指定エリア外にいるため利用できません',        
    ],

    'shop_type' => [
        'not_found' => '該当する店カタログが見つかりません',
    ],

    'shop' => [
        'not_found' => '該当するお店が見つかりません',
    ],

    'item' => [
        'not_found' => '該当する商品が見つかりません',
    ],

    'student' => [
        'not_found' => '該当するユーザが見つかりません',
    ],

    'email' => [
        'not_found' => 'このemailが登録されていません',
        'already_exist' => 'このメールアドレスはすでに利用されています',
    ],

    'password' => [
        'not_correct' => 'パスワードが間違っています',
    ],

    'confirmation' => [
        'not_found' => '確認コードが見つかりません',
        'already_confirmed' => 'すでに登録しました',
        'mismatch' => '確認コードが無効です',
    ],

    'api_token' => [
        'not_found' => '認証コードが見つかりません',
    ]
];