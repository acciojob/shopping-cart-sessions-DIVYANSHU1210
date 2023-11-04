// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// Function to render the product list
function renderProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price}
      <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Function to render the shopping cart
function renderCart() {
  const cartList = document.getElementById("cart-list");
  cartList.innerHTML = "";

  const cartData = getCartData();
  const cartTotal = cartData.reduce((total, item) => total + item.price, 0);

  cartData.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price}`;
    cartList.appendChild(li);
  });

  const cartTotalLi = document.createElement("li");
  cartTotalLi.innerHTML = `Total: $${cartTotal}`;
  cartList.appendChild(cartTotalLi);
}

// Function to get the shopping cart data from session storage
function getCartData() {
  const cartDataJson = sessionStorage.getItem("shoppingCart");
  return cartDataJson ? JSON.parse(cartDataJson) : [];
}

// Function to save the shopping cart data to session storage
function saveCartData(cartData) {
  sessionStorage.setItem("shoppingCart", JSON.stringify(cartData));
}

// Event listener for adding items to the cart
document.getElementById("product-list").addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart")) {
    const productId = parseInt(event.target.getAttribute("data-id"), 10);
    const product = products.find((p) => p.id === productId);
    if (product) {
      const cartData = getCartData();
      cartData.push(product);
      saveCartData(cartData);
      renderCart();
    }
  }
});

// Event listener for clearing the cart
document.getElementById("clear-cart-btn").addEventListener("click", () => {
  sessionStorage.removeItem("shoppingCart");
  renderCart();
});

// Initialize the product list and shopping cart
renderProducts();
renderCart(); // Load cart data when the page loads
