import Api from "../components/Api.js";
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

const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const imageAddButton = document.querySelector(".profile__add-button");
const imageAddModal = document.querySelector("#add-modal");
const cardListEL = document.querySelector(".cards__list");

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "02e2a34c-53b2-49ac-946d-3d9791bbdd65",
    "Content-Type": "application/json",
  },
});

// Classes

api.getInitialCards().then((initialCards) => {
  const cardList = new Section(
    {
      items: initialCards,
      renderer: (cardData) => {
        cardList.addItem(cardData);
      },
    },
    ".cards__list"
  );
});

const userInfo = new UserInfo({
  profileName: ".profile__title",
  jobElement: ".profile__description",
  avatar: ".profile__image",
});

api
  .getUserInfo()
  .then((res) => {
    userInfo.setUserInfo({
      name: res.name,
      job: res.about,
      avatar: res.avatar,
    });
  })
  .catch((err) => {
    console.log(err);
  });

const newCardPopup = new PopupWithForm("#add-modal", handleAddCardSubmit);

const popupImage = new PopupWithImage({
  popupSelector: "#image-modal",
});

newCardPopup.setEventListeners();

popupImage.setEventListeners();

// Profile Edit Modal

const profileEditPopup = new PopupWithForm(
  "#edit-modal",
  handleProfileEditFormSubmit
);

profileEditPopup.setEventListeners();

function fillProfileForm() {
  const profileInfo = userInfo.getUserInfo();
  profileTitleInput.value = profileInfo.name;
  profileDescriptionInput.value = profileInfo.job;
}

profileEditButton.addEventListener("click", () => {
  fillProfileForm();
  profileEditPopup.open();
});

function handleProfileEditFormSubmit(profileInfo) {
  profileEditPopup.setLoading(true);
  api
    .updateUserInfo(profileInfo)
    .then((res) => {
      userInfo.setUserInfo({
        name: res.name,
        job: res.about,
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => profileEditPopup.setLoading(false));

  profileEditPopup.close();
}

profileEditCloseButton.addEventListener("click", () => {
  profileEditPopup.close();
});

// Change Avatar Modal

const changeImageForm = new PopupWithForm(
  "#change-avatar-modal",
  handleChangeAvatarFormSubmit
);
changeImageForm.setEventListeners();

const changeAvatarButton = document.querySelector(
  ".change-avatar__edit-button"
);

changeAvatarButton.addEventListener("click", (evt) => {
  evt.preventDefault;
  changeImageForm.open();
});

function handleChangeAvatarFormSubmit(profileInfo) {
  changeImageForm.setLoading(true);
  api
    .updateAvatar(profileInfo)
    .then((res) => {
      userInfo.setAvatar({ avatar: res.avatar });
      changeImageForm.close();
    })
    .catch((err) => console.error(err))
    .finally(() => changeImageForm.setLoading(false));
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
