import _ from 'underscore';
// import crearDeck, {miNombre} from './usecases/crear_deck.js';
// console.log(miNombre);

import { crearDeck, pedirCarta, valorCarta, crearCartaHTML} from './usecases';

const miModulo = (() => {
    'use strict';
    
    let deck = [];
    const tipos = ['C','D','H','S'],
          especiales = ['A','J','Q','K'];

    let puntosJugadores = [];

    // Referencias del HTML
    const btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML = document.querySelectorAll('small');

    deck = crearDeck(tipos, especiales);

    // Esta función inicia el juego
    const inicializarJuego = (numJugadores = 2) => {

        puntosJugadores = [];
        for (let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0);
        }

        puntosHTML.forEach(elem => elem.innerText = 0);
        divCartasJugadores.forEach(elem => elem.innerHTML = '');

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    };

    // Turnos: el último será la computadora
    const acumularPuntos = (turno, carta) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    };

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

        setTimeout(() => {
            if ((puntosComputadora === puntosMinimos)){
                alert('Nadie Gana');
            } else if (puntosMinimos > 21){
                alert('La Computadora Gana');
            } else if (puntosComputadora > 21){
                alert('El Jugador Gana');
            } else {
                alert('La Computadora Gana')
            }
        },50);
    }

    //turno de la computadora
    const turnoComputadora = (puntosMinimos) => {

        let puntosComputadora = 0;

        do {
            const carta = pedirCarta(deck);
            puntosComputadora = acumularPuntos( puntosJugadores.length-1, carta);

            crearCartaHTML(carta, puntosJugadores.length -1);

        } while ((puntosComputadora < puntosMinimos) && puntosMinimos <= 21);

        determinarGanador();
    };

    // Eventos
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta(deck);
        const puntosJugador = acumularPuntos(0, carta);

        crearCartaHTML(carta, 0);

        if (puntosJugador > 21){
            console.warn('Perdiste');
            btnPedir.disabled = true;
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21){
            console.warn('21, genial!');
            turnoComputadora(puntosJugador);
        }
    });

    btnDetener.addEventListener('click', () =>{
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugadores[0]);
    });

    btnNuevo.addEventListener('click', () =>{
        inicializarJuego();
    });
    return {
        nuevoJuego: inicializarJuego
    }
})();
