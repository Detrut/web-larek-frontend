import { IEvents } from "../base/events";

export interface IContactsForm {
    contactsForm: HTMLFormElement;
    inputAll: HTMLInputElement[];
    button: HTMLButtonElement;
    error:HTMLElement;
    render(): HTMLElement;
}

export class ContactsForm implements IContactsForm {
    contactsForm: HTMLFormElement;
    inputAll: HTMLInputElement[];
    button: HTMLButtonElement;
    error:HTMLElement;

    constructor(template: HTMLTemplateElement, protected events: IEvents) {
        this.contactsForm = template.content.querySelector('.form').cloneNode(true) as HTMLFormElement;
        this.inputAll = Array.from(this.contactsForm.querySelectorAll('.form__input'));
        this.button = this.contactsForm.querySelector('.button');
        this.error = this.contactsForm.querySelector('.form__errors');
        this.inputAll.forEach(item => {
            item.addEventListener('input', (event) => {
                const target = event.target as HTMLInputElement;
                const field = target.name;
                const value = target.value;
                this.events.emit(`contacts:changeInput`, { field, value });
            })
        })

        this.contactsForm.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            this.events.emit('orderStatus:open');
        });
    }

    set valid(value: boolean) {
        this.button.disabled = !value;
      }
    
    render() {
        return this.contactsForm
    }
}