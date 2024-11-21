function filtrarRecursos() {
    const searchValue = document.getElementById("buscar").value.toLowerCase();
    const filtros = {
        matematicas: document.getElementById("matematicas").checked,
        ingles: document.getElementById("ingles").checked,
        historia: document.getElementById("historia").checked
    };

    document.querySelectorAll(".recurso").forEach(recurso => {
        const title = recurso.querySelector("h2").textContent.toLowerCase();
        const category = recurso.getAttribute("data-category");

        // Verifica si el título coincide con el término de búsqueda
        const matchesSearch = title.includes(searchValue);

        // Verifica si el recurso coincide con alguno de los filtros seleccionados
        const isFiltered = Object.values(filtros).some(value => value === true);
        const matchesFilter = !isFiltered || filtros[category];

        // Muestra u oculta el recurso dependiendo de los filtros
        recurso.style.display = matchesSearch && matchesFilter ? "block" : "none";
    });
}
function limpiarFiltro() {
    document.getElementById("searchInput").value = ""; // Limpia el campo de búsqueda
    document.getElementById("resultados").innerHTML = ""; // Opcional: limpia los resultados
}
function redirigirAReservas() {
    window.location.href = "./reservas.html";
}




/*FORO*/
function mostrarFormulario() {
    document.getElementById('formularioModal').style.display = 'block';
}

document.getElementById('nuevoTemaForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío automático del formulario

    const tituloTema = document.getElementById('tituloTema').value.trim();
    const autorTema = document.getElementById('autorTema').value.trim();


    const fechaHoy = new Date().toLocaleDateString();

    if (!tituloTema || !autorTema) {
        
        return;
    }

    // Crear una nueva fila
    const nuevaFila = document.createElement('tr');
    nuevaFila.innerHTML = `
        <td><a href="#">${tituloTema}</a></td>
        <td>${fechaHoy} - ${autorTema}</td>
        <td>0</td>
    `;

    // Agregar la nueva fila al final de la tabla
    document.querySelector('tbody').appendChild(nuevaFila);

    // Mostrar mensaje de agradecimiento
    mostrarMensajeAgradecimiento();

    // Limpiar el formulario y cerrar el modal
    document.getElementById('nuevoTemaForm').reset();
    cerrarFormulario();
});


function cerrarFormulario() {
    document.getElementById('formularioModal').style.display = 'none';
}

function mostrarMensajeAgradecimiento() {
    // Crear un elemento div para el mensaje
    const mensajeDiv = document.createElement('div');
    mensajeDiv.textContent = "¡Gracias! El tema ha sido creado exitosamente.";
    mensajeDiv.style.position = 'fixed';
    mensajeDiv.style.top = '140px';
    mensajeDiv.style.right = '20px';
    mensajeDiv.style.backgroundColor = '#4CAF50';
    mensajeDiv.style.color = 'white';
    mensajeDiv.style.padding = '10px 20px';
    mensajeDiv.style.borderRadius = '5px';
    mensajeDiv.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.2)';
    mensajeDiv.style.zIndex = '1000';

    // Agregar el mensaje al body
    document.body.appendChild(mensajeDiv);

    // Eliminar el mensaje después de 3 segundos
    setTimeout(() => {
        mensajeDiv.remove();
    }, 3000);
}


