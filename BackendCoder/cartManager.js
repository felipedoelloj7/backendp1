const fs = require('fs').promises;

class CartManager {
  constructor(path) {
    this.carts = [];
    this.cartIdCounter = 1;
    this.path = path;
    // cargar carritos desde el archivo al inicializar la instancia
    this.loadCarts();
  }

  async createCart(newCart) {
    try {
      // Asegúrate de asignar un ID único al nuevo carrito
      newCart.id = this.cartIdCounter++;
      this.carts.push(newCart);
      console.log(`Carrito creado con ID ${newCart.id}.`);
      // guardar el nuevo carrito en el archivo de forma asíncrona
      await this.saveCarts();
    } catch (error) {
      console.error('Error al crear carrito:', error.message);
    }
  }

  async getCartById(cartId) {
    await this.loadCarts();
    const foundCart = this.carts.find(cart => cart.id == cartId);

    if (foundCart) {
      return foundCart;
    } else {
      console.log(`Carrito con ID ${cartId} no encontrado. Not found.`);
      return null;
    }
  }

  async addProductToCart(cartId, productId, quantity, productManager) {
    try {
      // cargar el carrito desde el archivo de forma asíncrona
      await this.loadCarts();
      
      // buscar el carrito por ID
      const foundCart = this.carts.find(cart => cart.id == cartId);

      if (foundCart) {
        // buscar el producto por ID
        const product = await productManager.getProductById(productId);

        if (product) {
          // verificar si el producto ya está en el carrito
          const existingProduct = foundCart.products.find(p => p.id == productId);

          if (existingProduct) {
            // incrementar la cantidad si el producto ya está en el carrito
            existingProduct.quantity += quantity;
          } else {
            // agregar el producto al carrito con la cantidad especificada
            foundCart.products.push({ id: productId, quantity });
          }

          // guardar el carrito actualizado en el archivo de forma asíncrona
          await this.saveCarts();
          console.log(`Producto con ID ${productId} agregado al carrito con ID ${cartId}.`);
        } else {
          console.log(`Producto con ID ${productId} no encontrado. No se pudo agregar al carrito.`);
        }
      } else {
        console.log(`Carrito con ID ${cartId} no encontrado. No se pudo agregar el producto.`);
      }
    } catch (error) {
      console.error('Error al agregar producto al carrito:', error.message);
    }
  }

  // func para cargar carritos desde el archivo al inicializar
  async loadCarts() {
    try {
      const fileContent = await fs.readFile(this.path, 'utf8');
      this.carts = JSON.parse(fileContent);
    } catch (error) {
      // manejar el error, por ejemplo, si el archivo no existe
      console.error('Error al cargar carritos:', error.message);
    }
  }

  // func para guardar carritos en el archivo
  async saveCarts() {
    try {
      const dataToWrite = JSON.stringify(this.carts, null, 2);
      await fs.writeFile(this.path, dataToWrite, 'utf8');
    } catch (error) {
      // manejar el error, por ejemplo, si no se puede escribir en el archivo
      console.error('Error al guardar carritos:', error.message);
    }
  }
}

module.exports = CartManager;
