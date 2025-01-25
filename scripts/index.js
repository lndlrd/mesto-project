// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const content = document.querySelector('.content')
const places = content.querySelector('.places__list')
const cardElement = cardTemplate.querySelector('.card')
const editButton = content.querySelector('.profile__edit-button');
const addCardButton = content.querySelector('.profile__add-button');
const profileTitle = content.querySelector('.profile__title');
const profileDescription = content.querySelector('.profile__description');

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

const closeProfileButton = profilePopup.querySelector('.popup__close');
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');

const closeCardButton = cardPopup.querySelector('.popup__close');
const cardFormElement = cardPopup.querySelector('.popup__form');
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardURLInput = cardFormElement.querySelector('.popup__input_type_url');

const imageDetail = imagePopup.querySelector('.popup__image');
const closeImageButton = imagePopup.querySelector('.popup__close');
const imageCaption = imagePopup.querySelector('.popup__caption');

function openModal(popup) {
    popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
}


// @todo: Функция создания карточки

function createCard(name, link, alt) {
    const card = cardElement.cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const likeButton = card.querySelector('.card__like-button');
    const deleteButton = card.querySelector('.card__delete-button');

    cardImage.src = link;
    cardImage.alt = alt;
    cardTitle.textContent = name;

    likeButton.addEventListener('click', (evt) => {
        evt.target.classList.toggle('card__like-button_is-active');
    })
    deleteButton.addEventListener('click', () => {
        card.remove();
    })
    cardImage.addEventListener('click', () => {
        imageDetail.src = link;
        imageDetail.alt = alt;
        imageCaption.textContent = name;
        openModal(imagePopup);
    })
    return card;
}

initialCards.forEach((cardData) => {
    places.append(createCard(cardData.name, cardData.link, cardData.alt));
})


function setProfilePopup() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(profilePopup);
}

function setAddCardPopup() {
    cardNameInput.value = '';
    cardURLInput.value = '';
    openModal(cardPopup);
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const nameValue = evt.target[0].value;
    const jobValue = evt.target[1].value;
    profileTitle.textContent = nameValue;
    profileDescription.textContent = jobValue;
    closeModal(profilePopup);
}

editButton.addEventListener('click', () => setProfilePopup());
addCardButton.addEventListener('click', () => setAddCardPopup());

closeProfileButton.addEventListener('click', () => closeModal(profilePopup));
closeCardButton.addEventListener('click', () => closeModal(cardPopup));

function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const cardName = evt.target[0].value;
    const imageURL = evt.target[1].value;
    places.prepend(createCard(cardName, imageURL, cardName));
    closeModal(cardPopup);
    console.log(places)
}

profileFormElement.addEventListener('submit', handleProfileFormSubmit);
cardFormElement.addEventListener('submit', handleCardFormSubmit);

closeImageButton.addEventListener('click', () => closeModal(imagePopup));

