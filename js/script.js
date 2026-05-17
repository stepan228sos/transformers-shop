let cart = [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

let savedCart = localStorage.getItem("cart");

if (savedCart) {
    cart = JSON.parse(savedCart);
}

let products = document.querySelectorAll(".product");
let buttons = document.querySelectorAll(".add-to-cart");
let cartItems = document.querySelector("#cart-items");
let total = document.querySelector("#total");
let clearCart = document.querySelector("#clear-cart");
let payButton = document.querySelector("#pay-btn");
let filter = document.querySelector("#filter");

const calculateTotal = () => {
    let sum = 0;

    cart.forEach(function (item) {
        sum = sum + item.price;
    });

    return sum;
};

function showCart() {
    let text = "";

    cart.forEach(function (item, index) {
        text = text + (index + 1) + ". " + item.name + " - " + item.price + " руб. ";
        text = text + '<button onclick="removeFromCart(' + index + ')">Удалить</button><br>';
    });

    cartItems.innerHTML = text;
    total.textContent = "Итого: " + calculateTotal() + " руб.";
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    showCart();
}

buttons.forEach(function (button) {
    button.addEventListener("click", function () {
        let product = button.parentElement;

        let name = product.dataset.name;
        let price = Number(product.dataset.price);

        let item = {
            name: name,
            price: price
        };

        cart.push(item);
        saveCart();
        showCart();
    });
});

clearCart.addEventListener("click", function () {
    cart = [];
    saveCart();
    showCart();
});

payButton.addEventListener("click", function () {
    if (cart.length === 0) {
        alert("Корзина пуста");
    } else {
        alert("Покупка прошла успешно");
        cart = [];
        saveCart();
        showCart();
    }
});

filter.addEventListener("change", function () {
    let category = filter.value;

    products.forEach(function (product) {
        if (category === "all") {
            product.style.display = "block";
        } else if (product.dataset.category === category) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
});
showCart();