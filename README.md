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

## Класс Component

Базовый класс Component предназначен для управления функциональностью компонента.
Это абстрактный класс, который предоставляет набор методов для работы с HTML элементами. Он имеет конструктор, который принимает элемент контейнера HTMLElement в качестве параметра.

## Класс View
Класс наследуется от компонента и добавляет поле событий IEvents, используемое для управления событиями компонента. Конструктор получает два параметра: контейнер и события.
## Basket
Представляет компонент корзины, который отображает список товаров, общую сумму и управляет состоянием кнопки оформления заказа. Конструктор класса принимает объект событий EventEmitter для управления событиями и вызывает конструктор родительского класса View с клонированным шаблоном корзины HTML.
## Form
Представляет компонент формы, который управляет состоянием проверки и отображает ошибки. Конструктор класса получает элемент контейнера формы HTMLFormElement и объект событий EventEmitter. Конструктор вызывает конструктор родительского класса с переданными элементами и объектом событий.
## Modal
Представляет компонент модального окна, который позволяет его открывать, закрывать и управлять его содержимым. Конструктор класса получает контейнер модального окна типа HTMLElement и объект событий типа IEvents. Конструктор вызывает конструктор родительского класса со всеми переданными ему параметрами.
## Page
Представляет компонент веб-страницы с некоторыми элементами и функциями для управления ими. Конструктор получает элемент страницы типа HTMLElement и объект событий IEvents. Затем он вызывает конструктор родительского класса с полученными элементами и объектами событий.
## Card
Представляет компонент товарной карточки с возможностью отображения информации о товаре и выполнения действий при нажатии на кнопку или карточку. Конструктор принимает элемент карточки типа HTMLElement. Конструктор вызывает конструктор родительского класса с переданным элементом.
## Order
Представляет форму заказа, которая позволяет выбрать способ оплаты. Конструктор принимает элемент формы заказа типа HTMLFormElement и объекты событий типа EventEmitter. Затем конструктор вызывает конструктор родительского класса с этими параметрами.
## Contacts
Представляет форму для ввода контактных данных (электронной почты и номера телефона) во время оформления заказа. Конструктор принимает контейнер контактной формы типа HTMLFormElement и объект события типа EventEmitter. Он вызывает конструктор родительского класса с указанными параметрами.
## Success
Представляет компонент для показа сообщения об успешном выполнении заказа. Конструктор получает контейнер типа HTMLFormElement и дополнительные действия типа ISuccessActions. Затем вызывает конструктор родительского класса, передавая ему контейнер.
## AppData
Класс представляет собой хранилище данных приложения, которое содержит информацию о товарах, корзине, просмотре товара, заказе и ошибках в форме заказа. Он также предоставляет методы для работы с этими данными через события и принимает объект событий в конструкторе.

## Как работает MVP в данной работе
Приложение изменяет свое поведение, переходя в класс Card, когда 
пользователь нажимает на карточку товара в галерее. Это вызывает метод emit (класс EventEmitter, Presenter), который в ответ вызывает обработчик ‘card:select’, передавая данные товара. Обработав данные, обработчик вызывает setPreview модели (класс AppData, Model), что опять приводит к emit, открывающего модальное окно товара (событие preview:change) с передачей данных товара. Наконец, в последнем обработчике preview:change приложение переключается на класс Modal, который отображает модальное окно с данными товара.