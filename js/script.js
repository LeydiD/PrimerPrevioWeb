document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username');
    const userInfoDiv = document.getElementById('user-info');
    userInfoDiv.innerHTML = `<p>Bienvenido: ${username}</p>`;

    // Obtener los pedidos del usuario actual
    fetch(`https://fakestoreapi.com/carts/user/${username}`)
        .then(res => res.json())
        .then(data => {
            const ordersTableBody = document.querySelector('#orders-table tbody');
            ordersTableBody.innerHTML = '';

            data.forEach((order, index) => {
                const row = `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${new Date(order.date).toLocaleDateString()}</td>
                        <td><a href="#" class="view-order" data-order-id="${order.id}">Ver</a></td>
                    </tr>
                `;
                ordersTableBody.innerHTML += row;
            });

            document.querySelectorAll('.view-order').forEach(button => {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    const orderId = e.target.getAttribute('data-order-id');
                    window.location.href = `detallePedido.html?orderId=${orderId}`;
                });
            });
        })
        .catch(error => console.error('Error al obtener los pedidos:', error));
});
