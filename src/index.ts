import './scss/styles.scss';

// Подключение утилит
import { CDN_URL, API_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import { IUserForm, ICard } from './types';
// import { ensureElement } from './utils/utils';

// Подключения модели данных
import { ApiModel } from './components/Model/ApiModel';
import { BasketModel } from './components/Model/BasketModel';
import { CardData } from './components/Model/CardsData';
import { UserForm } from './components/Model/UserForm';

// Подключение классов отображения
import { Basket } from './components/View/Basket';
import { Card } from './components/View/Card';
import { ContactsForm } from './components/View/ContactsForm';
import { Items } from './components/View/Items';
import { Order } from './components/View/Order';
import { OrderStatus } from './components/View/OrderStatus';
import { Preview } from './components/View/Preview';
import { Popup } from './components/View/Popup';

// Занесение в константы всех темплейтов
const templateCatalog = document.querySelector('#card-catalog') as HTMLTemplateElement;
const templatePreview = document.querySelector('#card-preview') as HTMLTemplateElement;
const templateBasket = document.querySelector('#basket') as HTMLTemplateElement;
const templateCard = document.querySelector('#card-basket') as HTMLTemplateElement;
const templateContacts = document.querySelector('#contacts') as HTMLTemplateElement;
const templateOrder = document.querySelector('#order') as HTMLTemplateElement;
const templateOrderStatus = document.querySelector('#success') as HTMLTemplateElement;

// Содержимое попапа
const popupContainer = document.querySelector('#modal-container') as HTMLElement;

// Создание классов
const events = new EventEmitter();

const apiModel = new ApiModel(CDN_URL, API_URL);
const cardData = new CardData(events);
const basketModel = new BasketModel();
const userForm = new UserForm(events);

const popup = new Popup(popupContainer, events);
const basket = new Basket(templateBasket, events);
const order = new Order(templateOrder, events);
const contactsForm = new ContactsForm(templateContacts, events);

// Отобразить карточки
apiModel.getListProductCard() // Загрузить карточки
  .then(function (data: ICard[]) {
    cardData.cards = data;
  })
  .catch(error => console.log(error))

events.on('cards:receive', () => { // Отобразить карточки
    cardData.cards.forEach(el => {
        const card = new Card(templateCatalog, events, {onClick: () => events.emit('card:select', el)});
        document.querySelector('.gallery').append(card.render(el));
    });
});

// Открытие попапов
events.on('card:select', (item: ICard) => { // Открыть превью карточки
    cardData.setPreview(item);
});

events.on('preview:open', (item: ICard) => { // Попап с превью
    const cardPreview = new Preview(templatePreview, events);
    popup.content = cardPreview.render(item);
    popup.render();
});

events.on('basket:open', () => { // Открыть корзину
    basket.renderSum(basketModel.getBasketPrice());
    let i = 0;
    basket.items = basketModel.items.map((item) => {
      const items = new Items(templateCard, events, { onClick: () => events.emit('basket:removeCard', item) });
      i = i + 1;
      return items.render(item, i);
    });
    popup.content = basket.render();
    popup.render();
});

events.on('order:open', () => { // Открыть попап с заказом
    popup.content = order.render();
    popup.render();
    userForm.items = basketModel.items.map(item => item.id);
});

events.on('contacts:open', () => { // Открыть попап с контактными данными
    userForm.total = basketModel.getBasketPrice();
    popup.content = contactsForm.render();
    popup.render();
});

events.on('orderStatus:open', () => { // Статус заказа
    apiModel.postOrderLot(userForm.getOrder())
      .then(() => {
        const orderStatus = new OrderStatus(templateOrderStatus, events);
        popup.content = orderStatus.render(basketModel.getBasketPrice());
        basketModel.clearBasket();
        basket.renderQuantity(basketModel.getQuantity());
        popup.render();
      })
      .catch(error => console.log(error));
});

// Закрытие попапов
events.on('orderStatus:close', () => popup.close()); // Закрытие окна со статусом заказа

// Манипуляции с карточками
events.on('card:add', () => { // Добавить карточку в корзину
    basketModel.setSelectedCard(cardData.preview);
    basket.renderQuantity(basketModel.getQuantity());
    popup.close();
});

events.on('basket:removeCard', (item: ICard) => { // Удалить карточку из корзины
    basketModel.remove(item.id);
    basket.renderQuantity(basketModel.getQuantity());
    basket.renderSum(basketModel.getBasketPrice());
    let i = 0;
    basket.items = basketModel.items.map((item) => {
      const basketItem = new Items(templateCard, events, { onClick: () => events.emit('basket:removeCard', item) });
      i = i + 1;
      return basketItem.render(item, i);
    })
});

// Поля с информацией и способом оплаты
events.on('order:payMethod', (button: HTMLButtonElement) => { // Выбор способа оплаты
    userForm.payment = button.name;
});

events.on(`order:addressChange`, (data: { field: string, value: string }) => { // Заполнение поля "адрес"
    userForm.setAddress(data.field, data.value);
});

events.on(`contacts:changeInput`, (data: { field: string, value: string }) => { // Заполнение полей контактной информации
    userForm.setOrderData(data.field, data.value);
});

// Валидация полей
events.on('error:address', (errors: Partial<IUserForm>) => { // Валидация ошибок оплаты или адреса
    const { address, payment } = errors;
    order.valid = !address && !payment;
    order.errors.textContent = Object.values({address, payment}).filter(i => !!i).join('; ');
});

events.on('error:change', (errors: Partial<IUserForm>) => { // Валидация контактных данных
    const { email, phone } = errors;
    contactsForm.valid = !email && !phone;
    contactsForm.error.textContent = Object.values({phone, email}).filter(i => !!i).join('; ');
});
