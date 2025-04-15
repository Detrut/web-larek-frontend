import { ApiListResponse, Api } from '../base/api'
import { IUserForm, IOrderResponse, ICard } from '../../types';

export interface IApiModel {
  cdn: string;
  items: ICard[];
  getListProductCard: () => Promise<ICard[]>;
  postOrderLot: (order: IUserForm) => Promise<IOrderResponse>;
}

export class ApiModel extends Api {
  cdn: string;
  items: ICard[];

  constructor(cdn: string, baseUrl: string, options?: RequestInit) {
    super(baseUrl, options);
    this.cdn = cdn;
  }

  // получаем массив объектов(карточек) с сервера
  getListProductCard(): Promise<ICard[]> {
    return this.get('/product').then((data: ApiListResponse<ICard>) =>
      data.items.map((item) => ({
        ...item,
        image: this.cdn + item.image,
      }))
    );
  }

  // получаем ответ от сервера по сделанному заказу
  postOrderLot(order: any): Promise<IOrderResponse> {
    return this.post(`/order`, order).then((data: IOrderResponse) => data);
  }
}