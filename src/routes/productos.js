import express from "express";
import Productos from "../services/productos.js";

const router = express.Router();
const productsService = new Productos();

let admin = true;

// Middleware para validar acceso
const validateAccess = (req,res,next) => {
	if(!admin) return res.send({error: -1, description: `Ruta ${req.url} método ${req.method} no autorizado`});
	next();
}

router.get('/', async(req, res) => {
	let products = await productsService.getAllProducts();	
	if (products.length == 0) return res.send({error: "No hay productos cargados"});
	res.send(products);
});

router.get('/:id', async(req, res) => {
	let {id} = req.params;
	let product = await productsService.getProductById(id);
	if (!product) return res.send({error: "No se encontro el producto"});
	res.send(product);
});

router.post('/', validateAccess, async(req, res) => {
	let {nombre, descripcion, codigo, foto, precio, stock} = req.body;
	let id = Math.floor(Math.random() * 1000 + 1);
	let timestamp = Date.now();
	await productsService.save({id, timestamp, nombre, descripcion, codigo, foto, precio, stock});
	res.send({message: "Producto agregado con exito"});
});

router.put('/:id', validateAccess, async(req, res) => {
	let {id} = req.params;
	let {nombre, descripcion, codigo, foto, precio, stock} = req.body;
	let timestamp = Date.now();
	let resUpdate = await productsService.update({id, timestamp, nombre, descripcion, codigo, foto, precio, stock});
	if(!resUpdate) return res.send({message: "El producto no existe"});
	res.send({message: "Producto actualizado con exito"});
});

router.delete('/:id', validateAccess, async(req, res) => {
	let {id} = req.params;
	let resDelete = await productsService.delete(id);
	if(!resDelete) return res.send({message: "El producto no existe"});
	res.send({message: "Producto eliminado con exito"});
});

export default router;