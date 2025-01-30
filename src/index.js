import './pages/index.css';
import initialCards from "./components/initialCards";
import enableValidation from "./components/validate";
import {createCard} from "./components/card";
import {openModal, closeModal, closePopupOnOverlayClick} from "./components/modal";

const cardTemplate = document.querySelector('#card-template').content;

const content = document.querySelector('.content')
const places = content.querySelector('.places__list')
export const cardElement = cardTemplate.querySelector('.card')
const editButton = content.querySelector('.profile__edit-button');
const addCardButton = content.querySelector('.profile__add-button');
const profileTitle = content.querySelector('.profile__title');
const profileDescription = content.querySelector('.profile__description');

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
export const imagePopup = document.querySelector('.popup_type_image');
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

export const imageDetail = imagePopup.querySelector('.popup__image');
const closeImageButton = imagePopup.querySelector('.popup__close');
export const imageCaption = imagePopup.querySelector('.popup__caption');


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



function handleCardFormSubmit(evt) {
    evt.preventDefault();
    const cardName = evt.target[0].value;
    const imageURL = evt.target[1].value;
    places.prepend(createCard(cardName, imageURL, cardName));
    closeModal(cardPopup);
    console.log(places)
}

editButton.addEventListener('click', () => setProfilePopup());
addCardButton.addEventListener('click', () => setAddCardPopup());
closeProfileButton.addEventListener('click', () => closeModal(profilePopup));
closeCardButton.addEventListener('click', () => closeModal(cardPopup));
profileFormElement.addEventListener('submit', handleProfileFormSubmit);
cardFormElement.addEventListener('submit', handleCardFormSubmit);
closeImageButton.addEventListener('click', () => closeModal(imagePopup));

document.querySelectorAll('.popup').forEach((popup) => {
    popup.addEventListener('click', closePopupOnOverlayClick);
});

const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

enableValidation(validationSettings);
