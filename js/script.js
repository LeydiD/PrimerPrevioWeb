document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        body: JSON.stringify({
            username: username,
            password: password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        if (data.token) {
            // Guardar el token y el username en localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', username);

            // Redirigir a la página principal (shop.html)
            window.location.href = 'shop.html';
        } else {
            // Mostrar mensaje de error en caso de credenciales incorrectas
            document.getElementById('login-message').textContent = 'Usuario o contraseña incorrectos.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('login-message').textContent = 'Hubo un problema con la solicitud.';
    });
});
