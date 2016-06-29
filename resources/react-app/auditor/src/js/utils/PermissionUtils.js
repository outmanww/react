export function hasPermission(roles, permissions, permission) {
  if (roles) {
    if (roles.indexOf('Administrator') >= 0) {
      return true;
    }
  }

  if (permissions) {
    if (permissions.indexOf(permission) >= 0) {
      return true;
    }
  }
  return false;
}
