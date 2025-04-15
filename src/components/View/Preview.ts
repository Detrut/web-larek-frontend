import { Card } from "./Card";
import { ICard } from "../../types";
import { IEvents } from "../base/events";

export interface IRenderCard {
    text: HTMLElement;
    button: HTMLElement;
    render(data: ICard): HTMLElement;
}

export class Preview extends Card implements IRenderCard {
    text: HTMLElement;
    button: HTMLElement;

    constructor(template: HTMLTemplateElement, protected events: IEvents) {
        super(template, events);
        this.text = this._card.querySelector('.card__text');
        this.button = this._card.querySelector('.card__button');
        this.button.addEventListener('click', () => { this.events.emit('card:add') });
    }

    render(data: ICard): HTMLElement {
        this._category.textContent = data.category;
        this.category = data.category;
        this._title.textContent = data.title;
        this._image.src = data.image;
        this._image.alt = this._title.textContent;
        this._price.textContent = this.setPrice(data.price);
        this.text.textContent = data.description;
        return this._card;
      }
}