const ProductManager = require('../productManager');
const CartManager = require('../cartManager');
const productManager = new ProductManager('./data/productos.json');
const cartManager = new CartManager('./data/carritos.json');

const cartsController = {
  createCart: async (req, res) => {
    try {
      // Implementa la lógica para crear un nuevo carrito
      const newCart = req.body;
      await cartManager.createCart(newCart);
      res.status(201).send('Carrito creado correctamente');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },

  getCartById: async (req, res) => {
    try {
      // Implementa la lógica para obtener un carrito por ID
      const cartId = req.params.cid;
      const cart = await cartManager.getCartById(cartId);

      if (cart) {
        res.json(cart);
      } else {
        res.status(404).send(`Carrito con ID ${cartId} no encontrado`);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },

  addProductToCart: async (req, res) => {
    try {
      // Implementa la lógica para agregar un producto a un carrito
      const cartId = req.params.cid;
      const productId = req.params.pid;
      const quantity = req.body.quantity;

      await cartManager.addProductToCart(cartId, productId, quantity, productManager);
      res.send('Producto agregado al carrito correctamente');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error interno del servidor');
    }
  },
};

module.exports = cartsController;

