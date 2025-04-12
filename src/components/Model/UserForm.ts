import { IEvents } from "../base/events";
import { IUserForm, FormErrors } from "../../types";

export class UserForm implements IUserForm {
    address: string;
    tel: string;
    payMethod: string;
    mail: string;
    total: number;
    items: string[];
    formErrors: FormErrors = {};

    constructor(protected events:IEvents) {
        this.address = '';
        this.tel = '';
        this.mail = '';
        this.payMethod = '';
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
        } else if (!this.payMethod) {
            errors.payMethod = 'Выберите способ оплаты'
        }

        this.formErrors = errors;
        this.events.emit('formErrors:address', this.formErrors);
        return Object.keys(errors).length === 0;
        }

        setOrderData(field: string, value: string) {
        if (field === 'email') {
            this.mail = value;
        } else if (field === 'phone') {
            this.tel = value;
        }

        if (this.validateContacts()) {
            this.events.emit('order:ready', this.getOrder());
        }
    }

    validateContacts() {
        const regexpMail = /^\S+@\S+\.\S+$/;
        const regexpTel = /(?:\+|\d)[\d\-\(\) ]{9,}\d/g;
        const errors: typeof this.formErrors = {};

        if (!this.mail) {
            errors.mail = 'Укажите email'
        } else if (!regexpMail.test(this.mail)) {
            errors.mail = 'Ошибка в адресе электронной почты'
        }

        if (!this.tel) {
            errors.tel = 'Укажите номер телефона'
        } else if (!regexpTel.test(this.tel)) {
            errors.tel = 'Ошибка в номере телефона'
        }

        this.formErrors = errors;
        this.events.emit('formErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }

    getOrder() {
        return {
            payMethod: this.payMethod,
            mail: this.mail,
            tel: this.tel,
            address: this.address,
            total: this.total,
            items: this.items,
        }
    }
}