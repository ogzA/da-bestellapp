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
				<button id="menu-button-${dish.id}" class="add-to-basket ${dish.amount > 0 ? "added" : ""}" onclick="addItemToBasket(${dish.id})">
					${basketButtonLabel(dish)}
				</button>
			</div>
		</article>
	`;
}

function cartTemplate() {
  return /*html*/ `
		<button class="cart-close" onclick="closeCart()">&times;</button>
		<h2 class="basket-title">Your Basket</h2>
		<div id="basket" class="basket"></div>
		<div id="basket-empty" class="basket-empty">Nothing here yet.
Go ahead and choose something delicious!</div>
		<div id="basket-total-price" class="basket-total-price">
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

function confirmationTemplate() {
  return /*html*/ `
		<div class="confirmation-box">
			<button class="confirmation-close" onclick="hideConfirmation()">&times;</button>
			<img class="confirmation-icon" src="./assets/icons/delivery-confirmation.svg" alt="">
			<h3 class="confirmation-title">Order confirmed!</h3>
			<p class="confirmation-text">Your food is on the way!</p>
		</div>
	`;
}
