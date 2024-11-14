// Agrega un evento 'click' al botón de enviar mensaje, que llama a la función 'postMessage'
document.getElementById('sendMessage').addEventListener('click', postMessage);

// Función que se ejecuta cuando se hace clic en el botón de enviar mensaje
function postMessage() {
    // Obtiene el valor del campo 'Nombre' y elimina los espacios en blanco antes/después del texto
    const name = document.getElementById('name').value.trim();
    
    // Obtiene el valor del campo de texto principal y elimina los espacios en blanco
    const messageText = document.getElementById('mainMessage').value.trim();
    
    // Obtiene el párrafo donde se mostrará el mensaje de error del nombre
    const nameError = document.getElementById('nameError');

    // Validación: si el campo 'Nombre' está vacío, muestra el mensaje de error y detiene la ejecución
    if (name === "") {
        nameError.style.display = "block";  // Muestra el mensaje de error
        return;  // Detiene la ejecución de la función
    } else {
        nameError.style.display = "none";  // Oculta el mensaje de error si el nombre es válido
    }

    // Si el mensaje de texto está vacío, no hace nada
    if (messageText === "") return;

    // Obtiene el contenedor donde se mostrarán los mensajes
    const messageBoard = document.getElementById('messageBoard');
    
    // Crea un nuevo 'div' para el mensaje que se va a agregar
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');  // Añade una clase 'message' para estilo

    // Crea un párrafo que contendrá el nombre y el mensaje del usuario
    const messageContent = document.createElement('p');
    messageContent.innerHTML = `<strong>${name}:</strong> ${messageText}`;  // Muestra el nombre en negrita y el mensaje
    messageDiv.appendChild(messageContent);  // Agrega el párrafo al div del mensaje

    // Crea un botón 'Responder' para permitir respuestas al mensaje
    const replyButton = document.createElement('button');
    replyButton.textContent = 'Responder';  // El texto del botón
    replyButton.classList.add('reply-btn');  // Añade una clase 'reply-btn' para estilo
    // Al hacer clic en el botón 'Responder', llama a la función 'createReplyForm' para generar un formulario de respuesta
    replyButton.onclick = function() { createReplyForm(messageDiv); };
    messageDiv.appendChild(replyButton);  // Agrega el botón de respuesta al mensaje

    // Agrega el mensaje completo al contenedor de mensajes
    messageBoard.appendChild(messageDiv);

    // Limpia los campos de entrada de texto después de enviar el mensaje
    document.getElementById('name').value = "";
    document.getElementById('mainMessage').value = "";
}

// Función que crea un formulario de respuesta para un mensaje específico
function createReplyForm(parentDiv) {
    // Crea un div para el formulario de respuesta
    const replyForm = document.createElement('div');
    replyForm.classList.add('reply');  // Añade una clase 'reply' para estilo

    // Crea un campo de entrada para el nombre en la respuesta
    const replyNameInput = document.createElement('input');
    replyNameInput.type = 'text';  // El tipo de campo es texto
    replyNameInput.placeholder = "Escribe tu nombre...";  // Texto de marcador en el campo
    replyForm.appendChild(replyNameInput);  // Añade el campo de nombre al formulario de respuesta

    // Crea un párrafo para mostrar el mensaje de error si el nombre está vacío en la respuesta
    const nameError = document.createElement('p');
    nameError.classList.add('error-message');  // Clase para el estilo del error
    nameError.style.color = 'red';  // Color rojo para el mensaje de error
    nameError.style.display = 'none';  // Inicialmente oculto
    nameError.textContent = "El campo 'Nombre' es obligatorio.";  // Mensaje de error
    replyForm.appendChild(nameError);  // Añade el mensaje de error al formulario de respuesta

    // Crea un campo de texto para escribir la respuesta
    const replyInput = document.createElement('textarea');
    replyInput.placeholder = "Escribe tu respuesta...";  // Texto de marcador en el campo de respuesta
    replyForm.appendChild(replyInput);  // Añade el campo de respuesta al formulario

    // Crea un botón para enviar la respuesta
    const sendReplyBtn = document.createElement('button');
    sendReplyBtn.textContent = 'Enviar Respuesta';  // El texto del botón de enviar respuesta
    // Al hacer clic en el botón de enviar, se valida y guarda la respuesta
    sendReplyBtn.onclick = function() {
        const replyText = replyInput.value.trim();  // Obtiene y limpia el texto de la respuesta
        const replyName = replyNameInput.value.trim();  // Obtiene y limpia el nombre de la respuesta

        // Validación: si el campo 'Nombre' de la respuesta está vacío, muestra el mensaje de error
        if (replyName === "") {
            nameError.style.display = "block";  // Muestra el mensaje de error
            return;  // Detiene la ejecución si el campo 'Nombre' está vacío
        } else {
            nameError.style.display = "none";  // Oculta el mensaje si el nombre es válido
        }

        // Si el texto de la respuesta no está vacío, crea un nuevo mensaje en la cadena de respuestas
        if (replyText !== "") {
            const replyMessage = document.createElement('p');
            replyMessage.innerHTML = `<strong>${replyName}:</strong> ${replyText}`;  // Muestra el nombre y la respuesta

            // Crea un nuevo div para el formulario de respuestas anidadas
            const nestedReplyForm = document.createElement('div');
            nestedReplyForm.classList.add('nested-reply');  // Añade una clase para estilo de respuestas anidadas
            nestedReplyForm.appendChild(replyMessage);  // Añade el mensaje de respuesta al div

            // Crea un botón 'Responder' dentro de la respuesta para permitir respuestas anidadas
            const nestedReplyButton = document.createElement('button');
            nestedReplyButton.textContent = 'Responder';  // Texto del botón de responder
            nestedReplyButton.classList.add('reply-btn');  // Añade una clase para estilo
            // Al hacer clic, se vuelve a crear un formulario de respuesta anidado
            nestedReplyButton.onclick = function() {
                createReplyForm(nestedReplyForm);
            };
            nestedReplyForm.appendChild(nestedReplyButton);  // Añade el botón al formulario de respuesta anidado

            replyForm.appendChild(nestedReplyForm);  // Añade la respuesta al formulario de respuesta
            replyInput.value = "";  // Limpia el campo de texto de la respuesta
            replyNameInput.value = "";  // Limpia el campo de nombre de la respuesta
            replyInput.style.display = "none";  // Oculta el campo de texto después de enviar
            replyNameInput.style.display = "none";  // Oculta el campo de nombre después de enviar
            sendReplyBtn.style.display = "none";  // Oculta el botón de enviar después de enviar
        }
    };
    replyForm.appendChild(sendReplyBtn);  // Añade el botón de enviar al formulario

    parentDiv.appendChild(replyForm);  // Añade el formulario de respuesta al mensaje padre
}
