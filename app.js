/**
 * HOME NEEDS - Cart & Checkout Logic
 * WhatsApp-based checkout system
 */

// WhatsApp number for orders
const WHATSAPP_NUMBER = "917304920465";

// Cart state
let cart = [];

// Current filter state
let currentCategory = 'all';
let currentProducts = PRODUCTS;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromStorage();
    initNavigation();
    initTheme(); // Initialize Theme
    initCartSidebar();

    // Initialize page-specific features
    const page = document.body.dataset.page;
    if (page === 'home' || page === 'offers') {
        initProductGrid();
        initCategoryFilters();
        initScrollCategoryDetection();
    }

    updateCartUI();
});

// ========================================
// NAVIGATION
// ========================================
function initNavigation() {
    const navbar = document.querySelector('.navbar');

    // Scroll effect for navbar
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        // Toggle 'scrolled' class for background style
        if (scrollTop > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Detect scroll direction for shrinking header on mobile
        // Only apply if scrolled down significantly (> 100px)
        if (scrollTop > 100) {
            if (scrollTop > lastScrollTop) {
                // Scrolling DOWN - Hide second row
                document.body.classList.add('header-compact');
            } else {
                // Scrolling UP - Show full header
                document.body.classList.remove('header-compact');
            }
        } else {
            // At top - Show full header
            document.body.classList.remove('header-compact');
        }

        // Floating Cart - Scroll to Top Logic
        const floatingCart = document.querySelector('.floating-cart');
        if (floatingCart) {
            // "long back to top" -> scrolled down deep (> 800px) AND scrolling up
            if (scrollTop > 800 && scrollTop < lastScrollTop) {
                floatingCart.classList.add('scroll-top');
            } else if (scrollTop <= 800 || scrollTop > lastScrollTop) {
                // Near top OR scrolling down -> Show Cart
                floatingCart.classList.remove('scroll-top');
            }
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }, { passive: true });

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
// THEME TOGGLE
// ========================================
function initTheme() {
    const themeBtn = document.querySelector('.theme-toggle');
    if (!themeBtn) return;

    const themeIcon = themeBtn.querySelector('.theme-icon');

    // Check saved preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Apply theme
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.body.classList.add('dark-mode');
        themeIcon.textContent = '☀️'; // Sun icon for light mode switch
    } else {
        document.body.classList.remove('dark-mode');
        themeIcon.textContent = '🌙'; // Moon icon for dark mode switch
    }

    // Toggle event
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        const isDark = document.body.classList.contains('dark-mode');
        themeIcon.textContent = isDark ? '☀️' : '🌙';

        // Save preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');

        // Animation effect
        themeBtn.style.transform = 'scale(0.8) rotate(360deg)';
        setTimeout(() => {
            themeBtn.style.transform = '';
        }, 300);
    });
}

// ========================================
// PRODUCT GRID
// ========================================
function initProductGrid() {
    const grid = document.querySelector('.products-grid');
    if (!grid) return;

    const page = document.body.dataset.page;
    currentProducts = PRODUCTS;

    // Filter for offers page
    if (page === 'offers') {
        currentProducts = PRODUCTS.filter(p => p.offer || p.popular);
    }

    renderProducts(currentProducts);
}

