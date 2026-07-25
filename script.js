const pizzaContentRef = document.getElementById("pizza-content");
const burgerContentRef = document.getElementById("burger-content");
const saladContentRef = document.getElementById("salad-content");

// [x] Dishes rendern
// [x] Dishes nach Kategorien rendern und ausgeben lassen
// Dishes 1x in den Warenkorb hinzufügen (Add to basket)
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

	for (let index = 0; index < filterDishes.length; index++) {
		destination.innerHTML += /*html*/ `
			<article id="dish-${filterDishes[index].id}">
				${filterDishes[index].name} <br/>
				${filterDishes[index].description} <br/>
				${filterDishes[index].price} <br/>
			</article>
			`;
	}
}
