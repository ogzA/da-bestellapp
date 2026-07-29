const pizzaContentRef = document.getElementById("pizza-content");
const burgerContentRef = document.getElementById("burger-content");
const saladContentRef = document.getElementById("salad-content");
const basket = document.getElementById("basket");

// [x] Dishes rendern
// [x] Dishes nach Kategorien rendern und ausgeben lassen
// [x]  Add to Basket Button erstellen und dessen Parent consoleloggen.
// [x] Dishes 1x in den Warenkorb hinzufügen (Add to basket)

// [x] Dishes amount erhöhen (Plus Icon)
// [x] Dishes amount verringen (Minus Icon)
// [x] Dishes löschen (Papierkorb Icon - icon wird noch hinzugefügt!)

function init() {
	filterByCategory("pizza", pizzaContentRef);
	filterByCategory("burger", burgerContentRef);
	filterByCategory("salad", saladContentRef);
}

const db = dishes;

function filterByCategory(category, destination) {
	const filterDishes = db.filter((item) => item.category === category);
	let filterDishesHTML = "";

	for (let index = 0; index < filterDishes.length; index++) {
		let addedToBasket =
			filterDishes[index].amount > 0
				? `Added ${filterDishes[index].amount}`
				: "Add to basket";
		filterDishesHTML += menuItemTemplate(
			filterDishes[index],
			addedToBasket,
		);
	}
	destination.innerHTML = filterDishesHTML;
}

function formatPrice(price) {
	return price.toLocaleString("de-DE", {
		style: "currency",
		currency: "EUR",
	});
}

function addItemToBasket(dishId) {
	const findItem = dishes.find((element) => element.id === dishId);
	findItem.amount++;

	renderBasket();
	init();
}

function removeItemFromBasket(dishId) {
	const findItem = dishes.find((element) => element.id === dishId);

	if (findItem.amount > 0) {
		findItem.amount--;
	}

	renderBasket();
	init();
}

function renderBasket() {
	basket.innerHTML = "";
	let totalPrice = 0;
	for (let i = 0; i < dishes.length; i++) {
		if (dishes[i].amount > 0) {
			let totalDishPrice = 0;
			totalDishPrice += dishes[i].price * dishes[i].amount;
			totalPrice += totalDishPrice;
			basket.innerHTML += cartItemTemplate(i);
		}
	}

	// Hier ist ein Bug, wenn es im Warenkorb nichts ist, steht im Warenkorb 0,00€
	if (totalPrice > 0) {
		basket.innerHTML += /*html*/ `
			<div style="background: white; padding: 32px; ">${formatPrice(totalPrice)}</div>
	`;
	}
}

function cartItemTemplate(cartItemTemplatePara) {
	return /*html*/ `
		<article id="basket-dish-${dishes[cartItemTemplatePara].id}">
			<div>${dishes[cartItemTemplatePara].name}</div>
			<div>${formatPrice(dishes[cartItemTemplatePara].price)}</div>
			<button style="font-size: 55px;" onclick="removeItemFromBasket(${dishes[cartItemTemplatePara].id})">-</button>
			<span>${dishes[cartItemTemplatePara].amount}</span>
			<button style="font-size: 55px;" onclick="addItemToBasket(${dishes[cartItemTemplatePara].id})">+</button>
			<button style="font-size: 55px;" onclick="deleteItem(${dishes[cartItemTemplatePara].id})">Löschen</button>
			
		</article>
	`;
}

function deleteItem(deleteItemPara) {
	const findItem = db.find((element) => element.id === deleteItemPara);

	findItem.amount = 0;

	renderBasket();
	init();
}

function menuItemTemplate(dish, addedToBasket) {
	return /*html*/ `
			<article id="dish-${dish.id}">
				<h3>${dish.name}</h3>
				${dish.description} <br/>
				${formatPrice(dish.price)} <br/>
				<button class="add-to-basket" onclick="addItemToBasket(${dish.id})">
					${addedToBasket}
				</button><br/>
			</article>
			`;
}
