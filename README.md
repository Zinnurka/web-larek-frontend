https://github.com/Zinnurka/web-larek-frontend
# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Класс productAPI
Создает экземпляр класса Api с заданными параметрами: URL-адрес cdn хоста, базовый URL и параметры запроса. Экземпляр наследует методы родительского класса Api для работы с веб-API по продуктам и заказам.
### getProducts 
Осуществляет запрос для извлечения перечня продуктов и 
манипулирует полученными данными, добавляя к каждому пункту ссылку на картинку.
### getProduct
Осуществляет запрос для получения сведений о конкретном 
продукте по его идентификатору и манипулирует полученными данными, добавляя ссылку на картинку.
### order 
Осуществляет запрос на создание заказа и возвращает результат 
создания.

## Класс Component

Базовый класс Component предназначен для управления функциональностью компонента.
Это абстрактный класс, который предоставляет набор методов для работы с HTML элементами. Он имеет конструктор, который принимает элемент контейнера HTMLElement в качестве параметра.
### toggleClass 
Функция, которая переключает CSS класс у заданного элемента.
### setText
Функция для установки текста внутри элемента.
### setDisabled
Функция, позволяющая включать или отключать функциональность элемента.
### setImage
Функция для изменения изображения и альтернативного текста.
Основная функция, возвращающая корневой HTML элемент для компонента. Может принимать необязательный параметр данных для обновления характеристик компонента.

## Класс View
Класс наследуется от компонента и добавляет поле событий IEvents, используемое для управления событиями компонента. Конструктор получает два параметра: контейнер и события.

## Basket
Представляет компонент корзины, который отображает список товаров, общую сумму и управляет состоянием кнопки оформления заказа. Конструктор класса принимает объект событий EventEmitter для управления событиями и вызывает конструктор родительского класса View с клонированным шаблоном корзины HTML.
### template  
Содержит HTML-шаблон корзины.
### list
Используемых для хранения ссылок на различные элементы корзины. 
### total
Приватное поле для хранения ссылки на элемент корзины
### button
Поле для хранения ссылки на элемент корзины. Приватное.
### items
Устанавливает список товаров в корзине, обновляя содержимое 
контейнера корзины и состояние кнопки оформления заказа в зависимости от того, пуст этот список или нет. 
### selected 
Используется для определения, выбраны ли товары, и активирует 
или деактивирует кнопку оформления заказа соответственно. 
### total 
обновляет общую сумму товаров в корзине.

## Form
Представляет компонент формы, который управляет состоянием проверки и отображает ошибки. Конструктор класса получает элемент контейнера формы HTMLFormElement и объект событий EventEmitter. Конструктор вызывает конструктор родительского класса с переданными элементами и объектом событий.

### onInputChange 
Функция, которая вызывает событие “change” с информацией о 
измененном поле формы и его значении
### valid
Алгоритм для определения статуса валидации формы
### errors
Функция отображения ошибок
### render
Функция, получающая объект состояния (state), содержащий 
частичное состояние формы, и обновляющая состояние компонента

## Modal
Представляет компонент модального окна, который позволяет его открывать, закрывать и управлять его содержимым. Конструктор класса получает контейнер модального окна типа HTMLElement и объект событий типа IEvents. Конструктор вызывает конструктор родительского класса со всеми переданными ему параметрами.
### content 
Заменяет текущую информацию в всплывающем окне на новую.
### open 
Данный метод активирует всплывающее окно, применяя к нему класс modal_active и инициируя событие ‘modal:open’. 
### close 
Этот метод убирает всплывающее окно, убирая класс modal_active, 
обнуляет содержимое всплывающего окна и инициирует событие ‘modal:close’.

## Page
Представляет компонент веб-страницы с некоторыми элементами и функциями для управления ими. Конструктор получает элемент страницы типа HTMLElement и объект событий IEvents. Затем он вызывает конструктор родительского класса с полученными элементами и объектами событий.
### counter 
Счетчик.
### catalog 
Содержимого каталога.
### locked 
Состояние блокировки страницы.

## Card
Представляет компонент товарной карточки с возможностью отображения информации о товаре и выполнения действий при нажатии на кнопку или карточку. Конструктор принимает элемент карточки типа HTMLElement. Конструктор вызывает конструктор родительского класса с переданным элементом.
### id
Идентификатор карточки
### title
Заголовок карточки
### image 
Изображение карточки
### description
Описание карточки
### price
Возвращает цену карточки, а также блокирует кнопку, если цена не указана
###  button
Надпись на кнопке карточки
### category 
Устанавливает и возвращает атрибут карточки, а также создает соответствующий стиль с помощью класса.
### 

## Order
Представляет форму заказа, которая позволяет выбрать способ оплаты. Конструктор принимает элемент формы заказа типа HTMLFormElement и объекты событий типа EventEmitter. Затем конструктор вызывает конструктор родительского класса с этими параметрами.

### address
Определяет местоположение для отправки товара.
### payment
Выбирает предустановленную форму оплаты и включает связанную с ней кнопку.

## Contacts
Представляет форму для ввода контактных данных (электронной почты и номера телефона) во время оформления заказа. Конструктор принимает контейнер контактной формы типа HTMLFormElement и объект события типа EventEmitter. Он вызывает конструктор родительского класса с указанными параметрами.
### email 
Прописывает значение электронного адреса в соответствующем поле формы.
### phone 
Прописывает значение номера телефона в соответствующем поле формы.

## Success
Представляет компонент для показа сообщения об успешном выполнении заказа. Конструктор получает контейнер типа HTMLFormElement и дополнительные действия типа ISuccessActions. Затем вызывает конструктор родительского класса, передавая ему контейнер.
## AppData
Класс представляет собой хранилище данных приложения, которое содержит информацию о товарах, корзине, просмотре товара, заказе и ошибках в форме заказа. Он также предоставляет методы для работы с этими данными через события и принимает объект событий в конструкторе.
### setItems
Обновляет данные о продуктах и создает уведомление об изменении списка продуктов.
### setPreview
Включает режим предварительного просмотра товара и создает событие уведомления об изменении.
### inBasket
Проверяет, содержится ли товар в корзине.
### addToBasket
Добавляет товар в корзину, создавая событие об изменении содержимого корзины.
### removeFromBasket
Удаляет товар из корзины и генерирует событие изменения корзины.
### clearBasket
Очищает корзину и генерирует событие изменения корзины.
### setPaymentMethod
Устанавливает метод оплаты для заказа.
### setOrderField
Заполняет поля формы заказа и проверяет правильность введенных данных.
### validateOrder
Проверяет корректность оформления заказа и создает событие, отражающее наличие или отсутствие ошибок в форме оформления заказа

## Как работает MVP в данной работе
Приложение изменяет свое поведение, переходя в класс Card, когда 
пользователь нажимает на карточку товара в галерее. Это вызывает метод emit (класс EventEmitter, Presenter), который в ответ вызывает обработчик ‘card:select’, передавая данные товара. Обработав данные, обработчик вызывает setPreview модели (класс AppData, Model), что опять приводит к emit, открывающего модальное окно товара (событие preview:change) с передачей данных товара. Наконец, в последнем обработчике preview:change приложение переключается на класс Modal, который отображает модальное окно с данными товара.