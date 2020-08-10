// Variables
var panier = JSON.parse(localStorage.getItem('panier')) || [];

const itemCounter = document.querySelector(".cart-count");

// Item Cart-Counter
itemCounter.textContent = "( " + panier.length + " )";