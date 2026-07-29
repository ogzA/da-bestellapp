const pizzaContentRef = document.getElementById("pizza-content");
const burgerContentRef = document.getElementById("burger-content");
const saladContentRef = document.getElementById("salad-content");
const basket = document.getElementById("basket");

// [x] Dishes rendern
// [x] Dishes nach Kategorien rendern und ausgeben lassen
// [x]  Add to Basket Button erstellen und dessen Parent consoleloggen.
// [] Dishes 1x in den Warenkorb hinzufügen (Add to basket)

// Dishes amount erhöhen (Plus Icon)
// eventuell amount * price?
// Dishes amount verringen (Minus Icon)
// Dishes löschen (Papierkorb Icon)
// LocalStorage?

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
