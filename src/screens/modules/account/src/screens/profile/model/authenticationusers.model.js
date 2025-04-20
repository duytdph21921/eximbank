export function changeUserPassword(oldPassword, newPassword, confirmPassword) {
  this.oldPassword = oldPassword;
  this.newPassword = newPassword;
  this.confirmPassword = confirmPassword;
}

export function authenticationUsers(username, email, mobile, password) {
  this.username = username;
  this.email = email;
  this.mobile = mobile;
  this.password = password;
}
