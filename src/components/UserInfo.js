export default class UserInfo {
  constructor({ profileName, jobElement }) {
    this._profileName = document.querySelector(profileName);
    this._jobElement = document.querySelector(jobElement);
  }

  getUserInfo() {
    console.log(this._profileName);
    return {
      title: this._profileName.textContent,
      description: this._jobElement.textContent,
    };
  }

  setUserInfo(userInf) {
    console.log(this._profileName);
    this._profileName.textContent = userInf.title;
    this._jobElement.textContent = userInf.description;
  }
}
