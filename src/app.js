import express from "express";
import productsRouter from './routes/productos.js';
import cartsRouter from './routes/carritos.js';
import __dirname from "./utils.js";

const app = express();
const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.use((req,res,next) => {
	console.log(`Peticion ${req.method} en ${req.url}`);
	next();
});

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(__dirname + '/public'));

app.use('/api/productos', productsRouter);
app.use('/api/carrito', cartsRouter);

// Middleware para las rutas no existentes
app.use((req, res, next) => {
    res.status(404).send({error: -2, description: `Ruta ${req.url} método ${req.method} no implementada`});
});