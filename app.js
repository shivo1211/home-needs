/**
 * HOME NEEDS - Cart & Checkout Logic
 * WhatsApp-based checkout system
 */

// WhatsApp number for orders
const WHATSAPP_NUMBER = "919892030198";

// Cart state
let cart = [];

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromStorage();
    initNavigation();
    initCartSidebar();

    // Initialize page-specific features
    const page = document.body.dataset.page;
    if (page === 'home' || page === 'offers') {
        initProductGrid();
        initCategoryFilters();
    }

    updateCartUI();
});

// ========================================
// NAVIGATION
// ========================================
function initNavigation() {
    const navbar = document.querySelector('.navbar');

    // Scroll effect for navbar
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
    }
}

// ========================================
// PRODUCT GRID
// ========================================
function initProductGrid() {
    const grid = document.querySelector('.products-grid');
    if (!grid) return;

    const page = document.body.dataset.page;
    let productsToShow = PRODUCTS;

    // Filter for offers page
    if (page === 'offers') {
        productsToShow = PRODUCTS.filter(p => p.offer || p.popular);
    }

    renderProducts(productsToShow);
}

function renderProducts(products, category = 'all') {
    const grid = document.querySelector('.products-grid');
    if (!grid) return;

    // Filter by category
    let filtered = products;
    if (category !== 'all') {
        filtered = products.filter(p => p.category === category);
    }

    grid.innerHTML = filtered.map(product => createProductCard(product)).join('');

    // Add event listeners
    grid.querySelectorAll('.product-card').forEach(card => {
        const productId = card.dataset.productId;
        const product = PRODUCTS.find(p => p.id === productId);

        // Quantity buttons
        const minusBtn = card.querySelector('.qty-minus');
        const plusBtn = card.querySelector('.qty-plus');
        const qtyValue = card.querySelector('.qty-value');

        let qty = 1;

        minusBtn.addEventListener('click', () => {
            if (qty > 1) {
                qty--;
                qtyValue.textContent = qty;
            }
        });

        plusBtn.addEventListener('click', () => {
            if (qty < 99) {
                qty++;
                qtyValue.textContent = qty;
            }
        });

        // Add to cart button
        const addBtn = card.querySelector('.add-to-cart-btn');
        addBtn.addEventListener('click', () => {
            addToCart(product, qty);

            // Visual feedback
            addBtn.classList.add('added');
            addBtn.innerHTML = '✓ Added to Cart';

            setTimeout(() => {
                addBtn.classList.remove('added');
                addBtn.innerHTML = '<span>🛒</span> Add to Cart';
            }, 1500);
        });
    });
}

function createProductCard(product) {
    const isOffer = product.offer;

    return `
    <div class="product-card" data-product-id="${product.id}">
      ${isOffer ? '<span class="discount-tag">OFFER</span>' : ''}
      <div class="product-emoji">${product.icon}</div>
      <div class="product-category">${product.category}</div>
      <h3 class="product-name">${product.name}</h3>
      <p class="product-brand">${product.brand}</p>
      <div class="product-sizes">
        ${product.sizes.map(size => `<span class="size-tag">${size}</span>`).join('')}
      </div>
      <div class="quantity-selector">
        <button class="qty-btn qty-minus" type="button">−</button>
        <span class="qty-value">1</span>
        <button class="qty-btn qty-plus" type="button">+</button>
      </div>
      <button class="add-to-cart-btn" type="button">
        <span>🛒</span> Add to Cart
      </button>
    </div>
  `;
}

// ========================================
// CATEGORY FILTERS
// ========================================
function initCategoryFilters() {
    const filtersContainer = document.querySelector('.category-filters');
    if (!filtersContainer) return;

    // Create filter pills
    const allPill = `<button class="category-pill active" data-category="all">
    <span class="category-icon">🛒</span>
    All Items
  </button>`;

    const categoryPills = CATEGORIES.map(cat => `
    <button class="category-pill" data-category="${cat}">
      <span class="category-icon">${CATEGORY_ICONS[cat] || '📦'}</span>
      ${cat}
    </button>
  `).join('');

    filtersContainer.innerHTML = allPill + categoryPills;

    // Add click handlers
    filtersContainer.querySelectorAll('.category-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            // Update active state
            filtersContainer.querySelectorAll('.category-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            // Filter products
            const category = pill.dataset.category;
            const page = document.body.dataset.page;
            let products = PRODUCTS;

            if (page === 'offers') {
                products = PRODUCTS.filter(p => p.offer || p.popular);
            }

            renderProducts(products, category);
        });
    });
}

