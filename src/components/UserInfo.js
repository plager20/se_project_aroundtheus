export default class UserInfo {
  constructor({ profileName, jobElement }) {
    this._profileName = document.querySelector(profileName);
    this._jobElement = document.querySelector(jobElement);
  }

  getUserInfo() {
    console.log(this._profileName);
    return {
      name: this._profileName.textContent,
      job: this._jobElement.textContent,
    };
  }

  setUserInfo(userInf) {
    console.log(this._profileName);
    this._profileName.textContent = userInf.name;
    this._jobElement.textContent = userInf.job;
  }
}
