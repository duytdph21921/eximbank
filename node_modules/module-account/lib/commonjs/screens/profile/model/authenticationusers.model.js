"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authenticationUsers = authenticationUsers;
exports.changeUserPassword = changeUserPassword;
function changeUserPassword(oldPassword, newPassword, confirmPassword) {
  this.oldPassword = oldPassword;
  this.newPassword = newPassword;
  this.confirmPassword = confirmPassword;
}
function authenticationUsers(username, email, mobile, password) {
  this.username = username;
  this.email = email;
  this.mobile = mobile;
  this.password = password;
}
//# sourceMappingURL=authenticationusers.model.js.map