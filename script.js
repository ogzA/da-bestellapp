const pizzaContentRef = document.getElementById("pizza-content");
const burgerContentRef = document.getElementById("burger-content");
const saladContentRef = document.getElementById("salad-content");
const basket = document.getElementById("basket");
const basketTotalPrice = document.getElementById("basket-total-price");

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

function render() {
  init();
  renderBasket();
  calculateItemTotalPrice();
}

const dishes = db;

function filterByCategory(category, destination) {
  const filterDishes = dishes.filter((item) => item.category === category);
  let filterDishesHTML = "";

  for (let index = 0; index < filterDishes.length; index++) {
    let addedToBasket =
      filterDishes[index].amount > 0
        ? `Added ${filterDishes[index].amount}`
        : "Add to basket";
    filterDishesHTML += menuItemTemplate(filterDishes[index], addedToBasket);
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

  render();
}

function removeItemFromBasket(dishId) {
  const findItem = dishes.find((element) => element.id === dishId);

  if (findItem.amount > 0) {
    findItem.amount--;
  }

  render();
}

function renderBasket() {
  let basketHTML = "";
  for (let i = 0; i < dishes.length; i++) {
    if (dishes[i].amount > 0) {
      basketHTML += cartItemTemplate(dishes[i]);
    }
  }
  basket.innerHTML = basketHTML;
}

function cartItemTemplate(dish) {
  return /*html*/ `
		<article id="basket-dish-${dish.id}">
			<div id="basket-dish-name-${dish.id}">${dish.name}</div>
			<div>${formatPrice(dish.price)}</div>
			<button style="font-size: 55px;" onclick="decreaseItemAmount(${dish.id})">-</button>
			<span id="basket-dish-amount-${dish.id}">${dish.amount}</span>
			<button style="font-size: 55px;" onclick="increaseItemAmount(${dish.id})">+</button>
			<button style="font-size: 55px;" onclick="deleteItem(${dish.id})">Löschen</button>
		</article>
	`;
}

function increaseItemAmount(dishId) {
  const findItem = dishes.find((element) => element.id === dishId);
  findItem.amount++;
  renderItemAmount(findItem);
}

function decreaseItemAmount(dishId) {
  const findItem = dishes.find((element) => element.id === dishId);

  if (findItem.amount > 0) {
    findItem.amount--;
  }

  if (findItem.amount == 0) {
  }

  renderItemAmount(findItem);
}

function renderItemAmount(dish) {
  const itemAmountRef = document.getElementById(
    `basket-dish-amount-${dish.id}`,
  );
  itemAmountRef.innerText = dish.amount;

  calculateItemTotalPrice();
}

function calculateItemTotalPrice() {
  let totalPrice = 0;

  for (let p = 0; p < dishes.length; p++) {
    if (dishes[p].amount > 0) {
      totalPrice += dishes[p].price * dishes[p].amount;
    }
  }

  if (totalPrice > 0) {
    basketTotalPrice.innerText = formatPrice(totalPrice);
  } else {
    basketTotalPrice.innerText = "Ihr Warenkorb ist leer.";
  }
}

function deleteItem(deleteItemPara) {
  const findItem = dishes.find((element) => element.id === deleteItemPara);

  findItem.amount = 0;

  render();
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
