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

// Modals
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalEscape);
  modal.addEventListener("mousedown", closeModalClick);
}

// Variables
const modalContainer = document.querySelector(".modal__container");
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
const profileEditForm = document.forms[0];
const imagePreviewModal = document.querySelector("#image-modal");
const modalImage = imagePreviewModal.querySelector("#modal-image");
const imageTitle = imagePreviewModal.querySelector("#modal-image-title");
const imagePreviewCloseButton = document.querySelector("#image-modal-close");

// Profile Edit Modal

function openProfileEditForm() {
  openModal(profileEditModal);
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function handleProfileEditFormSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

profileEditButton.addEventListener("click", openProfileEditForm);
profileEditCloseButton.addEventListener("click", () =>
  closeModal(profileEditModal)
);
profileEditForm.addEventListener("submit", handleProfileEditFormSubmit);

// Image Add Modal
const imageAddButton = document.querySelector(".profile__add-button");
const imageAddModal = document.querySelector("#add-modal");
const imageAddCloseButton = imageAddModal.querySelector("#add-modal-close");

imageAddButton.addEventListener("click", () => openModal(imageAddModal));
imageAddCloseButton.addEventListener("click", () => closeModal(imageAddModal));

// Initial Cards
const cardListEL = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEL = cardElement.querySelector(".card__image");
  const cardTitleEL = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEL.addEventListener("click", () => {
    modalImage.src = cardData.link;
    modalImage.alt = cardData.name;
    imageTitle.textContent = cardData.name;
    openModal(imagePreviewModal);
  });

  cardImageEL.src = cardData.link;
  cardImageEL.alt = cardData.name;
  cardTitleEL.textContent = cardData.name;

  return cardElement;
}

initialCards.forEach((cardData) => renderCard(cardData, cardListEL));

// New Cards
const addCardFormElement = document.forms[1];
const cardTitleInput = addCardFormElement.querySelector(
  ".modal__input_type_title"
);
const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEL);
  cardTitleInput.value = "";
  cardUrlInput.value = "";
  closeModal(imageAddModal);
}

addCardFormElement.addEventListener("submit", handleAddCardSubmit);

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

// Image Preview

imagePreviewCloseButton.addEventListener("click", () =>
  closeModal(imagePreviewModal)
);

// Close with Click/Escape Functions
function closeModalClick(e) {
  if (e.target === e.currentTarget) {
    closeModal(e.currentTarget);
  }
}

function closeModalEscape(e) {
  if (e.key === "Escape") {
    const targetModal = document.querySelector(".modal_opened");
    closeModal(targetModal);
  }
}
