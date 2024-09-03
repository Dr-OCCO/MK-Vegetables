const products = [
    // Sample product data
    { id: 1, name: "Organic Carrots", description: "Fresh, crunchy, and organically grown.", price: 2.99, imageURL: "images/11.jpg" },
    { id: 2, name: "Organic Broccoli", description: "Rich in vitamins and minerals.", price: 3.49, imageURL: "images/8.jpg" },
    // Add more products as needed
];

function displayFeaturedProducts() {
    const featuredProductsSection = document.querySelector('.featured-products .product-grid');
    featuredProductsSection.innerHTML = '';

    products.slice(0, 5).forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <img src="${product.imageURL}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>$${product.price.toFixed(2)}</p>
            <a href="product-details.html?id=${product.id}">View Details</a>
        `;
        featuredProductsSection.appendChild(productItem);
    });
}

function displayProducts(page) {
    const productsPerPage = 10;
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const paginatedProducts = products.slice(startIndex, endIndex);

    const productList = document.querySelector('.product-list .product-grid');
    productList.innerHTML = '';

    paginatedProducts.forEach(product => {
        const productItem = document.createElement('div');
        productItem.className = 'product-item';
        productItem.innerHTML = `
            <img src="${product.imageURL}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>$${product.price.toFixed(2)}</p>
            <a href="product-details.html?id=${product.id}">View Details</a>
        `;
        productList.appendChild(productItem);
    });
}

function displayProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'), 10);
    const product = products.find(p => p.id === productId);

    if (product) {
        const productDetails = document.querySelector('.product-details');
        productDetails.innerHTML = `
            <img src="${product.imageURL}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <p>$${product.price.toFixed(2)}</p>
            <button>Add to Cart</button>
        `;
    }
}

function updateCartDisplay() {
    const cartSection = document.querySelector('.cart');
    cartSection.innerHTML = '';

    // Placeholder cart items
    const cartItems = [
        { id: 1, name: "Organic Carrots", quantity: 2, price: 2.99 },
        { id: 2, name: "Organic Broccoli", quantity: 1, price: 3.49 }
    ];

    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'product-item';
        cartItem.innerHTML = `
            <h3>${item.name}</h3>
            <p>Quantity: <input type="number" value="${item.quantity}" min="1"></p>
            <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
        `;
        cartSection.appendChild(cartItem);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.body.classList.contains('home')) {
        displayFeaturedProducts();
    } else if (document.body.classList.contains('products')) {
        let currentPage = 1;
        displayProducts(currentPage);

        document.getElementById('prev').addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                displayProducts(currentPage);
            }
        });

        document.getElementById('next').addEventListener('click', () => {
            if (currentPage < Math.ceil(products.length / 10)) {
                currentPage++;
                displayProducts(currentPage);
            }
        });
    } else if (document.body.classList.contains('product-details')) {
        displayProductDetails();
    } else if (document.body.classList.contains('cart')) {
        updateCartDisplay();
    }
});
