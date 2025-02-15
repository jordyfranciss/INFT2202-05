/*
    Name:   Jordy Francis
    filename: app.js
    Course: INFT 2202
    Date: January 10
    Description: This is my general application script.  Functions that are required on every page should live here.
*/
// src/client/app/products/list.js
import ProductService from './product.mock.service.js';
import Product from './product.js';

class ProductList {
    constructor() {
        this.products = ProductService.getProducts();
        this.currentPage = 1;
        this.itemsPerPage = 10;
        this.productListElement = document.querySelector('#product-list tbody');
        this.paginationContainer = document.getElementById('pagination');
        this.itemsPerPageSelector = document.getElementById('itemsPerPage');

        this.addEventListeners();
        this.render();
    }

    addEventListeners() {
        // Change handler for items per page
        this.itemsPerPageSelector.addEventListener('change', (e) => {
            this.itemsPerPage = parseInt(e.target.value);
            this.currentPage = 1; // Reset to first page
            this.render();
        });

        // Initialize the value for items per page
        this.itemsPerPage = parseInt(this.itemsPerPageSelector.value);
    }

    calculateTotalPages() {
        return Math.ceil(this.products.length / this.itemsPerPage);
    }

    getCurrentPageProducts() {
        const startIdx = (this.currentPage - 1) * this.itemsPerPage;
        const endIdx = startIdx + this.itemsPerPage;
        return this.products.slice(startIdx, endIdx);
    }

    renderProductRows() {
        const currentProducts = this.getCurrentPageProducts();

        if (this.products.length === 0) {
            this.productListElement.innerHTML = '<tr><td colspan="5" class="text-center">No products found.</td></tr>';
            return;
        }

        this.productListElement.innerHTML = '';
        currentProducts.forEach(product => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>${product.stock}</td>
                <td>$${product.price.toFixed(2)}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="updateProduct('${product.id}')">Update</button>
                    <button class="btn btn-danger btn-sm" onclick="removeProduct('${product.id}')">Delete</button>
                </td>
            `;
            this.productListElement.appendChild(row);
        });
    }

    renderPaginationControls() {
        const totalPages = this.calculateTotalPages();
        let paginationHTML = '';

        // Previous button
        paginationHTML += `
            <li class="page-item ${this.currentPage === 1 ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${this.currentPage - 1}">Previous</a>
            </li>
        `;

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            paginationHTML += `
                <li class="page-item ${i === this.currentPage ? 'active' : ''}">
                    <a class="page-link" href="#" data-page="${i}">${i}</a>
                </li>
            `;
        }

        // Next button
        paginationHTML += `
            <li class="page-item ${this.currentPage === totalPages ? 'disabled' : ''}">
                <a class="page-link" href="#" data-page="${this.currentPage + 1}">Next</a>
            </li>
        `;

        this.paginationContainer.innerHTML = paginationHTML;

        // Add click event listeners to pagination buttons
        this.paginationContainer.querySelectorAll('.page-link').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const newPage = parseInt(e.target.dataset.page);
                if (newPage >= 1 && newPage <= totalPages) {
                    this.currentPage = newPage;
                    this.render();
                }
            });
        });
    }

    render() {
        this.renderProductRows();
        this.renderPaginationControls();
    }
}

// Initialize the product list
const productList = new ProductList();

// Global functions for update and delete actions
window.updateProduct = function(id) {
    window.location.href = `create.html?edit=${id}`;
};

window.removeProduct = function(id) {
    if (confirm('Are you sure you want to remove this product?')) {
        ProductService.deleteProduct(id);
        window.location.reload();
    }
};
