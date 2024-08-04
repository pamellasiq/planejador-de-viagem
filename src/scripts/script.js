document.addEventListener('DOMContentLoaded', () => {
    const Products = [
        { id: 1, name: 'Product-1', price: 100 },
        { id: 2, name: 'Product-2', price: 200 },
        { id: 3, name: 'Product-3', price: 300 },
    ];

    const productTable = document.getElementById('productTable').querySelector('tbody');
    const cartTable = document.getElementById('cartTable').querySelector('tbody');
    const totalPriceEl = document.getElementById('totalPrice');

    let cart = [];

    // Function to render products in the product list
    function renderProducts() {
        productTable.innerHTML = '';
        Products.forEach(product => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>
                    <div class="quantity">
                        <button onclick="decrementQuantity(${product.id})">-</button>
                        <span id="quantity-${product.id}">0</span>
                        <button onclick="incrementQuantity(${product.id})">+</button>
                    </div>
                </td>
            `;
            productTable.appendChild(tr);
        });
    }

    // Function to render the cart
    function renderCart() {
        cartTable.innerHTML = '';
        if (cart.length === 0) {
            cartTable.innerHTML = '<tr><td colspan="2">No products added to the cart</td></tr>';
        } else {
            cart.forEach(item => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.quantity} x ${item.price}</td>
                `;
                cartTable.appendChild(tr);
            });
        }
        updateTotalPrice();
    }

    // Function to update total price
    function updateTotalPrice() {
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        totalPriceEl.textContent = Total: $${total};
    }

    // Function to add product to cart
    window.incrementQuantity = (id) => {
        const product = Products.find(p => p.id === id);
        const cartItem = cart.find(item => item.id === id);

        if (cartItem) {
            cartItem.quantity++;
        } else {
            cart.push({ ...product, quantity: 1 });
        }

        document.getElementById(quantity-${id}).textContent = cartItem ? cartItem.quantity : 1;
        renderCart();
    };

    // Function to remove product from cart
    window.decrementQuantity = (id) => {
        const cartItem = cart.find(item => item.id === id);

        if (cartItem) {
            if (cartItem.quantity > 1) {
                cartItem.quantity--;
            } else {
                cart = cart.filter(item => item.id !== id);
            }
            document.getElementById(quantity-${id}).textContent = cartItem.quantity || 0;
            renderCart();
        }
    };

    renderProducts();
    renderCart();
});