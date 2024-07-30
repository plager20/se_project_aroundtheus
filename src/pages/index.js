import Api from "../components/Api.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import "./index.css";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupDeleteConfirm from "../components/PopupDeleteConfirm.js";
import { initialCards, validationSettings } from "../utils/constants.js";

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
// const cardListEL = document.querySelector(".cards__list");

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "02e2a34c-53b2-49ac-946d-3d9791bbdd65",
    "Content-Type": "application/json",
  },
});

// Initial Start Up

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

// Image Popup

const popupImage = new PopupWithImage({
  popupSelector: "#image-modal",
});

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
    }, profileEditPopup.close())
    .catch((err) => {
      console.log(err);
    })
    .finally(() => profileEditPopup.setLoading(false));

  //profileEditPopup.close();
}

profileEditCloseButton.addEventListener("click", () => {
  profileEditPopup.close();
});

// Change Avatar Modal

const changeAvatarModal = document.querySelector("#change-avatar-modal");
const changeImageForm = new PopupWithForm(
  "#change-avatar-modal",
  handleChangeAvatarFormSubmit
);
changeImageForm.setEventListeners();

const changeAvatarButton = document.querySelector(
  ".change-avatar__edit-button"
);

changeAvatarButton.addEventListener("click", () => {
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

// Delete Card

const deleteConfirmation = new PopupDeleteConfirm(
  "#delete-image-modal",
  handleDeleteCard
);
deleteConfirmation.setEventListeners();

function handleDeleteCard(cardData) {
  deleteConfirmation.open();
  deleteConfirmation.confirmDelete(() => {
    deleteConfirmation.setLoading(true);
    api
      .deleteCard(cardData.getCardId())
      .then(() => {
        cardData.removeCard();
        deleteConfirmation.close();
      })
      .catch((err) => console.error(err))
      .finally(() => deleteConfirmation.setLoading(false));
  });
}

//Liking and Disliking Cards

function handleCardLike(cardData) {
  if (!cardData.like) {
    api.likeCard(cardData.getCardId()).then(() => {
      cardData.handleLike(true);
    });
  } else if (cardData.like) {
    api.dislikeCard(cardData.getCardId()).then(() => {
      cardData.handleLike(false);
    });
  }
}

// Initial Cards

function getCardElement(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteCard,
    handleCardLike
  );
  const element = card.getView();
  return element;
}

const cardList = new Section(
  {
    renderer: (items) => {
      cardList.addItem(items);
    },
  },
  ".cards__list"
);

async function cardListData() {
  const initialCardData = await api.getInitialCards();
  const cardElements = initialCardData.map((cardData) =>
    getCardElement(cardData)
  );
  cardList.renderItems(cardElements);
}

cardListData();

// New Cards

const newCardPopup = new PopupWithForm("#add-modal", handleAddCardSubmit);
newCardPopup.setEventListeners();

imageAddButton.addEventListener("click", () => {
  newCardPopup.open();
});

function handleAddCardSubmit(inputValue) {
  const name = inputValue.title;
  const link = inputValue.link;
  api
    .createNewCard({ name, link })
    .then((card) => {
      const cardElement = getCardElement(card);
      cardList.addItem(cardElement);
      newCardPopup.reset();
      newCardPopup.close();
      addFormValidator.toggleButtonState();
    })
    .catch((err) => console.error(err));
}

// View Image Popup

function handleImageClick(cardData) {
  popupImage.open(cardData);
}

// Validation

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditModal
);
const addFormValidator = new FormValidator(validationSettings, imageAddModal);

const avatarFormValidator = new FormValidator(
  validationSettings,
  changeAvatarModal
);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarFormValidator.enableValidation();
