export default class UserInfo {
  constructor({ profileName, jobElement }) {
    this._profileName = document.querySelector(profileName);
    this._jobElement = document.querySelector(jobElement);
  }

  getUserInfo() {
    return {
      title: this._profileName.textcontent,
      description: this._jobElement.textcontent,
    };
  }

  setUserInfo(userInf) {
    this._profileName.textcontent = userInf.title;
    this._jobElement.textcontent = userInf.description;
  }
}