function renderProducts(products, category = 'all') {
    const grid = document.querySelector('.products-grid');
    if (!grid) return;

    currentCategory = category;

    // Filter by category
    let filtered = products;
    if (category !== 'all') {
        filtered = products.filter(p => p.category === category);
    }

    // Group products by category for scroll detection
    const groupedHtml = [];

    if (category === 'all') {
        // Group by category
        const categories = [...new Set(filtered.map(p => p.category))];
        categories.forEach(cat => {
            const categoryProducts = filtered.filter(p => p.category === cat);
            groupedHtml.push(`
                <div class="category-group" data-category="${cat}">
                    <h3 class="category-group-title">${CATEGORY_ICONS[cat] || '📦'} ${cat}</h3>
                    <div class="category-products">
                        ${categoryProducts.map(product => createProductCard(product)).join('')}
                    </div>
                </div>
            `);
        });
        grid.innerHTML = groupedHtml.join('');
    } else {
        // Wrap in category-products for grid layout
        grid.innerHTML = `<div class="category-products">${filtered.map(product => createProductCard(product)).join('')}</div>`;
    }

    // Add event listeners
    grid.querySelectorAll('.product-card').forEach(card => {
        const productId = card.dataset.productId;
        const product = PRODUCTS.find(p => p.id === productId);

        // Weight/Size button pills
        const sizeBtns = card.querySelectorAll('.size-btn');
        let selectedSize = '';

        sizeBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active from all, add to clicked
                sizeBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                selectedSize = btn.dataset.size;

                // Remove error state if present
                card.querySelector('.size-buttons').classList.remove('error');
            });
        });

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
            // Check if weight is selected
            if (!selectedSize) {
                showToast('⚠️ Please select a weight/size first!', 'warning');
                card.querySelector('.size-buttons').classList.add('error');
                setTimeout(() => card.querySelector('.size-buttons').classList.remove('error'), 2000);
                return;
            }

            // Check if quantity is at least 1
            if (qty < 1) {
                showToast('⚠️ Please select quantity!', 'warning');
                return;
            }

            addToCart(product, qty, selectedSize);

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

    // Create size button pills
    const sizeButtons = product.sizes.map(size =>
        `<button type="button" class="size-btn" data-size="${size}">${size}</button>`
    ).join('');

    return `
    <div class="product-card" data-product-id="${product.id}" data-category="${product.category}">
      ${isOffer ? '<span class="discount-tag">OFFER</span>' : ''}
      <div class="product-emoji">${product.icon}</div>
      <div class="product-category">${product.category}</div>
      <h3 class="product-name">${product.name}</h3>
      <p class="product-brand">${product.brand}</p>
      
      <div class="product-selectors">
        <div class="selector-group">
          <label class="selector-label">Weight/Size <span class="required">*</span></label>
          <div class="size-buttons">
            ${sizeButtons}
          </div>
        </div>
        
        <div class="selector-group">
          <label class="selector-label">Quantity <span class="required">*</span></label>
          <div class="quantity-selector">
            <button class="qty-btn qty-minus" type="button">−</button>
            <span class="qty-value">1</span>
            <button class="qty-btn qty-plus" type="button">+</button>
          </div>
        </div>
      </div>
      
      <button class="add-to-cart-btn" type="button">
        <span>🛒</span> Add to Cart
      </button>
    </div>
  `;
}

// ========================================
// SCROLL-BASED CATEGORY DETECTION
// ========================================
function initScrollCategoryDetection() {
    // Only enable when viewing all items
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking && currentCategory === 'all') {
            window.requestAnimationFrame(() => {
                detectVisibleCategory();
                ticking = false;
            });
            ticking = true;
        }
    });
}

function detectVisibleCategory() {
    const categoryGroups = document.querySelectorAll('.category-group');
    if (categoryGroups.length === 0) return;

    const viewportMiddle = window.innerHeight / 2;
    let closestCategory = null;
    let closestDistance = Infinity;

    categoryGroups.forEach(group => {
        const rect = group.getBoundingClientRect();
        const groupMiddle = rect.top + rect.height / 2;
        const distance = Math.abs(groupMiddle - viewportMiddle);

        if (distance < closestDistance && rect.top < window.innerHeight && rect.bottom > 0) {
            closestDistance = distance;
            closestCategory = group.dataset.category;
        }
    });

    if (closestCategory) {
        updateActiveCategoryPill(closestCategory);
    }
}

function updateActiveCategoryPill(category) {
    const filtersContainer = document.querySelector('.category-filters');
    if (!filtersContainer) return;

    const pills = filtersContainer.querySelectorAll('.category-pill');
    let targetPill = null;

    pills.forEach(pill => {
        if (pill.dataset.category === category) {
            if (!pill.classList.contains('active')) {
                pills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                targetPill = pill;
            }
        }
    });

    // Scroll pill into view (Safer manual scroll to valid vertical jumps)
    if (targetPill) {
        const containerWidth = filtersContainer.offsetWidth;
        const pillLeft = targetPill.offsetLeft;
        const pillWidth = targetPill.offsetWidth;

        // Calculate center position
        const targetScroll = pillLeft - (containerWidth / 2) + (pillWidth / 2);

        filtersContainer.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
        });
    }
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
            currentCategory = category;
            const page = document.body.dataset.page;
            let products = PRODUCTS;

            if (page === 'offers') {
                products = PRODUCTS.filter(p => p.offer || p.popular);
            }

            renderProducts(products, category);

            // Scroll to products section
            const productsSection = document.querySelector('#products');
            if (productsSection) {
                productsSection.scrollIntoView({ behavior: 'smooth' });
            }
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

    // Checkout modal elements
    const checkoutModalOverlay = document.querySelector('.checkout-modal-overlay');
    const checkoutModal = document.querySelector('.checkout-modal');
    const closeCheckoutModalBtn = document.querySelector('.close-checkout-modal');
    const confirmCheckoutBtn = document.querySelector('.confirm-checkout-btn');

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

    // Open checkout modal
    const openCheckoutModal = () => {
        if (cart.length === 0) return;
        checkoutModalOverlay.classList.add('open');
        checkoutModal.classList.add('open');
    };

    // Close checkout modal
    const closeCheckoutModal = () => {
        checkoutModalOverlay.classList.remove('open');
        checkoutModal.classList.remove('open');
    };

    if (cartBtn) cartBtn.addEventListener('click', openCart);
    if (floatingCart) {
        floatingCart.addEventListener('click', (e) => {
            // If in Scroll-Top mode, scroll to top
            if (floatingCart.classList.contains('scroll-top')) {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                // Otherwise open cart
                openCart();
            }
        });
    }
    if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);

    // Checkout button opens the modal
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', openCheckoutModal);
    }

    // Checkout modal handlers
    if (checkoutModalOverlay) checkoutModalOverlay.addEventListener('click', closeCheckoutModal);
    if (closeCheckoutModalBtn) closeCheckoutModalBtn.addEventListener('click', closeCheckoutModal);
    if (confirmCheckoutBtn) {
        confirmCheckoutBtn.addEventListener('click', () => {
            handleWhatsAppCheckout();
            closeCheckoutModal();
            closeCart();
        });
    }
}

