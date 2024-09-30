document.addEventListener('DOMContentLoaded', () => {
    // Mostrar el nombre del usuario
    const username = localStorage.getItem('username') || 'Invitado';
    document.getElementById('user-info').textContent = `Bienvenido: ${username}`;

    // Obtener los detalles del pedido de localStorage o de la URL
    const orderId = localStorage.getItem('selectedOrderId'); // Puedes usar un parámetro de URL si lo prefieres
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const selectedOrder = orders.find(order => order.id == orderId);

    if (selectedOrder) {
        // Mostrar información del pedido
        document.getElementById('order-date').value = selectedOrder.date;
        document.getElementById('order-number').value = selectedOrder.id;
        document.getElementById('client-name').value = selectedOrder.clientName || username;

        // Mostrar productos en la tabla
        const productDetailsTableBody = document.querySelector('#product-details-table tbody');
        let total = 0;

        selectedOrder.products.forEach(product => {
            const subtotal = product.quantity * product.price;
            total += subtotal;

            const row = `
                <tr>
                    <td>${product.title}</td>
                    <td>${product.quantity}</td>
                    <td>$${product.price.toFixed(2)}</td>
                    <td>$${subtotal.toFixed(2)}</td>
                </tr>
            `;
            productDetailsTableBody.innerHTML += row;
        });

        // Mostrar el total
        document.getElementById('total-value').textContent = `$${total.toFixed(2)}`;
    } else {
        alert('No se encontraron los detalles del pedido.');
    }
});
