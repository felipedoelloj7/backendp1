const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/cartsController');

router.post('/', cartsController.createCart);
router.get('/:cid', cartsController.getCartById);
router.post('/:cid/product/:pid', cartsController.addProductToCart);

module.exports = router;
