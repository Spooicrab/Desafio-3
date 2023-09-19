import express from "express";
import { ProductManager } from './GestorProducto.js';

const srv = express();
// srv.use(express.json());
// srv.use(express.urlencoded({ extended: true }));

srv.get("/products", async (req, res) => {
  try {
    const Productos = await ProductManager.getProducts(req.query);
    Productos.length
      ? res.status(200).json(Productos)
      : res.status(200).json({ message: "Producto No encontrado" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

srv.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const Producto = await ProductManager.getProductbyID(+id);
    Producto
      ? res.status(200).json({ Producto })
      : res.status(400).json("Id no encontrado");
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

srv.listen(8080, () => {
  console.log("Estoy andando");
});

//
