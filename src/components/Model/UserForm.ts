import { IEvents } from "../base/events";
import { IUserForm, FormErrors } from "../../types";

export class UserForm implements IUserForm {
    address: string;
    phone: string;
    payment: string;
    email: string;
    total: number;
    items: string[];
    formErrors: FormErrors = {};

    constructor(protected events:IEvents) {
        this.address = '';
        this.phone = '';
        this.email = '';
        this.payment = '';
        this.total = 0;
        this.items = [];
    }

    setAddress(field: string, value: string) {
        if (field === 'address') {
          this.address = value;
        }
    
        if (this.validateAddress()) {
          this.events.emit('order:ready', this.getOrder());
        }
    }
    
    validateAddress() {
        const errors: typeof this.formErrors = {};

        if (!this.address) {
            errors.address = 'Укажите адрес доставки'
        } else if (!this.payment) {
            errors.payment = 'Выберите способ оплаты'
        }

        this.formErrors = errors;
        this.events.emit('error:address', this.formErrors);
        return Object.keys(errors).length === 0;
    }
    
    setOrderData(field: string, value: string) {
        if (field === 'email') {
            this.email = value;
        } else if (field === 'phone') {
            this.phone = value;
        }

        if (this.validateContacts()) {
            this.events.emit('order:ready', this.getOrder());
        }
    }
    
    validateContacts() {
        const regexpMail = /^\S+@\S+\.\S+$/;
        const regexpTel = /(?:\+|\d)[\d\-\(\) ]{9,}\d/g;
        const errors: typeof this.formErrors = {};

        if (!this.email) {
            errors.email = 'Укажите email'
        } else if (!regexpMail.test(this.email)) {
            errors.email = 'Ошибка в адресе электронной почты'
        }

        if (!this.phone) {
            errors.phone = 'Укажите номер телефона'
        } else if (!regexpTel.test(this.phone)) {
            errors.phone = 'Ошибка в номере телефона'
        }

        this.formErrors = errors;
        this.events.emit('error:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }

    getOrder() {
        return {
            payment: this.payment,
            email: this.email,
            phone: this.phone,
            address: this.address,
            total: this.total,
            items: this.items,
        }
    }
}