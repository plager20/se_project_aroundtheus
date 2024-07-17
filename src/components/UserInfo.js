export default class UserInfo {
  constructor({ profileName, jobElement, avatar }) {
    this._profileName = document.querySelector(profileName);
    this._jobElement = document.querySelector(jobElement);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    console.log(this._profileName);
    return {
      name: this._profileName.textContent,
      job: this._jobElement.textContent,
    };
  }

  setUserInfo(userInf) {
    this._profileName.textContent = userInf.name;
    this._jobElement.textContent = userInf.job;
    if (userInf.avatar) {
      this._avatar.src = userInf.avatar;
    }
    return;
  }

  setAvatar(userInf) {
    this._avatar.src = userInf.avatar;
  }
}
