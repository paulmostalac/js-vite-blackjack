/**
 * @param {String} carta 
 * @param {Number} turno
 * @returns {HTMLImageElement} imagen de retorno
 */

export const crearCartaHTML = (carta, turno) => {
    
    if (!carta) throw new Error('La carta es un argumento obligatorio')

    const divCartasJugadores = document.querySelectorAll('.divCartas')
    const imgCarta = document.createElement('img');
    imgCarta.src = `Assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta') ;
    divCartasJugadores[turno].append(imgCarta);
    
    return imgCarta;
}