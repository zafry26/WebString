import JwtDecode from "jwt-decode";
import { isNode, getNodeProcess } from "@Utils";
export const tokenKey = "Token";

/**
 * User's session context manager.
 */
export default class SessionManager {
  static tokenCheck = null;
  static _token = "";
  static _user = null;

  static _isInitialized = false;

  static _context = {};

  static resetSession() {
    this._isInitialized = false;
    this._context = {};
  }

  static initSession() {
    if (this._isInitialized) {
      throw Error("SessionManager: already initialized.");
    }

    this._context = {
      token: "",
      refreshToken: "",
    };

    this._isInitialized = true;
  }

  static throwIfNotInitialized() {
    if (!this._isInitialized) {
      throw Error(
        "SessionManager: you have to call 'SessionManager.initSession' for initialization."
      );
    }
  }

  static getSessionContext() {
    this.throwIfNotInitialized();
    return this._context;
  }

  static getServiceUser() {
    if (isNode()) {
      return null;
    }

    let token = this.getAccessToken();

    if (token) {
      clearInterval(this.tokenCheck);
      this.tokenCheck = setInterval(function () {
        SessionManager.checkTokenExpiry(SessionManager.getAccessToken());
      }, 1000);
      // this.tokenCheck = setInterval(
      //     () =>
      //     {
      //         this.checkTokenExpiry(this.getAccessToken())
      //     }
      //     , 1000
      // );

      return token;
    }

    return null;
  }

  //called when login api return response
  static setServiceUser(serviceUser) {
    //set token into local storage
    this.updateToken(serviceUser.token);
    let context = this.getSessionContext();
    //get token from local storage
    context.token = this.getAccessToken();
  }

  static get isAuthenticated() {
    return this.getServiceUser() != null;
  }

  //to store token into local storage after login success
  static updateToken(token) {
    this._token = token;
    this._processToken(this._token);
    if (this._token) {
      window.localStorage.setItem(tokenKey, this._token);
    } else {
      window.localStorage.removeItem(tokenKey);
    }
  }

  static _processToken(token) {
    if (!token) {
      return;
    }
    this._token = token;
    this._user = null;
    try {
      this._user = JwtDecode(token);
    } catch (error) {
      //console.log(error);
      alert(error.message);
    }
  }

  static getAccessToken() {
    let result = window.localStorage.getItem(tokenKey);

    if (result === "undefined") {
      return "";
    }
    return result;
  }

  static checkTokenExpiry(token) {
    if (token) {
      const { exp } = JwtDecode(token);
      let expired = Date.now() >= exp * 1000;
      if (expired) {
        clearInterval(this.tokenCheck);
        localStorage.removeItem(tokenKey);
        // AuthApi.refresh(_this.getRefreshToken())
        //     .then(
        //         (newToken) => {  _this.updateToken(newToken) }
        //     )
        //     .catch(() => {
        //         _this.updateToken(null);
        //         window.location.href = "/login";
        //     });
      }
    }
    //return Promise.resolve();
  }
}