// ========================================
// CART FUNCTIONALITY
// ========================================
function initCartSidebar() {
    const cartBtn = document.querySelector('.cart-btn');
    const floatingCart = document.querySelector('.floating-cart');
    const cartOverlay = document.querySelector('.cart-overlay');
    const cartSidebar = document.querySelector('.cart-sidebar');
    const closeCartBtn = document.querySelector('.close-cart');

    // Open cart
    const openCart = () => {
        cartOverlay.classList.add('open');
        cartSidebar.classList.add('open');
        document.body.style.overflow = 'hidden';
    };

    // Close cart
    const closeCart = () => {
        cartOverlay.classList.remove('open');
        cartSidebar.classList.remove('open');
        document.body.style.overflow = '';
    };

    if (cartBtn) cartBtn.addEventListener('click', openCart);
    if (floatingCart) floatingCart.addEventListener('click', openCart);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);

    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleWhatsAppCheckout);
    }
}

function addToCart(product, quantity = 1) {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            brand: product.brand,
            icon: product.icon,
            quantity: quantity
        });
    }

    saveCartToStorage();
    updateCartUI();
    showToast(`${product.name} added to cart!`);
}

function updateCartItemQuantity(productId, delta) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += delta;

    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCartToStorage();
        updateCartUI();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartUI();
}

function updateCartUI() {
    // Update cart count badges
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    document.querySelectorAll('.cart-count').forEach(badge => {
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'flex' : 'none';
    });

    // Update cart items list
    const cartItemsContainer = document.querySelector('.cart-items');
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <p>Your cart is empty</p>
        <p>Start adding some items!</p>
      </div>
    `;
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
      <div class="cart-item" data-product-id="${item.id}">
        <div class="cart-item-emoji">${item.icon}</div>
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-brand">${item.brand}</div>
          <div class="cart-item-qty">
            <button class="qty-btn cart-qty-minus" type="button">−</button>
            <span class="qty-value">${item.quantity}</span>
            <button class="qty-btn cart-qty-plus" type="button">+</button>
          </div>
        </div>
        <button class="remove-item" type="button">🗑️</button>
      </div>
    `).join('');

        // Add event listeners for cart items
        cartItemsContainer.querySelectorAll('.cart-item').forEach(itemEl => {
            const productId = itemEl.dataset.productId;

            itemEl.querySelector('.cart-qty-minus').addEventListener('click', () => {
                updateCartItemQuantity(productId, -1);
            });

            itemEl.querySelector('.cart-qty-plus').addEventListener('click', () => {
                updateCartItemQuantity(productId, 1);
            });

            itemEl.querySelector('.remove-item').addEventListener('click', () => {
                removeFromCart(productId);
            });
        });
    }

    // Update summary
    const totalItemsEl = document.querySelector('.total-items');
    if (totalItemsEl) {
        totalItemsEl.textContent = `${totalItems} item${totalItems !== 1 ? 's' : ''}`;
    }

    // Update checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.disabled = cart.length === 0;
    }
}

// ========================================
// WHATSAPP CHECKOUT
// ========================================
function handleWhatsAppCheckout() {
    if (cart.length === 0) return;

    // Format cart items for WhatsApp message
    let message = "🛒 *Home Needs Order*\n\n";

    cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name} - ${item.brand} - Qty: ${item.quantity}\n`;
    });

    message += "\n---\n";
    message += "Shopper will do other part of making bill for final payment.";

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Show success message
    showToast('Opening WhatsApp...');
}

// ========================================
// STORAGE
// ========================================
function saveCartToStorage() {
    localStorage.setItem('homeNeedsCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('homeNeedsCart');
    if (savedCart) {
        try {
            cart = JSON.parse(savedCart);
        } catch (e) {
            cart = [];
        }
    }
}

// ========================================
// TOAST NOTIFICATIONS
// ========================================
function showToast(message, type = 'success') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast');
    if (existingToast) {
        existingToast.remove();
    }

    // Create new toast
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Show toast
    setTimeout(() => toast.classList.add('show'), 10);

    // Hide and remove
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// ========================================
// CONTACT FORM
// ========================================
function handleContactForm(e) {
    e.preventDefault();

    const form = e.target;
    const name = form.querySelector('#name').value;
    const phone = form.querySelector('#phone').value;
    const message = form.querySelector('#message').value;

    // Format message for WhatsApp
    let whatsappMessage = `📞 *Contact Inquiry*\n\n`;
    whatsappMessage += `*Name:* ${name}\n`;
    whatsappMessage += `*Phone:* ${phone}\n`;
    whatsappMessage += `*Message:*\n${message}`;

    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');

    // Reset form
    form.reset();
    showToast('Opening WhatsApp...');
}
