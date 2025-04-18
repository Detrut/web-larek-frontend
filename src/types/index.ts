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
    phone: string;
    email: string;
    payment: string;
}

export interface ICardsData {
    cards: ICard[];
    preview: ICard;
    setPreview(item: ICard): void;
}

export interface IBasketModel {
    items: ICard[];
    itemsList: string[];
    getQuantity(): number;
    remove(id: string): void;
    clearBasket(): void;
    getBasketPrice(): number;
    setSelectedCard(data: ICard): void;
}

export interface IUserForm extends IUser{
    setAddress(field: string, value: string): void
    validateAddress(): boolean;
    setOrderData(field: string, value: string): void
    validateContacts(): boolean;
    getOrder(): object;
}

export interface IOrderResponse {
    id: string;
    total: number;
}

export interface IActions {
    onClick: (event: MouseEvent) => void;
}

export type FormErrors = Partial<Record<keyof IUserForm, string>>;