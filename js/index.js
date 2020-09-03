// Variables
const apiUrl = 'http://localhost:3000/api/cameras/';

const productsDOM = document.querySelector('.products-display');

// Getting the products
async function getProducts() {
    try {
        let result = await fetch(apiUrl);
        let data = await result.json();
        return data;

    } catch (error) {
        console.error(error);
    }
}

// Displaying the products
function displayProducts(products) {

    let display = '';

    products.forEach(product => {
        display += `
            <!-- Single item -->
            <div class="col card text-center p-2">
                    <a href="./product.html?id=${product._id}">
                        <img src=${product.imageUrl} class="card-img-top" alt="product-${product.name}">
                    </a>
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">${product.description}</p>
                        <p>Prix : <span class="font-weight-bold">${product.price / 100} €</span></p>
                        <a href="./product.html?id=${product._id}" class="btn btn-outline-primary btn-block">Voir le produit</a>
                    </div>
            </div>
            <!-- Single item end-->
            `;
    });

    productsDOM.innerHTML = display;
}

//MAIN FUNCTION
document.addEventListener("DOMContentLoaded", () => {
    console.log("Content loaded");

    //Getting all products
    getProducts().then(products => displayProducts(products)); // Récuperer les données depuis l'API puis afficher les produits
});