const hmtl = document.querySelector('html');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo= document.querySelector('.app__title');
const botones= document.querySelectorAll('.app__card-button');
const inputEnfoqueMusica = document.querySelector('#alternar-musica');
const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const botonIniciarPausar= document.querySelector('#start-pause');

let tiempoTranscurridoEnSegundos = 5;
let IdIntervalo = null;

musica.loop=true;

inputEnfoqueMusica.addEventListener('change',()=> {
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

 botonCorto.addEventListener('click',()=>{
    cambiarContexto('descanso-corto');
    botonCorto.classList.add('active');
})

botonEnfoque.addEventListener('click',()=>{
    cambiarContexto('enfoque');
    botonEnfoque.classList.add('active');
})

botonLargo.addEventListener('click',()=>{
    cambiarContexto('descanso-largo');
    botonLargo.classList.add('active');
})

 function cambiarContexto(contexto){

    botones.forEach(function(contexto){
        contexto.classList.remove('active');
    })

    hmtl.setAttribute('data-contexto',contexto);
    banner.setAttribute('src',`./imagenes/${contexto}.png`);

    switch(contexto){
        case 'enfoque':
            titulo.innerHTML=
            `Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>`
        break;

        case 'descanso-corto':
            titulo.innerHTML=
            `¿Que tal tomar un respiro?
                <strong class="app__title-strong">¡Haz una pausa corta!.</strong>`
        break;

        case 'descanso-largo':
            titulo.innerHTML=
            `Hora de volver a la superficie
                <strong class="app__title-strong">Haz una pausa larga.</strong>`
        break;
    }
} 

const cuentaRegresiva = () => {
    if(tiempoTranscurridoEnSegundos <=0){   //CUANDO LLEGUE A CERO PASARA..
        reiniciar();                        //DETENER EL TEMPORIZADOR
        alert('Tiempo final');              //MOSTRAR MENSAJE DE SE ACABO
        return;                             //SALIMOS DE CUENTA REGRESIVA
    }
    tiempoTranscurridoEnSegundos -= 1       //VA RESTANDO EL TIEMPO
    console.log("Temporizador:" + tiempoTranscurridoEnSegundos); //VA MOSTRANDO EL TIEMPO RESTANTE
}

botonIniciarPausar.addEventListener('click',iniciarPausar); //ESTAMOS EN ESPERA DE QUE DE CLICK EN PAUSAR PARA INICIAR FUNCION

function iniciarPausar(){   //CREACION DE FUNCION PARA INICIAR Y DADO CASO PAUSAR
    if(IdIntervalo){        //SI HAY UN TEMPORIZADOR EN MARCHA
        reiniciar();        //DETER EL TEMPORIZADOR
        return;             //SALIMOS DE LA FUNCION
    }    
    IdIntervalo = setInterval(cuentaRegresiva,1000) //  SI NO HAY TEMPORIZADOR, SE INICIA UNO
}

function reiniciar(){  //SE CREA LA FUNCION PARA DETENER
    clearInterval(IdIntervalo)  // DETIENE EL TEMPORIZADOR ES DECIR DETIENE A "setInterval"
    IdIntervalo=null    //RESTABLECE PARA INDICAR QUE NO HAY TEMPORIZADOR EN MARCHA
}