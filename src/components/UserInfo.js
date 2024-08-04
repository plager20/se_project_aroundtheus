export default class UserInfo {
  constructor({ profileName, jobElement, avatar }) {
    this._profileName = document.querySelector(profileName);
    this._jobElement = document.querySelector(jobElement);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._jobElement.textContent,
    };
  }

  setUserInfo(userInf) {
    this._profileName.textContent = userInf.name;
    this._jobElement.textContent = userInf.job;
    if (userInf.avatar) {
      this.setAvatar(userInf);
    }
  }

  setAvatar(userInf) {
    this._avatar.src = userInf.avatar;
  }
}
