/* Create a new instance of the `Intl.NumberFormat` object with specific formatting options (PESO COLOMBIANO). */
export const peso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
})

/**
 * @function
 * @name reverseFormat
 * @description The `reverseFormat` function takes a currency string and removes the currency symbol and decimal point, returning the remaining number as a string.
 * @param {String} currency - The `currency` parameter is a string representing a currency value.
 * @returns {Number} The function `reverseFormat` returns the final result after removing the currency symbol and decimal point from the input currency string.
 */
export const reverseFormat = (currency) => {
    const firstStep = currency.split('').slice(2, currency.split('').length)
    const deletePoint = firstStep.filter((number) => number !== '.')
    const finalResult = deletePoint.join('')
    return finalResult
}

export const onlyNumbers = (e) => {
    const keysAllowed = [8, 9, 37, 39, 46]
    const keyCodes = e.which || e.keyCode

    if ((keyCodes >= 48 && keyCodes <= 57) || keysAllowed.includes(keyCodes)) {
        return true
    } else {
        e.preventDefault()
    }
}
