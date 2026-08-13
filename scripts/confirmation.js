let confirmationTimeout;

function buyNow() {
  clearBasket();
  closeCart();
  showConfirmation();
}

function clearBasket() {
  for (let i = 0; i < dishes.length; i++) {
    if (dishes[i].amount > 0) {
      dishes[i].amount = 0;
      updateBasketItem(dishes[i]);
    }
  }
}

function showConfirmation() {
  const confirmationRef = document.getElementById("confirmation");

  confirmationRef.innerHTML = confirmationTemplate();
  confirmationRef.classList.remove("fade-out");
  confirmationRef.showModal();
  clearTimeout(confirmationTimeout);
  confirmationTimeout = setTimeout(fadeOutConfirmation, 3000);
}

function fadeOutConfirmation() {
  document.getElementById("confirmation").classList.add("fade-out");
  confirmationTimeout = setTimeout(hideConfirmation, 400);
}

function hideConfirmation() {
  const confirmationRef = document.getElementById("confirmation");

  clearTimeout(confirmationTimeout);
  confirmationRef.close();
  confirmationRef.classList.remove("fade-out");
  confirmationRef.innerHTML = "";
}
