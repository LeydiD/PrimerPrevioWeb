document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username') || 'Invitado';
    document.getElementById('user-info').textContent = `Bienvenido: ${username}`;

    // Obtener el pedido seleccionado del localStorage
    const selectedOrder = JSON.parse(localStorage.getItem('selectedOrder'));

    if (selectedOrder) {
        displayOrderDetails(selectedOrder);
    } else {
        alert('No se encontró el pedido seleccionado.');
        window.location.href = 'carrito.html';
    }

    function displayOrderDetails(order) {
        const orderDetailsBody = document.querySelector('#order-details tbody');
        orderDetailsBody.innerHTML = '';
        
        const subtotal = order.quantity * order.price;
        const row = `
            <tr>
                <td>${order.title}</td>
                <td>${order.quantity}</td>
                <td>$${order.price.toFixed(2)}</td>
                <td>$${subtotal.toFixed(2)}</td>
            </tr>
        `;
        orderDetailsBody.innerHTML += row;
        
        // Mostrar total
        document.getElementById('total').textContent = `Total: $${subtotal.toFixed(2)}`;
    }
});
