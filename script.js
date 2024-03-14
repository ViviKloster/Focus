const html = document.querySelector('html');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const inputEnfoqueMusica = document.querySelector('#alternar-musica');
const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const sonidoPlay = new Audio('./sonidos/play.wav');
const sonidoPause = new Audio('./sonidos/pause.mp3');
const sonidoBeep = new Audio('./sonidos/beep.mp3');
const botonIniciarPausar = document.querySelector('#start-pause');
const tiempoEnPantalla = document.querySelector('#timer');

let tiempoTranscurridoEnSegundos = 25 * 60;


let idIntervalo = null;

musica.loop = true;

inputEnfoqueMusica.addEventListener('click', ()=> {
    if(musica.paused) {
        musica.play();
        console.log('musica play');
    } else {
        musica.pause();
        console.log('musica pause')
    }
})

botonEnfoque.addEventListener('click', ()=> {
    cambiarContexto('enfoque');
    botonEnfoque.classList.add('active');
    tiempoTranscurridoEnSegundos = 25 * 60;
    mostrarTiempo();
});

botonCorto.addEventListener('click', ()=> {
    cambiarContexto('descanso-corto');
    botonCorto.classList.add('active');
    tiempoTranscurridoEnSegundos = 5 * 60;
    mostrarTiempo();
});

botonLargo.addEventListener('click', ()=> {
    cambiarContexto('descanso-largo');
    botonLargo.classList.add('active');
    tiempoTranscurridoEnSegundos = 15 * 60;
    mostrarTiempo();
});

function cambiarContexto(contexto) {
    botones.forEach(function(contexto) {
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagenes/${contexto}.png`);
    switch (contexto) {
        case 'enfoque':
            titulo.innerHTML = 
            `Optimiza tu productividad,<br>
            <strong class="app__title-strong">sumérgete en lo que importa.</strong>`
            break;

        case 'descanso-corto':
            titulo.innerHTML = `
            ¿Qué tal tomar un respiro?<br>
            <strong class="app__title-strong">¡Haz una pausa corta!</strong>`
            break;
            
        case 'descanso-largo':
            titulo.innerHTML = `
            Hora de volver a la superficie<br>
            <strong class="app__title-strong">Haz una pausa larga.</strong>`
            break;
        default:
            break;
    }
}
const cuentaRegresiva = ()=> {
    if(tiempoTranscurridoEnSegundos < 6) {
        sonidoBeep.play();
    } 
    if(tiempoTranscurridoEnSegundos === 0) {
        botonIniciarPausar.innerHTML = `<img src='/imagenes/play_arrow.png'>Comenzar`;
        musica.pause();
    }
    if(tiempoTranscurridoEnSegundos <= 0) {
        reiniciar();
        botonIniciarPausar.innerHTML = `Tiempo final`;
        return;
    }
    tiempoTranscurridoEnSegundos -= 1;
    mostrarTiempo();
}
botonIniciarPausar.addEventListener('click', iniciarPausar);

function iniciarPausar() {
    if(idIntervalo) {
        reiniciar();
        sonidoPause.play();
        botonIniciarPausar.innerHTML = `<img src='/imagenes/play_arrow.png'>Continuar`;
        musica.pause();
        inputEnfoqueMusica.checked = true;
        return;
    } 
    sonidoPlay.play();
    idIntervalo = setInterval(cuentaRegresiva, 1000);
    botonIniciarPausar.innerHTML = `<img src='/imagenes/pause.png'>Pausar`;
    musica.play();
    if(musica.pause() && idIntervalo == true) {
        inputEnfoqueMusica.checked = false;
    }
    
}

function reiniciar() {
    clearInterval(idIntervalo);
    idIntervalo = null;
    sonidoBeep.pause();
}

function mostrarTiempo() {
    /*let minutos = Math.floor(tiempoTranscurridoEnSegundos / 60);
    let segundos = tiempoTranscurridoEnSegundos % 60;
    tiempoEnPantalla.innerHTML = (`${String(minutos).padStart(2, 0)}:${String(segundos).padStart(2, 0)}`);*/

    const tiempo = new Date(tiempoTranscurridoEnSegundos * 1000);
    const tiempoFormateado = tiempo.toLocaleTimeString('es-MX', {minute: '2-digit', second: '2-digit'})
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`;
}   
mostrarTiempo();