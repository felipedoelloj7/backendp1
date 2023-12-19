const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');

// ruta raíz GET /api/products
router.get('/', productsController.getProducts);

// ruta GET /api/products/:pid
router.get('/:pid', productsController.getProductById);

// ruta raíz POST /api/products
router.post('/', (req, res) => {
  // llamar al controlador y pasarle la instancia de io para emitir eventos de WebSocket
  productsController.addProduct(req, res, req.app.get('io'));
});

// ruta PUT /api/products/:pid
router.put('/:pid', productsController.updateProduct);

// ruta DELETE /api/products/:pid
router.delete('/:pid', (req, res) => {
  // lamar al controlador y pasarle la instancia de io para emitir eventos de WebSocket
  productsController.deleteProduct(req, res, req.app.get('io'));
});

module.exports = router;

