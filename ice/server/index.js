import express from "express";
import animalRoutes from './routes/animal.js';

const app = express();
const port = 3000;
app.use(express.json());

app.use('/api/animals', animalRoutes);

let helloContent = `<!DOCTYPE html><html lang=\"en-us\"><head><title>INFT 2202</title></head><body><main><h1>Hello from Express</h1><p>at ${new Date()}</p></main></body></html>`;
app.get("/hello", (req, res) => {
    res.send(helloContent);
});

  

app.use(express.static('public'));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});