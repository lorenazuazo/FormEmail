/**
* @param {Event} e
*/

//variables
const btnEnviar = document.querySelector('#enviar');
const email = document.querySelector('#email');
const asunto = document.querySelector('#asunto');
const mensaje = document.querySelector('#mensaje');
const btnReset = document.querySelector('#resetBtn');
const formulario = document.querySelector('#enviar-mail');
const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

//enventListener
eventListener();
function eventListener(){
    document.addEventListener('DOMContentLoaded',iniciarApp);
    //campos del formulario
    email.addEventListener('blur',validarForm);
    asunto.addEventListener('blur',validarForm);
    mensaje.addEventListener('blur',validarForm);

    //reinicia el formulario
    btnReset.addEventListener('click',resetForm);
    
    //Enviar email
    formulario.addEventListener('submit',enviarEmail);
}

//funciones
function iniciarApp(){
    btnEnviar.disabled = true;
    btnEnviar.classList.add('cursor-not-allowed','opacity-50');   
};

function validarForm(e){
    
     if(e.target.value.length > 0){
        const error = document.querySelector('p.error');
        if(error){error.remove();}; 
        e.target.classList.remove('border','border-red-500');
        e.target.classList.add('border','border-green-500');       
    }else{
        //e.target.style.borderBottomColor = 'red';
        e.target.classList.remove('border','border-green-500');
        e.target.classList.add('border','border-red-500');
        mostrarError('Todos los campos son obligaorios');
    };  

    if(this.type === 'email' && e.relatedTarget.id !== 'resetBtn'){
        
        if(er.test(e.target.value)){
            const error = document.querySelector('p.error');
            if(error){error.remove();};
            e.target.classList.remove('border','border-red-500');
            e.target.classList.add('border','border-green-500');
        }else{
            e.target.classList.remove('border','border-green-500');
            e.target.classList.add('border','border-red-500');
            mostrarError('El email no es valido');
        }
    }

    if(er.test(email.value) && asunto.value !== '' && mensaje.value !== ''){
        btnEnviar.disabled = false;
        btnEnviar.classList.remove('cursor-not-allowed','opacity-50');
    }    
};

function mostrarError(mensaje){
    const msjError = document.createElement('p');
    msjError.textContent = mensaje;
    msjError.classList.add('border','border-red-500','bg-red-100','text-red-500','p-3','mt-5',
    'text-center','error');
    const errores = document.querySelectorAll('.error');
    if(errores.length === 0){
        formulario.appendChild(msjError);
    };
};

//envia el email
function enviarEmail(e){
    e.preventDefault();

    //mostrar spiner
    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //despues de tres segundo ocultar el spinner
    setTimeout( () =>{
        spinner.style.display = 'none';
        //mensaje que dice que se envio correctamente
        const parrafo = document.createElement('p');
        parrafo.classList.add('border','border-green-500','bg-green-100','text-green-500','p-3','mb-5','text-center');
        parrafo.textContent = 'Mensaje enviado!!';
        formulario.insertBefore(parrafo,spinner);
        setTimeout(()=>{
            parrafo.remove();
            resetForm();
        },5000);
    },3000);
};

//funcion que resetea el formulario
function resetForm(){
    formulario.reset();
    iniciarApp();  
}

