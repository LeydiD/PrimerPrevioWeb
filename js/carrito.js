document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username') || 'Invitado';
    document.getElementById('user-info').textContent = `Bienvenido: ${username}`;

    // Cargar productos del carrito desde localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    displayCartProducts(cart);

    function displayCartProducts(products) {
        const ordersTableBody = document.querySelector('#orders-table tbody');
        ordersTableBody.innerHTML = '';

        products.forEach((product, index) => {
            const subtotal = product.quantity * product.price;
            const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${new Date().toLocaleDateString()}</td> <!-- Fecha de solicitud -->
                    <td><a href="#" class="view-order" data-index="${index}">ver</a></td>
                </tr>
            `;
            ordersTableBody.innerHTML += row;
        });

        // Añadir evento de click para los enlaces "ver"
        document.querySelectorAll('.view-order').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const index = e.target.getAttribute('data-index');
                const selectedOrder = products[index];
                // Guardar el pedido seleccionado en localStorage o pasarlo por URL
                localStorage.setItem('selectedOrder', JSON.stringify(selectedOrder));
                window.location.href = 'detallePedido.html'; // Redirigir a la página de detalles
            });
        });
    }
});
