let userInfo = null;

export default class Auth {
  static isSignedIn() {
    return userInfo !== null;
  }

  static signOut() {
    userInfo = null;
  }

  static signIn(credentials) {
    return new Promise((resolve, reject) => {
      resolve({
        username: credentials.username,
        token: 'secured-token'
      })
    }).then(response => userInfo = response)
  }
}