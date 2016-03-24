<?php

return [

    /*
     * Users table used to store users
     */
    'users_table' => 'users',

    /*
     * Role model used by Access to create correct relations. Update the role if it is in a different namespace.
    */
    'role' => App\Models\Access\Role\Role::class,

    /*
     * Roles table used by Access to save roles to the database.
     */
    'roles_table' => 'roles',

    /*
     * assigned_roles table used by Access to save assigned roles to the database.
     */
    'role_user_table' => 'role_user',

    /*
     * Permission model used by Access to create correct relations.
     * Update the permission if it is in a different namespace.
     */
    'permission' => App\Models\Access\Permission\Permission::class,

    /*
     * Permissions table used by Access to save permissions to the database.
     */
    'permissions_table' => 'permissions',

    /*
     * permission_role table used by Access to save relationship between permissions and roles to the database.
     */
    'permission_role_table' => 'permission_role',

    /*
     * permission_user table used by Access to save relationship between permissions and users to the database.
     * This table is only for permissions that belong directly to a specific user and not a role
     */
    'permission_user_table' => 'permission_user',

    /*
     * Operation model used by Access to create correct relations.
     * Update the operation if it is in a different namespace.
     */
    'operation' => App\Models\Access\Operation\Operation::class,

    /*
     * Operations table used by Access to save operations to the database.
     */
    'operations_table' => 'operations',

    /*
     * permission_user table used by Access to save relationship between permissions and users to the database.
     * This table is only for permissions that belong directly to a specific user and not a role
     */
    'operation_permission_table' => 'operation_permission',

    /*
     * Configurations for the user
     */
    'users' => [
        /*
         * Administration tables
         */
        'default_per_page' => 25,

        /*
         * The role the user is assigned to when they sign up from the frontend, not namespaced
         */
        'default_role' => 'User',
        //'default_role' => 2,

        /*
         * Whether or not the user has to confirm their email when signing up
         */
        'confirm_email' => false,

        /*
         * Whether or not the users email can be changed on the edit profile screen
         */
        'change_email' => false,
    ],

    /*
     * Configuration for roles
     */
    'roles' => [
        /*
         * Whether a role must contain a permission or can be used standalone as a label
         */
        'role_must_contain_permission' => true
    ],

    /*
     * Socialite session variable name
     * Contains the name of the currently logged in provider in the users session
     * Makes it so social logins can not change passwords, etc.
     */
    'socialite_session_name' => 'socialite_provider',
];