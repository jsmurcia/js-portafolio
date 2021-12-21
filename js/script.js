const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
// regular phrase
const expresiones = {
	usuario: /^[a-zA-Z0-9\_\-]{1,200}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^\d{7,14}$/ // 7 a 14 numeros.
}
//const validation
const estado={
	usuario:false,
	nombre:false,
	correo:false,
	telefono:false
}
//validation of value in all input 
const validarFormulario = (e)=>{
	switch(e.target.name){
		case 'usuario':
			if (e.target.value!==''){
				validarCampo(expresiones.usuario,e.target,"usuario");
			}else{
				document.querySelector(".formulario__validacion-estado");
			}
			break;
		case 'nombre':
			validarCampo(expresiones.nombre,e.target,"nombre")
		break;
		case 'password':
			validarCampo(expresiones.password,e.target,"password");
			validarPassword();
		break;
		case 'password2':
			validarPassword();
		break;
		case 'correo':
			validarCampo(expresiones.correo,e.target,"correo");
		break;
		case 'telefono':
			validarCampo(expresiones.telefono,e.target,"telefono");
		break;
	}
}
//-------------- validation value input-------------
const validarCampo=(expresion,input,value)=>{
	if(expresion.test(input.value)){
	
		document.getElementById(`grupo__${value}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${value}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${value} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${value} i`).classList.remove('fa-times-circle')
		document.querySelector(`#grupo__${value} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		estado[value]=true
	}else{
	
		document.getElementById(`grupo__${value}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${value}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${value} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${value} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${value} .formulario__input-error`). classList.add('formulario__input-error-activo');
		estado[value]=false
	};
}
//--------------Event Listener input-------------
inputs.forEach((input)=>{
	input.addEventListener('keyup',validarFormulario);
	input.addEventListener('blur',validarFormulario);
});
//--------------Event Listener button-------------
formulario.addEventListener('submit',(e)=>{
	e.preventDefault();
    const terminos=document.getElementById('terminos')
	if (estado.usuario && estado.nombre  && estado.correo && estado.telefono && terminos.checked){
		formulario.reset();
		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(()=>{
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		},5000)
		document.querySelectorAll('.formulario__grupo-correcto').forEach((event)=>{
			event.classList.remove('formulario__grupo-correcto')
		})
		document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
	}
	else{
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
	}

})
