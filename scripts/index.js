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

// Profile Edit Modal
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
const profileEditForm = profileEditModal.querySelector("#edit-modal-form");

function closeEditModal() {
  profileEditModal.classList.remove("modal_opened");
}

function openEditModal() {
  profileEditModal.classList.add("modal_opened");
}

function fillProfileForm() {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function profileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeEditModal();
}

profileEditButton.addEventListener("click", openEditModal);
profileEditButton.addEventListener("click", fillProfileForm);
profileEditCloseButton.addEventListener("click", closeEditModal);
profileEditForm.addEventListener("submit", profileEditSubmit);

// Image Add Modal
const imageAddButton = document.querySelector(".profile__add-button");
const imageAddModal = document.querySelector("#add-modal");
const imageAddCloseButton = imageAddModal.querySelector("#add-modal-close");

function closeAddModal() {
  imageAddModal.classList.remove("modal_opened");
}
``;

function openAddModal() {
  imageAddModal.classList.add("modal_opened");
}

imageAddButton.addEventListener("click", openAddModal);
imageAddCloseButton.addEventListener("click", closeAddModal);

// Initial Cards
const cardListEL = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImageEL = cardElement.querySelector(".card__image");
  cardImageEL.src = cardData.link;

  cardImageEL.alt = cardData.name;

  const cardTitleEL = cardElement.querySelector(".card__title");
  cardTitleEL.textContent = cardData.name;

  return cardElement;
}

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEL.append(cardElement);
});

// New Cards
