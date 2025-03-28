
// server/app/products/product.js

function Product(name, description, stock, price, owner = null) {
    this.name = name;
    this.description = description;
    this.stock = stock;
    this.price = price;
    this.owner = owner;
    this.createdAt = new Date().toISOString();
}

export default Product;