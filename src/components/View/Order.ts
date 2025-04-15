import { IEvents } from "../base/events";

export interface IOrder {
    orderForm: HTMLFormElement;
    payMethod: string;
    errors: HTMLElement;
    buttons: HTMLButtonElement[];
    render(): HTMLElement;
}

export class Order implements IOrder {
    orderForm: HTMLFormElement;
    submit: HTMLButtonElement;
    errors: HTMLElement;
    buttons: HTMLButtonElement[];

    constructor(template: HTMLTemplateElement, protected events: IEvents) {
        this.orderForm = template.content.querySelector('.form').cloneNode(true) as HTMLFormElement;
        this.buttons = Array.from(this.orderForm.querySelectorAll('.button_alt'));
        this.submit = this.orderForm.querySelector('.order__button');
        this.errors = this.orderForm.querySelector('.form__errors');
    
        this.buttons.forEach(item => {
          item.addEventListener('click', () => {
            this.payMethod = item.name;
            events.emit('order:payMethod', item);
          });
        });
    
        this.orderForm.addEventListener('input', (event: Event) => {
          const target = event.target as HTMLInputElement;
          const field = target.name;
          const value = target.value;
          this.events.emit(`order:addressChange`, { field, value });
        });
    
        this.orderForm.addEventListener('submit', (event: Event) => {
          event.preventDefault();
          this.events.emit('contacts:open');
        });
    }

    set payMethod(payMethod: string) {
        this.buttons.forEach(item => {
          item.classList.toggle('button_alt-active', item.name === payMethod);
        });
    }

    set valid(value: boolean) {
      this.submit.disabled = !value;
    }
    
    render() {
      return this.orderForm
    }
}