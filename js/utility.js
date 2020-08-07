// Variables
var panier = JSON.parse(localStorage.getItem('panier')) || [];

const itemCounter = document.querySelector(".cart-count");
// var panier = JSON.parse(localStorage.getItem('panier')) || [];

// Item Cart-Counter
itemCounter.textContent = "( " + panier.length + " )";

//
// document.addEventListener("DOMContentLoaded", () => {
//     console.log(panier);
// });