function addToCart(product, quantity = 1, size = '') {
    // Create unique ID based on product + size
    const cartItemId = `${product.id} -${size} `;
    const existingItem = cart.find(item => item.cartId === cartItemId);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            cartId: cartItemId,
            id: product.id,
            name: product.name,
            brand: product.brand,
            category: product.category,
            icon: product.icon,
            size: size,
            quantity: quantity
        });
    }

    saveCartToStorage();
    updateCartUI();
    showToast(`${product.name} (${size}) added to cart!`);
}

function updateCartItemQuantity(cartItemId, delta) {
    const item = cart.find(item => item.cartId === cartItemId);
    if (!item) return;

    item.quantity += delta;

    if (item.quantity <= 0) {
        removeFromCart(cartItemId);
    } else {
        saveCartToStorage();
        updateCartUI();
    }
}

function removeFromCart(cartItemId) {
    cart = cart.filter(item => item.cartId !== cartItemId);
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
      <div class="cart-item" data-cart-id="${item.cartId}">
        <div class="cart-item-emoji">${item.icon}</div>
        <div class="cart-item-details">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-meta">
            <span class="cart-item-category">${item.category}</span>
            <span class="cart-item-size">${item.size}</span>
          </div>
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
            const cartItemId = itemEl.dataset.cartId;

            itemEl.querySelector('.cart-qty-minus').addEventListener('click', () => {
                updateCartItemQuantity(cartItemId, -1);
            });

            itemEl.querySelector('.cart-qty-plus').addEventListener('click', () => {
                updateCartItemQuantity(cartItemId, 1);
            });

            itemEl.querySelector('.remove-item').addEventListener('click', () => {
                removeFromCart(cartItemId);
            });
        });
    }

    // Update summary
    const totalItemsEl = document.querySelector('.total-items');
    if (totalItemsEl) {
        totalItemsEl.textContent = `${totalItems} item${totalItems !== 1 ? 's' : ''} `;
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

    // Get form fields
    const nameField = document.getElementById('checkout-name');
    const phoneField = document.getElementById('checkout-phone');
    const addressField = document.getElementById('checkout-address');
    const commentField = document.getElementById('checkout-comment');

    // Validate required fields
    let isValid = true;
    const requiredFields = [
        { field: nameField, name: 'Full Name' },
        { field: phoneField, name: 'Phone Number' },
        { field: addressField, name: 'Delivery Address' }
    ];

    // Remove previous error states
    requiredFields.forEach(({ field }) => {
        field.classList.remove('error');
    });

    // Check each required field
    requiredFields.forEach(({ field, name }) => {
        if (!field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        }
    });

    if (!isValid) {
        showToast('⚠️ Please fill in all required fields!', 'warning');
        // Focus on first empty field
        const firstEmpty = requiredFields.find(({ field }) => !field.value.trim());
        if (firstEmpty) {
            firstEmpty.field.focus();
        }
        return;
    }

    // Get values
    const customerName = nameField.value.trim();
    const customerPhone = phoneField.value.trim();
    const customerAddress = addressField.value.trim();
    const customerComment = commentField.value.trim();

    // Format cart items for WhatsApp message
    let message = "🛒 *Home Needs Order*\n";
    message += "📋 *Customer Details*\n";
    message += `👤 Name: ${customerName}\n`;
    message += `📱 Phone: ${customerPhone}\n`;
    message += `📍 Address: ${customerAddress}\n`;
    if (customerComment) {
        message += `💬 Note: ${customerComment}\n`;
    }
    message += "\n--------------------\n\n";

    // Order Items Section
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    message += `*Order Items* (${totalItems} items)\n\n`;

    cart.forEach((item, index) => {
        message += `${index + 1}. *${item.name}*\n`;
        message += `   Size: ${item.size}\n`;
        message += `   Qty: ${item.quantity}\n\n`;
    });

    message += "--------------------\n";
    message += "_Final billing will be done by shopper_";

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message);

    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Show success message
    showToast('Opening WhatsApp...');

    // Clear form after successful checkout
    nameField.value = '';
    phoneField.value = '';
    addressField.value = '';
    commentField.value = '';
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
