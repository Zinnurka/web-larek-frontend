export class Card {
	itemElement: HTMLElement
	protected title: HTMLElement

	constructor(template: HTMLTemplateElement) {
		this.itemElement = template.content.querySelector('.gallery__item').cloneNode(true) as HTMLElement
		this.title = this.itemElement.querySelector('.card__title')
	}

	render(item:any){
		this.title.textContent = item.title
		return this.itemElement
	}
}