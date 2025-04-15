import { IEvents } from "../base/events";

export interface IOrderStatus {
    status: HTMLElement;
    description: HTMLElement;
    button: HTMLButtonElement;
    render(value: number): HTMLElement;
}

export class OrderStatus implements IOrderStatus {
    status: HTMLElement;
    description: HTMLElement;
    button: HTMLButtonElement;

    constructor(template: HTMLTemplateElement, protected events: IEvents) {
        this.status = template.content.querySelector('.order-success').cloneNode(true) as HTMLElement;
        this.description = this.status.querySelector('.order-success__description');
        this.button = this.status.querySelector('.order-success__close');
        this.button.addEventListener('click', () => {events.emit('orderStatus:close')});
    }

    render(value: number) {
        this.description.textContent = `Списано ${value} синапсов`;
        return this.status;
    }
}