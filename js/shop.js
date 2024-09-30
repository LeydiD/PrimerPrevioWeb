document.addEventListener('DOMContentLoaded', () => {
    const productList = document.getElementById('product-list');
    const searchButton = document.getElementById('search-button');
    const searchBar = document.getElementById('search-bar');
    const categoryButtons = document.querySelectorAll('.category-btn');

    // Función para mostrar los productos en el DOM
    const displayProducts = (products) => {
        productList.innerHTML = '';
        products.forEach(product => {
            const productCard = `
                <div class="product-card">
                    <img src="${product.image}" alt="${product.title}">
                    <h3>${product.title}</h3>
                    <p>${product.description}</p>
                    <div class="price">$${product.price}</div>
                    <button class="add-button" data-product-id="${product.id}">Add</button>
                </div>
            `;
            productList.innerHTML += productCard;
        });

        // Añadir evento para cada botón de "Add"
        document.querySelectorAll('.add-button').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.getAttribute('data-product-id');

                // Obtener producto de la API y añadirlo al carrito
                fetch(`https://fakestoreapi.com/products/${productId}`)
                    .then(res => res.json())
                    .then(product => {
                        addToCart(product);
                    });
            });
        });
    };

    // Función para añadir productos al carrito
    const addToCart = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Verificar si el producto ya está en el carrito
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            product.quantity = 1;
            cart.push(product);
        }

        // Guardar el carrito actualizado en localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.title} añadido al carrito.`);
    };

    // Obtener todos los productos al cargar la página
    fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(json => displayProducts(json));

    // Filtrar por categoría
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            fetch(`https://fakestoreapi.com/products/category/${category}`)
                .then(res => res.json())
                .then(json => displayProducts(json));
        });
    });

    // Funcionalidad del buscador
    searchButton.addEventListener('click', () => {
        const query = searchBar.value;
        fetch(`https://fakestoreapi.com/products`)
            .then(res => res.json())
            .then(json => {
                const filteredProducts = json.filter(product => product.title.toLowerCase().includes(query.toLowerCase()));
                displayProducts(filteredProducts);
            });
    });
});
