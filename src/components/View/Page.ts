import { ensureElement } from "../../utils/utils";


interface IPage {
    catalog(item: HTMLElement): void;
}

export class Page implements IPage {
    protected _catalog: HTMLElement;


    constructor() {
        this._catalog = ensureElement<HTMLElement>('.gallery');
    }

    catalog(item: HTMLElement) {
        this._catalog.append(item);
    }
}