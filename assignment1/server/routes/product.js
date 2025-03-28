import express from 'express';
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataPath = join(__dirname, '../data/products.json');

// GET all products
router.get('/', (req, res) => {
    const products = JSON.parse(readFileSync(dataPath));
    res.json(products);
});

// GET product by name
router.get('/search', (req, res) => {
    const products = JSON.parse(readFileSync(dataPath));
    const name = req.query.name;
    if (!name) return res.status(400).json({ message: 'Name query parameter is required' });

    const product = products.find(p => p.name.toLowerCase() === name.toLowerCase());
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
});

// POST new product
router.post('/', (req, res) => {
    const products = JSON.parse(readFileSync(dataPath));
    const newProduct = {
        ...req.body,
        listedAt: new Date().toISOString()
    };
    products.push(newProduct);
    writeFileSync(dataPath, JSON.stringify(products, null, 2));
    res.status(201).json(newProduct);
});

// PUT update product
router.put('/:name', (req, res) => {
    const products = JSON.parse(readFileSync(dataPath));
    const index = products.findIndex(p => p.name.toLowerCase() === req.params.name.toLowerCase());
    if (index === -1) return res.status(404).json({ message: 'Product not found' });
    products[index] = { ...products[index], ...req.body };
    writeFileSync(dataPath, JSON.stringify(products, null, 2));
    res.json(products[index]);
});

// DELETE product
router.delete('/:name', (req, res) => {
    const products = JSON.parse(readFileSync(dataPath));
    const index = products.findIndex(p => p.name.toLowerCase() === req.params.name.toLowerCase());
    if (index === -1) return res.status(404).json({ message: 'Product not found' });
    products.splice(index, 1);
    writeFileSync(dataPath, JSON.stringify(products, null, 2));
    res.status(200).json({ message: 'Product deleted successfully' });
});

export default router;
