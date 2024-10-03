document.addEventListener('DOMContentLoaded', () => {
    // Mostrar el nombre del usuario
    const username = localStorage.getItem('username') || 'Invitado';
    document.getElementById('user-info').textContent = `Bienvenido: ${username}`;

    // Obtener el ID del carrito seleccionado
    const orderId = localStorage.getItem('selectedOrderId');

    // Obtener el carrito del usuario usando el ID almacenado
    fetch(`https://fakestoreapi.com/carts/user/${localStorage.getItem('userId')}`)
        .then(res => res.json())
        .then(cartData => {
            // Encontrar el carrito seleccionado
            const selectedCart = cartData.find(cart => cart.id == orderId);
            
            if (selectedCart) {
                // Mostrar información del pedido
                document.getElementById('order-date').value = new Date(selectedCart.date).toLocaleDateString('es-ES');
                document.getElementById('order-number').value = selectedCart.id;
                document.getElementById('client-name').value = username; // O usa el nombre del cliente si está disponible

                // Mostrar productos en la tabla
                const productDetailsTableBody = document.querySelector('#product-details-table tbody');
                let total = 0;

                // Iterar sobre los productos del carrito seleccionado
                selectedCart.products.forEach(product => {
                    // Obtener detalles del producto usando la API
                    fetch(`https://fakestoreapi.com/products/${product.productId}`)
                        .then(res => res.json())
                        .then(productData => {
                            const subtotal = product.quantity * productData.price;
                            total += subtotal;

                            // Crear una fila para la tabla
                            const row = `
                                <tr>
                                    <td>${productData.title}</td>
                                    <td>${product.quantity}</td>
                                    <td>$${productData.price.toFixed(2)}</td>
                                    <td>$${subtotal.toFixed(2)}</td>
                                </tr>
                            `;
                            productDetailsTableBody.innerHTML += row;

                            // Mostrar total al finalizar todas las promesas
                            document.getElementById('total-value').textContent = `$${total.toFixed(2)}`;
                        });
                });
            } else {
                alert('No se encontraron los detalles del pedido.');
            }
        })
        .catch(error => {
            console.error('Error al obtener los datos del carrito:', error);
        });
});
