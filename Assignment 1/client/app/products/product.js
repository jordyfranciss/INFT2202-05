class Product {
    constructor(name, description, stock, price) {
        this.id = this.generateUniqueId();
        this.name = name;
        this.description = description;
        this.stock = stock;
        this.price = price;
    }

    generateUniqueId() {
        return `prod-${Date.now().toString(36)}-${Math.random().toString(36).substr(2, 5)}`;
    }
}

export default Product;
