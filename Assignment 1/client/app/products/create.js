// src/client/app/products/create.js
import ProductService from './product.mock.service.js';
import Product from './product.js';

const params = new URLSearchParams(window.location.search);
const editId = params.get('edit');
let currentProduct = null;

// Validate form inputs
function validateForm(name, description, stock, price) {
    let isValid = true;
    const errorMessages = {
        name: 'Product name is required.',
        description: 'Product description is required.',
        stock: 'Stock must be a valid positive number.',
        price: 'Price must be a valid positive number with up to 2 decimal places.',
    };

    // Clear previous errors
    ['productNameError', 'productDescriptionError', 'productStockError', 'productPriceError'].forEach(id => {
        document.getElementById(id).textContent = '';
    });

    // Validation checks
    if (!name) {
        document.getElementById('productNameError').textContent = errorMessages.name;
        isValid = false;
    }
    if (!description) {
        document.getElementById('productDescriptionError').textContent = errorMessages.description;
        isValid = false;
    }
    if (!stock || isNaN(stock) || stock < 0) {
        document.getElementById('productStockError').textContent = errorMessages.stock;
        isValid = false;
    }
    if (!price || isNaN(price) || price < 0 || !/^\d+(\.\d{1,2})?$/.test(price.toString())) {
        document.getElementById('productPriceError').textContent = errorMessages.price;
        isValid = false;
    }

    return isValid;
}

// Handle price input formatting
document.getElementById('productPrice').addEventListener('input', function(e) {
    let value = e.target.value.replace(/[^\d.]/g, '');  // Allow only digits and decimal
    const parts = value.split('.');
    
    // Allow only one decimal point and limit decimal places to 2
    if (parts.length > 2) value = parts[0] + '.' + parts.slice(1).join('');
    if (parts[1]) value = parts[0] + '.' + parts[1].slice(0, 2);
    
    e.target.value = value;
});

// Autofill form when editing an existing product
function autoFillForm(product) {
    document.getElementById('productName').value = product.name;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productStock').value = product.stock;
    document.getElementById('productPrice').value = product.price.toFixed(2);
    document.querySelector('h1').textContent = 'Edit Product';
    document.querySelector('button[type="submit"]').textContent = 'Save Changes';
}

// Auto-fill if editing
if (editId) {
    currentProduct = ProductService.getProducts().find(p => p.id === editId);
    if (currentProduct) autoFillForm(currentProduct);
}

// Handle form submission (create or update product)
document.getElementById('create-product-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('productName').value;
    const description = document.getElementById('productDescription').value;
    const stock = parseInt(document.getElementById('productStock').value);
    const price = parseFloat(document.getElementById('productPrice').value);

    // Validate form
    if (!validateForm(name, description, stock, price)) return;

    const newProduct = new Product(name, description, stock, price);

    if (editId) {
        newProduct.id = editId;  // Keep original ID for updates
        ProductService.updateProduct(editId, newProduct);
        alert('Product updated successfully!');
    } else {
        ProductService.addProduct(newProduct);
        alert('Product created successfully!');
    }

    window.location.href = 'list.html';
});
