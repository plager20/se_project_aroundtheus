import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  open(data) {
    this._popupElement.querySelector("#modal-image-title").textContent =
      data.name;
    const image = this._popupElement.querySelector("#modal-image");
    image.src = data.link;
    image.alt = data.name;
    super.open();
  }
}
