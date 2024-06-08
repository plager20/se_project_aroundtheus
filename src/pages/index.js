import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
    alt: "Picture of Yosemite Valley",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
    alt: "Picture of Yosemite Valley",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
    alt: "Picture of Yosemite Valley",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
    alt: "Picture of Yosemite Valley",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
    alt: "Picture of Yosemite Valley",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
    alt: "Picture of Yosemite Valley",
  },
];

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

// Variables
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector("#edit-modal");
const profileEditCloseButton =
  profileEditModal.querySelector("#edit-modal-close");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileEditForm = document.querySelector("#edit-modal-form");
const imagePreviewModal = document.querySelector("#image-modal");
const modalImage = imagePreviewModal.querySelector("#modal-image");
const imageTitle = imagePreviewModal.querySelector("#modal-image-title");
const imagePreviewCloseButton = document.querySelector("#image-modal-close");
const imageAddButton = document.querySelector(".profile__add-button");
const imageAddModal = document.querySelector("#add-modal");
const imageAddCloseButton = imageAddModal.querySelector("#add-modal-close");
const cardListEL = document.querySelector(".cards__list");

// Classes
const section = new Section(
  {
    items: initialCards,
    renderer: (cardData) => {
      section.addItem(cardData);
    },
  },
  ".cards__list"
);

const newCardPopup = new PopupWithForm("#add-modal", handleAddCardSubmit);

const userInfo = new UserInfo({
  profileName: ".profile__title",
  jobElement: ".profile__description",
});

const profileEditPopup = new PopupWithForm(
  "#edit-modal",
  handleProfileEditFormSubmit
);

const popupImage = new PopupWithImage({
  popupSelector: "#image-modal",
});

newCardPopup.setEventListeners();
profileEditPopup.setEventListeners();
popupImage.setEventListeners();

profileEditCloseButton.addEventListener("click", () => {
  profileEditPopup.close();
});

// Profile Edit Modal
function openProfileEditForm() {
  const profileInfo = userInfo.getUserInfo();
  profileTitleInput.value = profileInfo.name;
  profileDescriptionInput.value = profileInfo.job;
  profileEditPopup.open();
}

profileEditButton.addEventListener("click", openProfileEditForm);

function handleProfileEditFormSubmit(inputValues) {
  const profileInfo = {};
  profileInfo.name = inputValues.title;
  profileInfo.job = inputValues.description;
  console.log(profileInfo);
  userInfo.setUserInfo(profileInfo);
  profileEditPopup.close();
}

// Initial Cards
function handleImageClick(cardData) {
  popupImage.open(cardData);
}

function getCardElement(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  const element = card.getView();
  return element;
}

function renderCard(cardData, wrapper) {
  const element = getCardElement(cardData);
  wrapper.prepend(element);
}

initialCards.forEach((cardData) => renderCard(cardData, cardListEL));

// New Cards
imageAddButton.addEventListener("click", () => {
  newCardPopup.open();
});

const addCardFormElement = document.querySelector("#add-card-form");
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");

function handleAddCardSubmit() {
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEL);
  newCardPopup.reset();
  newCardPopup.close();
  addFormValidator.toggleButtonState();
}

// Validation
const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditModal
);
const addFormValidator = new FormValidator(validationSettings, imageAddModal);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
