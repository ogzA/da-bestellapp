const pizzaContentRef = document.getElementById("pizza-content");
const burgerContentRef = document.getElementById("burger-content");
const saladContentRef = document.getElementById("salad-content");
const cart = document.getElementById("cart");
const deliveryFee = 4.99;

function init() {
  filterByCategory("pizza", pizzaContentRef);
  filterByCategory("burger", burgerContentRef);
  filterByCategory("salad", saladContentRef);
}

function render() {
  init();
  renderCart();
  document
    .getElementById("confirmation")
    .addEventListener("close", hideConfirmation);
}

const dishes = db;

function renderCart() {
  cart.innerHTML = cartTemplate();
  renderBasket();
  calculateItemTotalPrice();
}

function cartTemplate() {
  return /*html*/ `
		<button class="cart-close" onclick="closeCart()">&times;</button>
		<h2 class="basket-title">Your Basket</h2>
		<div id="basket"></div>
		<div id="basket-empty" class="basket-empty">Ihr Warenkorb ist leer.</div>
		<div id="basket-total-price">
			<div class="summary-row">
				<span>Subtotal</span>
				<span id="summary-subtotal"></span>
			</div>
			<div class="summary-row">
				<span>Delivery fee</span>
				<span>${formatPrice(deliveryFee)}</span>
			</div>
			<div class="summary-row summary-total">
				<span>Total</span>
				<span id="summary-total"></span>
			</div>
			<button id="buy-now" class="buy-now" onclick="buyNow()"></button>
		</div>
	`;
}

function filterByCategory(category, destination) {
  const filterDishes = dishes.filter((item) => item.category === category);
  let filterDishesHTML = "";

  for (let index = 0; index < filterDishes.length; index++) {
    filterDishesHTML += menuItemTemplate(filterDishes[index]);
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

  updateBasketItem(findItem);
}

function renderBasket() {
  const basket = document.getElementById("basket");
  let basketHTML = "";
  for (let i = 0; i < dishes.length; i++) {
    if (dishes[i].amount > 0) {
      basketHTML += cartItemTemplate(dishes[i]);
    }
  }
  basket.innerHTML = basketHTML;
}

function updateBasketItem(dish) {
  const dishRef = document.getElementById(`basket-dish-${dish.id}`);

  if (dish.amount === 0) {
    if (dishRef) dishRef.remove();
  } else if (!dishRef) {
    document
      .getElementById("basket")
      .insertAdjacentHTML("beforeend", cartItemTemplate(dish));
  } else {
    renderItemAmount(dish);
  }
  calculateItemTotalPrice();
  renderMenuButton(dish);
}

function cartItemTemplate(dish) {
  return /*html*/ `
		<article id="basket-dish-${dish.id}" class="basket-item">
			<button class="basket-delete" onclick="deleteItem(${dish.id})">
				<img class="delete-icon" src="./assets/icons/delete.svg" alt="Delete">
			</button>
			<div id="basket-dish-name-${dish.id}" class="basket-item-name">${dish.amount} x ${dish.name}</div>
			<div class="basket-item-row">
				<div class="amount-control">
					<button class="amount-btn" onclick="decreaseItemAmount(${dish.id})">&minus;</button>
					<span id="basket-dish-amount-${dish.id}" class="amount-value">${dish.amount}</span>
					<button class="amount-btn" onclick="increaseItemAmount(${dish.id})">+</button>
				</div>
				<div id="basket-dish-price-${dish.id}" class="basket-item-price">${formatPrice(dish.price * dish.amount)}</div>
			</div>
		</article>
	`;
}

function increaseItemAmount(dishId) {
  const findItem = dishes.find((element) => element.id === dishId);
  findItem.amount++;
  updateBasketItem(findItem);
}

function decreaseItemAmount(dishId) {
  const findItem = dishes.find((element) => element.id === dishId);

  if (findItem.amount > 0) {
    findItem.amount--;
  }

  updateBasketItem(findItem);
}

function renderItemAmount(dish) {
  document.getElementById(`basket-dish-name-${dish.id}`).innerText =
    `${dish.amount} x ${dish.name}`;
  document.getElementById(`basket-dish-amount-${dish.id}`).innerText =
    dish.amount;
  document.getElementById(`basket-dish-price-${dish.id}`).innerText =
    formatPrice(dish.price * dish.amount);
}

function calculateItemTotalPrice() {
  let totalPrice = 0;
  let totalAmount = 0;

  for (let p = 0; p < dishes.length; p++) {
    if (dishes[p].amount > 0) {
      totalPrice += dishes[p].price * dishes[p].amount;
      totalAmount += dishes[p].amount;
    }
  }

  renderSummary(totalPrice);
  renderBasketBadge(totalAmount);
}

function renderSummary(subtotal) {
  const isEmpty = subtotal === 0;
  document
    .getElementById("basket-total-price")
    .classList.toggle("d-none", isEmpty);
  document.getElementById("basket-empty").classList.toggle("d-none", !isEmpty);

  const total = subtotal + deliveryFee;
  document.getElementById("summary-subtotal").innerText = formatPrice(subtotal);
  document.getElementById("summary-total").innerText = formatPrice(total);
  document.getElementById("buy-now").innerText =
    `Buy now (${formatPrice(total)})`;
}

function renderBasketBadge(totalAmount) {
  const badgeRef = document.getElementById("basket-badge");

  badgeRef.innerText = totalAmount;
  badgeRef.classList.toggle("d-none", totalAmount === 0);
}

function openCart() {
  document.getElementById("basket-container").classList.add("cart-open");
  document.body.classList.add("no-scroll");
}

function closeCart() {
  document.getElementById("basket-container").classList.remove("cart-open");
  document.body.classList.remove("no-scroll");
}

function deleteItem(dishId) {
  const findItem = dishes.find((element) => element.id === dishId);

  findItem.amount = 0;

  updateBasketItem(findItem);
}

function basketButtonLabel(dish) {
  return dish.amount > 0 ? `Added ${dish.amount}` : "Add to basket";
}

function renderMenuButton(dish) {
  const menuButtonRef = document.getElementById(`menu-button-${dish.id}`);

  menuButtonRef.innerText = basketButtonLabel(dish);
}

function menuItemTemplate(dish) {
  return /*html*/ `
		<article id="dish-${dish.id}" class="dish">
			<img class="dish-img" src="${dish.imageUrl}" alt="">
			<div class="dish-content">
				<div class="dish-header">
					<h3 class="dish-name">${dish.name}</h3>
					<div class="dish-price">${formatPrice(dish.price)}</div>
				</div>
				<p class="dish-description">${dish.description}</p>
				<button id="menu-button-${dish.id}" class="add-to-basket" onclick="addItemToBasket(${dish.id})">
					${basketButtonLabel(dish)}
				</button>
			</div>
		</article>
	`;
}
