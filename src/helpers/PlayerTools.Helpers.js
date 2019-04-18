import { DefaultPlayerTools } from '../constants/Constants';

const FIRST_SYMBOL_ASCII_CODE = 'A'.charCodeAt(0);
const LAST_SYMBOL_ASCII_CODE = 'Z'.charCodeAt(0);
const MAX_PLAYERS_NUMBER = LAST_SYMBOL_ASCII_CODE - FIRST_SYMBOL_ASCII_CODE + 1;

function getDefaultPlayerTools() {
    return DefaultPlayerTools.slice(0);
}

function expandToolRange(toolsRange, requiredToolsNumber) {
    if (requiredToolsNumber > MAX_PLAYERS_NUMBER) {
        throw new Error('Invalid player number requested');
    }

    const indexNumberToGenerate = (requiredToolsNumber - toolsRange.length);

    for (let i = 0; i < indexNumberToGenerate; ++i) {
        const nextUnusedAsciiSymbolCode = FIRST_SYMBOL_ASCII_CODE + indexNumberToGenerate;

        toolsRange.push(String.fromCharCode(nextUnusedAsciiSymbolCode));
    }
    return toolsRange;
}

function getPlayerTools(playersNumber) {
    return expandToolRange(getDefaultPlayerTools(), playersNumber);
};

/**
 * @param  {number} currentPlayerToolIndex
 * @param  {string[]} playerTools
 * @returns {number}
 */
function getNextPlayerToolIndex(currentPlayerToolIndex, playerTools) {
    return ++currentPlayerToolIndex % playerTools.length;
}

export {
    MAX_PLAYERS_NUMBER,
    getPlayerTools,
    getNextPlayerToolIndex as getNextPlayerTool,
};