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
