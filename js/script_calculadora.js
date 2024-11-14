document.getElementById('calculateBtn').addEventListener('click', calculateBudget);

function calculateBudget() {
    // Obtener todos los checkboxes de las materias
    const courses = document.querySelectorAll('.course:checked');
    let total = 0;

    // Sumar el valor de cada curso seleccionado
    courses.forEach(function(course) {
        total += parseInt(course.value);
    });

    // Validación para asegurarse de que se seleccionó al menos una materia
    if (total === 0) {
        alert("Por favor, selecciona al menos una materia.");
        return;
    }

    // Mostrar el total en el HTML
    document.getElementById('total').textContent = `$${total}`;
}
