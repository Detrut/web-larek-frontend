import { IEvents } from "../base/events";

export interface IPopup {
    open(): void;
    close(): void;
    render(): HTMLElement;
}

export class Popup implements IPopup {
    protected container: HTMLElement;
    protected button: HTMLButtonElement;
    protected _content: HTMLElement;
    protected _wrapper: HTMLElement;

    constructor(container: HTMLElement, protected events: IEvents) {
        this.container = container;
        this.button = container.querySelector('.modal__close');
        this._content = container.querySelector('.modal__content');
        this._wrapper = document.querySelector('.page__wrapper');
    
        this.button.addEventListener('click', this.close.bind(this));
        this.container.addEventListener('click', this.close.bind(this));
        this.container.querySelector('.modal__container').addEventListener('click', evt => evt.stopPropagation());
    }

    set content(valeu: HTMLElement) {
        this._content.replaceChildren(valeu);
    }

    set locked(value: boolean) {
        if (value) {
          this._wrapper.classList.add('page__wrapper_locked');
        } else {
          this._wrapper.classList.remove('page__wrapper_locked');
        }
      }

    open() {
        this.container.classList.add('modal_active');
        this.events.emit('modal:open');
    }
    
    close() {
        this.container.classList.remove('modal_active');
        this.content = null;
        this.events.emit('modal:close');
    }

    render(): HTMLElement {
        this._content;
        this.open();
        return this.container;
    }
}