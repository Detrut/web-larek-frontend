import {IBasketModel, ICard} from '../../types';

export class BasketModel implements IBasketModel {
    protected _items: ICard[]; //Список карточек в корзине

    constructor() {
        this._items = [];
    }

    set items(data: ICard[]) {
        this._items = data;
    }

    get items() {
        return this._items;
    }

    getQuantity(): number {
        return this.items.length;
    }

    remove(id: string) {
        this._items = this._items.filter(item => item.id !== id);
    }

    clearBasket(): void {
        this.items = [];
    }

    getBasketPrice(): number {
        let sumAll = 0;
        this.items.forEach(element => {
            sumAll = sumAll + element.price;
        });
        return sumAll;
    }

    setSelectedCard(data: ICard) {
        this._items.push(data);
    }
}