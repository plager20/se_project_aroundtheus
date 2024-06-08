import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  open(data) {
    this._popupElement.querySelector("#modal-image-title").textContent =
      data.name;
    this._image = this._popupElement.querySelector("#modal-image");
    this._image.src = data.link;
    this._image.alt = data.name;
    super.open();
  }
}
