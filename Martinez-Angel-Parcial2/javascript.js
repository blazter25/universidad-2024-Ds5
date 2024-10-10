// Función para generar un número aleatorio
function generarNumeroAleatorio() {
    return Math.floor(Math.random() * 99) + 1;
}

// Asegurándonos de que el DOM esté cargado antes de ejecutar el código
window.onload = function() {
    const generarBtn = document.getElementById('generar');
    const ascBtn = document.getElementById('ascendente');
    const descBtn = document.getElementById('descendente');
    const numerosList = document.getElementById('numeros');

    let numeros = []; // Declaramos la variable numeros como un array de números

    // Verificando que los elementos existan antes de usarlos
    if (generarBtn && ascBtn && descBtn && numerosList) {
        generarBtn.addEventListener('click', function() {
            const nuevoNumero = generarNumeroAleatorio();
            numeros.push(nuevoNumero);
            renderizarNumeros();
        });

        ascBtn.addEventListener('click', function() {
            numeros.sort(function(a, b) { return a - b; });
            renderizarNumeros();
        });

        descBtn.addEventListener('click', function() {
            numeros.sort(function(a, b) { return b - a; });
            renderizarNumeros();
        });

        function renderizarNumeros() {
            numerosList.innerHTML = '';
            let columnCount = Math.ceil(numeros.length / 10);
            for (let i = 0; i < columnCount; i++) {
                const ul = document.createElement('ul');
                ul.classList.add('column');
                for (let j = 0; j < 10; j++) {
                    let index = i * 10 + j;
                    if (index < numeros.length) {
                        const li = document.createElement('li');
                        li.textContent = numeros[index].toString().padStart(2, '0');
                        ul.appendChild(li);
                    }
                }
                numerosList.appendChild(ul);
            }
        }
    } else {
        console.error('Los elementos HTML no se encontraron.');
    }
};
