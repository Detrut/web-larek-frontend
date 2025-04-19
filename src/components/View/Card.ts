import { ICard, IActions } from "../../types";
import { IEvents } from "../base/events";

export interface IRenderCard {
    render(data: ICard): HTMLElement;
}

export class Card implements IRenderCard {
    protected _card: HTMLElement;
    protected _image: HTMLImageElement;
    protected _title: HTMLElement;
    protected _category: HTMLElement;
    protected _price: HTMLElement;
    protected _colors = <Record<string, string>>{
        "дополнительное": "additional",
        "софт-скил": "soft",
        "кнопка": "button",
        "хард-скил": "hard",
        "другое": "other",
    }

    constructor(template: HTMLTemplateElement, protected events: IEvents, actions?: IActions) {
        this._card = template.content.querySelector('.card').cloneNode(true) as HTMLElement;
        this._category = this._card.querySelector('.card__category');
        this._title = this._card.querySelector('.card__title');
        this._image = this._card.querySelector('.card__image');
        this._price = this._card.querySelector('.card__price');

        if (actions?.onClick) {
          this._card.addEventListener('click', actions.onClick);
        }
    }

    set category(value: string) {
      this.setText(this._category, value);
      this._category.className = `card__category card__category_${this._colors[value]}`
    }
  
    protected setText(element: HTMLElement, value: unknown): string {
        if (element) {
          return element.textContent = String(value);
        }
      }
    
    protected setPrice(value: number | null): string {
      if (value === null) {
        return 'Не продается'
      }
      return String(value) + ' синапсов'
      }

    render(data: ICard): HTMLElement {
        this._category.textContent = data.category;
        this.category = data.category;
        this._title.textContent = data.title;
        this._image.src = data.image;
        this._image.alt = this._title.textContent;
        this._price.textContent = this.setPrice(data.price);
        return this._card;
    }
}