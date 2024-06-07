import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  open({ link, name }) {
    this._popupElement.querySelector("#modal-image-title").textContent = name;
    this._image = this._popupElement.querySelector("#modal-image");
    this._image.src = link;
    this._image.alt = name;
    super.open();
  }
}
