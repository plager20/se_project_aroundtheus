import Popup from "./Popup";

export default class PopupDeleteConfirm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._submitButton = this._popupElement.querySelector(".modal__button");
    this._handleFormSubmit = handleFormSubmit;
  }

  setLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Deleting...";
    } else {
      this._submitButton.textContent = "Yes";
    }
  }

  confirmDelete(api) {
    this._handleFormSubmit = api;
    console.log(this._handleFormSubmit);
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }
}
