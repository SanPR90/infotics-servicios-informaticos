// Definición de la función de cálculo y la lista de productos por defecto

// Lista inicial de productos en el carrito (Simula la carga desde una base de datos/sesión)
let cart = [
    {
        id: 1,
        name: "Servicio Técnico Plus",
        price: 150.00,
        quantity: 1,
        image: "img/servicio-tecnico.png" // Reemplaza con una ruta válida en tu proyecto
    },
    {
        id: 2,
        name: "Merchandising: Taza INFOTICS",
        price: 14.95,
        quantity: 2,
        image: "img/taza-infotics.png" // Reemplaza con una ruta válida en tu proyecto
    },
];

const SHIPPING_COST = 5.00;
const cartItemsContainer = document.getElementById('cart-items-container');
const subtotalElement = document.getElementById('subtotal-amount');
const totalElement = document.getElementById('total-amount');

/**
 * Renderiza todos los productos del carrito en el HTML.
 */
function renderCart() {
    cartItemsContainer.innerHTML = ''; // Limpia el contenido anterior

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; padding: 20px;">Tu carrito está vacío.</p>';
        updateSummary();
        return;
    }

    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.dataset.id = item.id;
        itemElement.dataset.price = item.price;

        itemElement.innerHTML = `
            <div class="item-details">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <p>Precio Unitario: ${item.price.toFixed(2)} €</p>
                </div>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn minus-btn" data-id="${item.id}" data-action="minus">-</button>
                <input type="number" value="${item.quantity}" min="1" class="item-quantity-input" data-id="${item.id}" readonly>
                <button class="quantity-btn plus-btn" data-id="${item.id}" data-action="plus">+</button>
            </div>
            <div class="item-price">
                ${(item.price * item.quantity).toFixed(2)} €
            </div>
            <button class="remove-item" data-id="${item.id}" title="Eliminar">
                <i class="fas fa-trash-alt"></i>
            </button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    // Vuelve a adjuntar los listeners después de renderizar
    attachEventListeners();
    updateSummary();
}

/**
 * Adjunta listeners de eventos a los botones de cantidad y eliminación.
 */
function attachEventListeners() {
    // 1. Manejar botones de cantidad (+/-)
    document.querySelectorAll('.quantity-btn').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = parseInt(this.dataset.id);
            const action = this.dataset.action;
            const itemIndex = cart.findIndex(item => item.id === itemId);

            if (itemIndex > -1) {
                let newQuantity = cart[itemIndex].quantity;
                
                if (action === 'plus') {
                    newQuantity++;
                } else if (action === 'minus' && newQuantity > 1) {
                    newQuantity--;
                }
                
                cart[itemIndex].quantity = newQuantity;
                renderCart(); // Vuelve a renderizar para actualizar
            }
        });
    });

    // 2. Manejar el botón de eliminar
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function() {
            const itemId = parseInt(this.dataset.id);
            // Filtra el carrito para mantener solo los productos que NO coincidan con el ID
            cart = cart.filter(item => item.id !== itemId);
            renderCart(); // Vuelve a renderizar
        });
    });
}

/**
 * Calcula el subtotal, total y actualiza el resumen del pedido.
 */
function updateSummary() {
    let subtotal = 0;
    
    // Calcula el subtotal sumando el precio * cantidad de cada artículo
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });

    const total = subtotal + SHIPPING_COST;

    // Actualiza los elementos del resumen
    subtotalElement.textContent = subtotal.toFixed(2) + ' €';
    totalElement.textContent = total.toFixed(2) + ' €';
}


// Inicializa el carrito al cargar la página
document.addEventListener('DOMContentLoaded', renderCart);