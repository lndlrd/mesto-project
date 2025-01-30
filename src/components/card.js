import {openModal} from "./modal";
import {cardElement} from "../index";
import {imageDetail} from "../index";
import {imageCaption} from "../index";
import {imagePopup} from "../index";

export function createCard(name, link, alt) {
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