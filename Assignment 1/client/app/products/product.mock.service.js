
/*Name - jordy francis
 *  Service constructor
student id - 100934437
 */
// src/client/app/products/product.service.js
import Product from './product.js';

class ProductService {
    constructor() {
        this.products = this._retrieveProducts();
    }

    _retrieveProducts() {
        try {
            const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
            return storedProducts.map(p => Object.assign(new Product(), p));
        } catch (error) {
            console.error("Error loading products:", error);
            return [];
        }
    }

    _storeProducts() {
        localStorage.setItem('products', JSON.stringify(this.products));
    }

    addProduct(product) {
        product.id = product.id || Date.now(); // Ensure unique ID if missing
        this.products.push(product);
        this._storeProducts();
    }

    getProducts() {
        return [...this.products]; // Return a copy to prevent direct mutation
    }

    deleteProduct(id) {
        this.products = this.products.filter(p => p.id !== id);
        this._storeProducts();
    }

    updateProduct(id, updatedProduct) {
        const index = this.products.findIndex(p => p.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedProduct };
            this._storeProducts();
        }
    }
}

export default new ProductService();
