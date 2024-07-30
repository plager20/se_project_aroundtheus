class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleCardLike
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this.like = data.isLiked;

    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleCardLike = handleCardLike;
  }

  //Template

  getView() {
    this._element = this._getTemplate();

    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._cardImage = this._element.querySelector(".card__image");

    this._cardTitle = this._element.querySelector(".card__title");
    this._cardImage = this._element.querySelector(".card__image");

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    this._handleLikeIcon();

    return this._element;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  //Liking

  _handleLikeIcon() {
    if (this.like) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }

    this._likeCounter = this._element.querySelector(".card__like-count");
    if (this.like) {
      this._likeCounter.textContent = "1";
    } else {
      this._likeCounter.textContent = "0";
    }
  }

  handleLike(liked) {
    this.like = liked;
    this._handleLikeIcon();
  }

  //Deleting

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  //Card Id

  getCardId() {
    return this._cardId;
  }

  //EventListeners

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleCardLike(this);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick({
        name: this._name,
        link: this._link,
      });
    });
  }
}

export default Card;
