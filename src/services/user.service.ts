import http from "../http-common";
class User {
  googleLogin(data: any) {
    return http.post("/api/google/auth/client", data, this.config());
  }
  logout() {
    return http.post("/api/logout", {}, this.config());
  }
  usersMe() {
    return http.get("/api/users/me", this.config())
  }
  saveSession(token: string,expires: string, seconds: number) {
    localStorage.setItem('currentUserToken', token);
    localStorage.setItem('currentUserExpires', expires);
    localStorage.setItem('currentUserExpiresSeconds', seconds.toString());
  }
  clearSession() {
    localStorage.removeItem("currentUserToken");
    localStorage.removeItem("currentUserExpires");
    localStorage.removeItem("currentUserExpiresSeconds");
  }
  defaultUser(){
    return {
      disabled: false,
      email: "",
      family_name: "",
      given_name: "",
      picture: "",
      username: "",
      _id: ""
    }
  }
  config(params?: any, bearer: boolean = false, contentType = "application/json", aditionalConfig?: any, callback?: any) {
    var defaultConf: any = {
      headers: {
        "Content-type": contentType
      },
      params
    }
    if (params != null) {
      defaultConf.params = params
    }
    if (aditionalConfig !== null) {
      for (const key in aditionalConfig) {
        if (aditionalConfig.hasOwnProperty(key)) {
          defaultConf[key] = aditionalConfig[key]
        }
      }
    }

    var token = localStorage.getItem('currentUserToken');
    var expires = localStorage.getItem('currentUserExpires');
    if (expires === null || expires === undefined || bearer) {
      if (callback) {
        callback();
      }
      return defaultConf
    }
    var expireDate = Date.parse(expires)
    if (Date.now() <= expireDate) {
      var confs: any = {
        headers: {
          "Content-type": contentType,
          'Authorization': `Bearer ${token}`
        },
        params
      }
      if (params != null) {
        confs.params = params
      }
      if (aditionalConfig !== null) {
        for (const key in aditionalConfig) {
          if (aditionalConfig.hasOwnProperty(key)) {
            confs[key] = aditionalConfig[key]
          }
        }
      }
      if (callback) {
        callback();
      }
      return confs;
    } else {
      this.clearSession();
      if (callback) {
        callback();
      }
      return defaultConf;
    }
  }
  catchErrors(e: any, callback?: any) {
    try {
      if (callback)
        callback();
      if (e.response.status === 403 || e.response.status === 401) {
        this.logout();
      }
    } catch (error) {
      console.log(e)
    }
  }
}
export default new User();