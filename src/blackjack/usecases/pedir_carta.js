/**
 * Esta función permite pedir carta
 * @param {Array<String>} deck es un arreglo de string
 * @returns {String} Retorna una carta del deck
 */

export const pedirCarta = (deck) => {

    if (!deck || deck.length === 0) {
        throw 'No hay más cartas en el deck';
    }
    return deck.pop();
}