

// Cuando hago click .button, .nav TOGGLE 'activo' 

const button = document.querySelector('.button')
const nav    = document.querySelector('.nav')

button.addEventListener('click',()=>{
    nav.classList.toggle('activo')
})