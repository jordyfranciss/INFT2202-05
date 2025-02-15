// src/client/app/products/create.js
import ProductService from './product.mock.service.js';
import Product from './product.js';

const params = new URLSearchParams(window.location.search);
const editId = params.get('edit');
let currentProduct = null;


function validateForm(name, description, stock, price) {
    let isValid = true;
    const errorMessages = {
        name: 'Product name is required.',
        description: 'Product description is required.',
        stock: 'Stock must be a valid positive number.',
        price: 'Price must be a valid positive number with up to 2 decimal places.',
    };

    
    ['productNameError', 'productDescriptionError', 'productStockError', 'productPriceError'].forEach(id => {
        document.getElementById(id).textContent = '';
    });

   
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


document.getElementById('productPrice').addEventListener('input', function(e) {
    let value = e.target.value.replace(/[^\d.]/g, '');  
    const parts = value.split('.');
    
    
    if (parts.length > 2) value = parts[0] + '.' + parts.slice(1).join('');
    if (parts[1]) value = parts[0] + '.' + parts[1].slice(0, 2);
    
    e.target.value = value;
});


function autoFillForm(product) {
    document.getElementById('productName').value = product.name;
    document.getElementById('productDescription').value = product.description;
    document.getElementById('productStock').value = product.stock;
    document.getElementById('productPrice').value = product.price.toFixed(2);
    document.querySelector('h1').textContent = 'Edit Product';
    document.querySelector('button[type="submit"]').textContent = 'Save Changes';
}


if (editId) {
    currentProduct = ProductService.getProducts().find(p => p.id === editId);
    if (currentProduct) autoFillForm(currentProduct);
}


document.getElementById('create-product-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('productName').value;
    const description = document.getElementById('productDescription').value;
    const stock = parseInt(document.getElementById('productStock').value);
    const price = parseFloat(document.getElementById('productPrice').value);

    if (!validateForm(name, description, stock, price)) return;

    const newProduct = new Product(name, description, stock, price);

    if (editId) {
        newProduct.id = editId;  
        ProductService.updateProduct(editId, newProduct);
        alert('Product updated successfully!');
    } else {
        ProductService.addProduct(newProduct);
        alert('Product created successfully!');
    }

    window.location.href = 'list.html';
});
