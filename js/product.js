// Variables
const apiUrl = 'http://localhost:3000/api/cameras/';
const idUrl = window.location.search;
const idCamera = idUrl.substr(4);

const cameraDOM = document.querySelector(".camera-container");
const cameraName = document.querySelector(".camera-name");
const cameraImg = document.querySelector(".camera-img");
const cameraDescription = document.querySelector(".camera-description");
const cameraPrice = document.querySelector(".camera-price");
const cameraOptions = document.querySelector(".camera-options");

const addToCartButton = document.querySelector(".button-addToCart");

var panier = [];

// Getting the camera
async function getCamera() {
    try {
        let result = await fetch(apiUrl + idCamera);
        let data = await result.json();
        return data;

    } catch (error) {
        console.error(error);
    }
}

// Displaying the Camera
function displayCamera(camera) {
    cameraName.innerHTML = camera.name;
    cameraImg.src = camera.imageUrl;
    cameraDescription.innerHTML = camera.description;
    cameraPrice.innerHTML = camera.price / 1000 + " €";

    //lenses options
    let lenseOption = '';

    camera.lenses.forEach(lense => {
        lenseOption += `
        <option class="camera-option" value="${lense}">${lense}</option>
        `;
    });

    cameraOptions.innerHTML = lenseOption;
}

//Adding to cart
function addToCart(camera) {
    const selectedOption = document.querySelector('.camera-option').value;

    class CartItem {
        constructor(id, name, image, description, price, option) {
            this.id = id;
            this.name = name;
            this.image = image;
            this.description = description;
            this.price = price;
            this.option = option;
        }
    }

    const item = new CartItem(idCamera, camera.name, camera.imageUrl, camera.description, camera.price / 1000, selectedOption);
    panier.push(item);
    console.log(panier);
}

// MAIN FUNCTION
document.addEventListener("DOMContentLoaded", () => {
    console.log("Content loaded");

    //Getting the camera and displaying
    getCamera().then(camera => {
        displayCamera(camera);
        addToCartButton.addEventListener("click", addToCart(camera));

        // addToCartButton.addEventListener("click", () => {
        //     const selectedOption = document.querySelector('.camera-option').value;

        //     class CartItem {
        //         constructor(id, name, image, description, price, option) {
        //             this.id = id;
        //             this.name = name;
        //             this.image = image;
        //             this.description = description;
        //             this.price = price;
        //             this.option = option;
        //         }
        //     }

        //     const item = new CartItem(idCamera, camera.name, camera.imageUrl, camera.description, camera.price / 1000, selectedOption);
        //     panier.push(item);
        //     console.log(panier);
        // });
    });
});