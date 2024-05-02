class FormValidator {
  constructor(settings, formElement) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    this._form = formElement;
  }

  _showInputError(_form, inputElement, _inputErrorClass, _errorClass) {
    const errorMessageEl = this._form.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputElement.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  _hideInputError(_form, inputElement, _inputErrorClass, _errorClass) {
    const errorMessageEl = this._form.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  _toggleButtonState(inputList, _submitButtonSelector, _inactiveButtonClass) {
    if (_hasInvalidInput(inputList)) {
      this._submitButtonSelector.classList.add(this._inactiveButtonClass);
      this._submitButtonSelector.disabled = true;
      return;
    }

    this._submitButtonSelector.classList.remove(this._inactiveButtonClass);
    this._submitButtonSelector.disabled = false;
  }

  _hasInvalidInput(inputList) {
    return !inputList.every((inputElement) => inputElement.validity.valid);
  }

  _checkInputValidity(_form, inputElement, _inputErrorClass, _errorClass) {
    if (!inputElement.validity.valid) {
      return _showInputError(
        this._form,
        inputElement,
        this._inputErrorClass,
        this._errorClass
      );
    }

    _hideInputError(
      this._form,
      inputElement,
      this._inputErrorClass,
      this._errorClass
    );
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        _checkInputValidity(
          this._form,
          inputElement,
          this._inputErrorClass,
          this._errorClass
        );
        _toggleButtonState(inputList, submitButton, this._inactiveButtonClass);
      });
    });
  }

  _enableValidation() {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(this._form, settings);
  }
}

export default FormValidator;
