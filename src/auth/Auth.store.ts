
class AuthStore {
  isAuthorized?: boolean = undefined;

  constructor() {
    // make obserbale (this)
    // make clear all required data
  }

  setAuthorizationStatus = (isAuth = false) => {
    this.isAuthorized = isAuth;
  }
}

export default new AuthStore();
export interface IAuthStore extends AuthStore {}
