class Auth {
  constructor() {
    this.authenticated = false;
  }

  signin(callback) {
    this.authenticated = true;
    if (callback) callback();
  }

  logout(callback) {
    this.authenticated = false;
    if (callback) callback();
  }

  isAuthenticate() {
    return this.authenticated;
  }
}
export default new Auth();
