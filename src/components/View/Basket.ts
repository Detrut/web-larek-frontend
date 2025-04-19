import { createElement } from "../../utils/utils";
import { IEvents } from "../base/events";


export interface IBasket {
  basket: HTMLElement;
  title: HTMLElement;
  basketList: HTMLElement;
  button: HTMLButtonElement;
  price: HTMLElement;
  basketButton: HTMLButtonElement;
  basketCounter: HTMLElement;
  
  renderQuantity(value: number): void;
  renderSum(sumAll: number): void;
  render(): HTMLElement;
}

export class Basket implements IBasket {
  basket: HTMLElement;
  title: HTMLElement;
  basketList: HTMLElement;
  button: HTMLButtonElement;
  price: HTMLElement;
  basketButton: HTMLButtonElement;
  basketCounter: HTMLElement;
  
  constructor(template: HTMLTemplateElement, protected events: IEvents) {
    this.basket = template.content.querySelector('.basket').cloneNode(true) as HTMLElement;
    this.title = this.basket.querySelector('.modal__title');
    this.title.textContent = 'Корзина';
    this.basketList = this.basket.querySelector('.basket__list');
    this.button = this.basket.querySelector('.basket__button');
    this.price = this.basket.querySelector('.basket__price');
    this.basketButton = document.querySelector('.header__basket');
    this.basketCounter = document.querySelector('.header__basket-counter');
    
    this.button.addEventListener('click', () => { this.events.emit('order:open')});
    this.basketButton.addEventListener('click', () => { this.events.emit('basket:open'), this.events.emit('basket:change') });

    this.items = [];
  }

  set items(items: HTMLElement[]) {
    if (items.length) {
      this.basketList.replaceChildren(...items);
      this.button.removeAttribute('disabled');
    } else {
      this.button.setAttribute('disabled', 'disabled');
      this.basketList.replaceChildren(createElement<HTMLParagraphElement>('p', { textContent: 'Корзина пуста' }));
    }
  }

  renderQuantity(value: number) {
    this.basketCounter.textContent = String(value);
  }
  
  renderSum(sum: number) {
    this.price.textContent = String(sum + ' синапсов');
  }

  render() {
    return this.basket;
  }
}