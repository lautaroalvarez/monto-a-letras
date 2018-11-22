'use strict';
const numbersMap = ['', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
const tenOneNumbersMap = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciseis', 'diecisiete', 'dieciocho', 'diecinueve'];
const tenTwoNumbersMap = ['', ' y uno', ' y dos', ' y tres', ' y cuatro', ' y cinco', ' y seis', ' y siete', ' y ocho', ' y nueve'];
const numbersTenMap = ['', '', '', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
const numbersCentMap = ['', '', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];
let amountToText;

function cents(amount) {
    if (amount > 0) {
        return `con ${amount}/100 `;
    }
    return '';
}

function ten(amount) {
    const value = Math.floor(amount / 1000);
    const decValue = amount - value * 1000;
    const decRest = Math.floor(decValue / 100);
    const rest = amount - value * 1000 - decRest * 100;
    let sal = '';
    if (value === 1) {
        return `${tenOneNumbersMap[decRest]} `;
    } else if (value === 2 && decRest === 0) {
        sal = 'veinte ';
    } else if (value === 2) {
        sal = `veinti ${numbersMap[decRest]} `;
    } else if (value !== 0) {
        sal = `${numbersTenMap[value]}${tenTwoNumbersMap[decRest]} `;
    } else if (decRest > 1) {
        sal = `${numbersMap[decRest]} `;
    }
    return `${sal}${cents(rest)}`;
}

function hundred(amount) {
    const value = Math.floor(amount / 10000);
    const rest = amount - value * 10000;
    let sal = '';
    if (value === 1 && rest > 0) {
        return `ciento ${ten(rest)} `;
    } else if (value === 1) {
        return `cien ${ten(rest)} `;
    } else if (value > 1) {
        sal = `${numbersCentMap[value]} `;
    }
    return `${sal}${ten(rest)}`;
}

function thousand(amount) {
    const value = Math.floor(amount / 100000);
    const rest = amount - value * 100000;
    let sal = '';
    if (value > 0) {
        sal = `${amountToText(value)}mil `;
    }
    return `${sal}${hundred(rest)}`;
}

amountToText = function(amount) {
    return thousand(Math.floor(amount * 100));
};

module.exports = amountToText;
