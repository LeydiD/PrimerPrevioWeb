document.addEventListener('DOMContentLoaded', () => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartTable = document.getElementById('cart-items');
    const totalElement = document.getElementById('total');
    let total = 0;

    // Mostrar nombre del usuario
    const username = localStorage.getItem('username');
    document.querySelector('.user-info p').textContent = `Bienvenido: ${username}`;

    // Función para mostrar productos en el carrito
    const displayCartItems = () => {
        cartTable.innerHTML = ''; // Limpiar la tabla
        total = 0;

        cartItems.forEach(item => {
            const subtotal = item.price * item.quantity;
            total += subtotal;

            const row = `
                <tr>
                    <td>${item.title}</td>
                    <td>${item.quantity}</td>
                    <td>$${item.price}</td>
                    <td>$${subtotal.toFixed(2)}</td>
                </tr>
            `;
            cartTable.innerHTML += row;
        });

        totalElement.textContent = total.toFixed(2);
    };

    // Mostrar los productos del carrito al cargar la página
    displayCartItems();


    // function confirmPurchase() {
    //     alert('Compra confirmada. ¡Gracias por su compra!');
    //     localStorage.removeItem('cart');
    //     window.location.href = 'shop.html';
    // }
    
    // function seguirComprando() {
    //     window.location.href = 'shop.html';
    // }
    
});
