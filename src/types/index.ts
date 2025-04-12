export interface ICard {
    id: string;
    description: string;
    image: string;
    title: string;
    category: string;
    price: number;
}

export interface IUser {
    address: string;
    tel: string;
    mail: string;
    payMethod: string;
}

export interface ICardsData {
    cards: ICard[];
    preview: ICard;
    setPreview(item: ICard): void;
}

export interface IBasketModel {
    items: ICard[];
    getQuantity(): number;
    remove(id: string): void;
    clearBasket(): void;
    getBasketPrice(): number;
    setSelectedCard(data: ICard): void;
}

export interface IUserForm extends IUser{
    total: number;
    items: string[];
    setAddress(field: string, value: string): void
    validateAddress(): boolean;
    setOrderData(field: string, value: string): void
    validateContacts(): boolean;
    getOrder(): object;
}

export type FormErrors = Partial<Record<keyof IUserForm, string>>;