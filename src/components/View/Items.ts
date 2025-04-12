import { ICard } from "../../types";
import { IEvents } from "../base/events";

export interface IBasketItem {
    item: HTMLElement;
	index:HTMLElement;
	title: HTMLElement;
	price: HTMLElement;
	deleteButton: HTMLButtonElement;
	render(data: ICard, item: number): HTMLElement;
}

export class BasketItem implements IBasketItem {
    item: HTMLElement;
	index:HTMLElement;
	title: HTMLElement;
	price: HTMLElement;
	deleteButton: HTMLButtonElement;

  	constructor (template: HTMLTemplateElement, protected events: IEvents) {
    	this.item = template.content.querySelector('.basket__item').cloneNode(true) as HTMLElement;
		this.index = this.item.querySelector('.basket__item-index');
		this.title = this.item.querySelector('.card__title');
		this.price = this.item.querySelector('.card__price');
		this.deleteButton = this.item.querySelector('.basket__item-delete');
	}

	protected setPrice(value: number) {
        return String(value) + ' синапсов'
  	}

	render(data: ICard, item: number) {
		this.index.textContent = String(item);
		this.title.textContent = data.title;
		this.price.textContent = this.setPrice(data.price);
		return this.item;
	}
}