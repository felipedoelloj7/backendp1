// Conectar al servidor de Socket.IO
const socket = io();

// Escuchar el evento 'productAdded' del servidor
socket.on('productAdded', (newProduct) => {
  // Actualizar la lista de productos en el cliente con el nuevo producto
  console.log(`Nuevo producto agregado: ${JSON.stringify(newProduct)}`);
  // Agregar lógica para actualizar tu interfaz de usuario con el nuevo producto
});

// Escuchar el evento 'productDeleted' del servidor
socket.on('productDeleted', (productId) => {
  // Actualizar la lista de productos en el cliente eliminando el producto con el ID correspondiente
  console.log(`Producto eliminado con ID: ${productId}`);
  // Agregar lógica para actualizar tu interfaz de usuario al eliminar un producto
});

// Agregar lógica para enviar eventos de Socket.IO desde el cliente al servidor
// Por ejemplo, cuando se envía un formulario para agregar un nuevo producto
document.getElementById('addProductForm').addEventListener('submit', (event) => {
  event.preventDefault();
  const newProduct = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    // Otros campos del producto
  };

  // Emitir el evento 'addProduct' al servidor con el nuevo producto
  socket.emit('addProduct', newProduct);

  // Restablecer el formulario después de agregar el producto
  document.getElementById('addProductForm').reset();
});

// Agregar lógica para enviar eventos de Socket.IO desde el cliente al servidor
// Por ejemplo, cuando se hace clic en un botón para eliminar un producto
document.getElementById('deleteProductButton').addEventListener('click', () => {
  // Obtener el ID del producto que se va a eliminar (puedes usar tu propia lógica aquí)
  const productIdToDelete = document.getElementById('productIdToDelete').value;
  
  // Emitir el evento 'deleteProduct' al servidor con el ID del producto
  socket.emit('deleteProduct', productIdToDelete);
});


