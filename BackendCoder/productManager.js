const fs = require('fs').promises;

class ProductManager {
  constructor(path, io) {
    this.products = [];
    this.productIdCounter = 1;
    this.path = path;
    this.io = io; // Se agrega el objeto io para emitir eventos de WebSocket
    // cargar productos desde el archivo al inicializar la instancia
    this.loadProducts();
  }

  async addProduct(newProduct) {
    try {
      if (
        !newProduct.title ||
        !newProduct.description ||
        !newProduct.price ||
        !newProduct.thumbnail ||
        !newProduct.code ||
        !newProduct.stock
      ) {
        console.log('Todos los campos son obligatorios. No se pudo agregar el producto.');
        return;
      }

      const isCodeDuplicate = this.products.some(product => product.code === newProduct.code);
      if (isCodeDuplicate) {
        console.log(`Ya existe un producto con el código ${newProduct.code}. No se pudo agregar el producto.`);
        return;
      }

      const productToAdd = {
        id: this.productIdCounter++,
        ...newProduct,
      };

      this.products.push(productToAdd);
      console.log(`Producto "${productToAdd.title}" agregado con ID ${productToAdd.id}.`);

      // Emitir evento de WebSocket al agregar un producto
      this.io.emit('productAdded', productToAdd);

      // guardar el nuevo producto en el archivo de forma asíncrona
      await this.saveProducts();
    } catch (error) {
      console.error('Error al agregar producto:', error.message);
    }
  }

  async deleteProduct(productId) {
    try {
      // leer el archivo de forma asíncrona, buscar el producto por ID y eliminarlo
      await this.loadProducts();
      const indexToDelete = this.products.findIndex(product => product.id === productId);

      if (indexToDelete !== -1) {
        const deletedProduct = this.products.splice(indexToDelete, 1)[0];

        // Emitir evento de WebSocket al eliminar un producto
        this.io.emit('productDeleted', deletedProduct);

        // guardar los productos actualizados en el archivo de forma asíncrona
        await this.saveProducts();

        console.log(`Producto con ID ${productId} eliminado.`);
      } else {
        console.log(`Producto con ID ${productId} no encontrado. No se pudo eliminar.`);
      }
    } catch (error) {
      console.error('Error al eliminar producto:', error.message);
    }
  }

  async getProducts(limit) {
    // leer el archivo de forma asíncrona y devolver todos los productos
    await this.loadProducts();
  
    if (limit) {
      return this.products.slice(0, limit);
    } else {
      return this.products;
    }
  }
  

  async getProductById(productId) {
    // leer el archivo de forma asíncrona, buscar el prod por ID
    await this.loadProducts();
    const foundProduct = this.products.find(product => product.id === productId);

    if (foundProduct) {
      return foundProduct;
    } else {
      console.log(`Producto con ID ${productId} no encontrado. Not found.`);
      return null;
    }
  }

  async updateProduct(productId, updatedProduct) {
    try {
      // leer el archivo de forma asíncrona, buscar el producto por ID y actualizarlo
      await this.loadProducts();
      const indexToUpdate = this.products.findIndex(product => product.id === productId);

      if (indexToUpdate !== -1) {
        // mantener el ID y actualizar el resto de las propiedades
        this.products[indexToUpdate] = {
          id: productId,
          ...updatedProduct,
        };

        // guardar los productos actualizados en el archivo de forma asíncrona
        await this.saveProducts();

        console.log(`Producto con ID ${productId} actualizado.`);
      } else {
        console.log(`Producto con ID ${productId} no encontrado. No se pudo actualizar.`);
      }
    } catch (error) {
      console.error('Error al actualizar producto:', error.message);
    }
  }

  async deleteProduct(productId) {
    try {
      // leer el archivo de forma asíncrona, buscar el producto por ID y eliminarlo
      await this.loadProducts();
      const indexToDelete = this.products.findIndex(product => product.id === productId);

      if (indexToDelete !== -1) {
        // eliminar el producto del array
        this.products.splice(indexToDelete, 1);

        // guardar los productos actualizados en el archivo de forma asíncrona
        await this.saveProducts();

        console.log(`Producto con ID ${productId} eliminado.`);
      } else {
        console.log(`Producto con ID ${productId} no encontrado. No se pudo eliminar.`);
      }
    } catch (error) {
      console.error('Error al eliminar producto:', error.message);
    }
  }

  // func para cargar productos desde el archivo al inicializar
  async loadProducts() {
    try {
      const fileContent = await fs.readFile(this.path, 'utf8');
      this.products = JSON.parse(fileContent);
    } catch (error) {
      // manejar el error, por ejemplo, si el archivo no existe
      console.error('Error al cargar productos:', error.message);
    }
  }

  // func para guardar productos en el archivo
  async saveProducts() {
    try {
      const dataToWrite = JSON.stringify(this.products, null, 2);
      await fs.writeFile(this.path, dataToWrite, 'utf8');
    } catch (error) {
      // manejar el error, por ejemplo, si no se puede escribir en el archivo
      console.error('Error al guardar productos:', error.message);
    }
  }
}

// exportar la clase para usarla en otros archivos
module.exports = ProductManager;

// instancia de ProductManager con la ruta del archivo
const productManager = new ProductManager('./data/productos.json');

// agregar productos ficticios (mouse gaming)
const Fruta1 = {
  title: 'Manzana',
  description: 'Manzana natural',
  price: 12,
  thumbnail: 'ruta/imagen1.jpg',
  code: '4005',
  stock: 22,
};

const Fruta2 = {
  title: 'Pera',
  description: 'Pera natural',
  price: 150,
  thumbnail: 'ruta/imagen2.jpg',
  code: 'LSLV2',
  stock: 15,
};

// agregar los productos al ProductManager
productManager.addProduct(Fruta1);
productManager.addProduct(Fruta2);

// exportar la instancia de ProductManager
module.exports = productManager;




  
  
  
  