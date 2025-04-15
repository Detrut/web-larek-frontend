import { IEvents } from "../base/events";
import { ICard, ICardsData } from "../../types";

export class CardData implements ICardsData {
    protected _cards: ICard[];
    preview: ICard;

    constructor(protected events: IEvents) {
        this._cards = []
    }

    set cards(data: ICard[]) {
        this._cards = data;
        this.events.emit('cards:receive');
    }

    get cards() {
        return this._cards;
        
    }

    setPreview(item: ICard): void {
        this.preview = item;
        this.events.emit('preview:open', item)
    }
}