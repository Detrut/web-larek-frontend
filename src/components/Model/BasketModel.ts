import {IBasketModel, ICard} from '../../types';
import { IEvents } from '../base/events';

export class BasketModel implements IBasketModel {
    protected _items: ICard[]; //Список карточек в корзине
    total: number;
    itemsList: string[];

    constructor(protected events: IEvents) {
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
        this.events.emit('basket:change');
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

    removeDublicate():void {
        this._items = this._items.filter((value, index, array) => 
            !array.filter((v, i) => JSON.stringify(value) == JSON.stringify(v) && i < index).length);
    }

    getOrderInfo() {
        return {
            total: this.total,
            items: this.itemsList,
        }
    }
}