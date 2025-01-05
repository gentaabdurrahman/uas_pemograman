const sidebar = document.getElementById('sidebar');
const cartIcon = document.querySelector('.cart-icon');
const sidebarClose = document.querySelector('.sidebar-close');
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalElement = document.querySelector('.cart-total');
const checkoutButton = document.querySelector('.checkout-btn');
const searchBox = document.querySelector('.search--box input');
const menuItems = document.querySelectorAll('.menu--item, .card');
const cartCountElement = document.querySelector('.cart-icon span');

let cart = [];

cartIcon.addEventListener('click', () => {
    sidebar.classList.add('open');
});

sidebarClose.addEventListener('click', () => {
    sidebar.classList.remove('open');
});

addToCartButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        const title = card.querySelector('.card--title').innerText;
        const priceText = card.querySelector('.price').innerText;
        const price = parseInt(priceText.replace(/\D/g, ''));

        // Check if item already exists in cart
        const existingItem = cart.find(item => item.title === title);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ title, price, quantity: 1 });
        }

        updateCartUI();
    });
});

function updateCartUI() {
    cartItemsContainer.innerHTML = ''; 
    let total = 0;
    let totalItems = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Keranjang Kosong, Silahkan Tambahkan Barang!</p>';
    } else {
        cart.forEach((item, index) => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item.title}</span>
                <span class="cart-item-price">${item.quantity} x Rp.${item.price.toLocaleString()}</span>
                <button class="decrease-quantity" data-index="${index}">-</button>
                <button class="increase-quantity" data-index="${index}">+</button>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartItemsContainer.appendChild(cartItem);

            total += item.price * item.quantity;
            totalItems += item.quantity;
        });

        const clearAllButton = document.createElement('button');
        clearAllButton.className = 'clear-all';
        clearAllButton.innerText = 'Clear All';
        clearAllButton.addEventListener('click', () => {
            cart = [];
            updateCartUI();
        });
        cartItemsContainer.appendChild(clearAllButton);

        const decreaseButtons = document.querySelectorAll('.decrease-quantity');
        decreaseButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index; 
                const item = cart[index];
                if (item.quantity > 1) {
                    item.quantity--;
                } else {
                    cart.splice(index, 1);
                }
                updateCartUI();
            });
        });

        const increaseButtons = document.querySelectorAll('.increase-quantity');
        increaseButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                cart[index].quantity++;
                updateCartUI();
            });
        });

        const removeButtons = document.querySelectorAll('.remove-item');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                cart.splice(index, 1);
                updateCartUI();
            });
        });
    }

    cartTotalElement.innerText = `Rp.${total.toLocaleString()}`;
    cartCountElement.innerText = totalItems;
}

// Checkout action
checkoutButton.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Keranjang Anda kosong. Silahkan Tambahkan Barang.');
    } else {
        alert('Silakan login atau buat akun terlebih dahulu untuk melakukan transaksi!');
    }
});

searchBox.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();

    menuItems.forEach(item => {
        const titleElement = item.querySelector('h5, .card--title');
        const title = titleElement ? titleElement.innerText.toLowerCase() : '';

        if (title.includes(query)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});
