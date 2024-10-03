document.addEventListener('DOMContentLoaded', function() {
    const userId = localStorage.getItem('userId');
    const ordersTableBody = document.querySelector('#orders-table tbody');

    fetch(`https://fakestoreapi.com/users/${userId}`)
        .then(res => res.json())
        .then(userData => {
            const username = userData.username;
            document.getElementById('user-info').textContent = `Bienvenido: ${username}`; 
            localStorage.setItem('username', username);
            // Ahora obtener el carrito del usuario usando el userId
            return fetch(`https://fakestoreapi.com/carts/user/${userId}`);
        })
        .then(res => res.json())
        .then(cartData => {
            displayCartItems(cartData); // Mostrar los pedidos en la tabla
        })
        .catch(error => {
            console.error('Error al obtener los datos del carrito o del usuario:', error);
        });

    // Función para mostrar los productos en la tabla
    const displayCartItems = (cartData) => {
        ordersTableBody.innerHTML = ''; // Limpiar cualquier contenido anterior

        // Asegúrate de que cartData tenga productos
        if (Array.isArray(cartData) && cartData.length > 0) {
            cartData.forEach((cart) => {
                const row = document.createElement('tr');

                const numberCell = document.createElement('td');
                numberCell.textContent = cart.id;

                const dateCell = document.createElement('td');
                const date = new Date(cart.date); // Asegúrate de que `cart.date` sea la propiedad correcta
                dateCell.textContent = date.toLocaleDateString('es-ES'); // Cambia el locale según lo que necesites

                const actionsCell = document.createElement('td');
                const viewButton = document.createElement('a');
                viewButton.textContent = 'Ver';
                viewButton.addEventListener('click', () => {
                    localStorage.setItem('selectedOrderId', cart.id);
                    window.location.href='detallePedido.html';
                });

                actionsCell.appendChild(viewButton);
                row.appendChild(numberCell);
                row.appendChild(dateCell);
                row.appendChild(actionsCell);

                ordersTableBody.appendChild(row);
            });
        } else {
            const emptyRow = document.createElement('tr');
            const emptyCell = document.createElement('td');
            emptyCell.textContent = 'No hay pedidos en el carrito.';
            emptyCell.colSpan = 3;
            emptyRow.appendChild(emptyCell);
            ordersTableBody.appendChild(emptyRow);
        }
    };
});
