const ProductManager = require('../productManager');
const productManager = new ProductManager('./data/productos.json');

const productsController = {
  getProducts: async (req, res) => {
    try {
      // Implementa la lógica para obtener todos los productos
      const { limit } = req.query;
      const products = await productManager.getProducts(parseInt(limit));
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },

  getProductById: async (req, res) => {
    try {
      // Implementa la lógica para obtener un producto por ID
      const productId = parseInt(req.params.pid);
      const product = await productManager.getProductById(productId);

      if (product) {
        res.json(product);
      } else {
        res.status(404).send(`Producto con ID ${productId} no encontrado`);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },

  addProduct: async (req, res) => {
    try {
      // Implementa la lógica para agregar un nuevo producto
      // Puedes acceder a los datos del cuerpo usando req.body
      // Recuerda validar los campos antes de agregar el producto
      const newProduct = req.body;
      await productManager.addProduct(newProduct);
      res.status(201).send('Producto agregado correctamente');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },

  updateProduct: async (req, res) => {
    try {
      // Implementa la lógica para actualizar un producto por ID
      const productId = parseInt(req.params.pid);
      const updatedProduct = req.body;
      await productManager.updateProduct(productId, updatedProduct);
      res.send('Producto actualizado correctamente');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },

  deleteProduct: async (req, res) => {
    try {
      // Implementa la lógica para eliminar un producto por ID
      const productId = parseInt(req.params.pid);
      await productManager.deleteProduct(productId);
      res.send('Producto eliminado correctamente');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },
};

module.exports = productsController;

