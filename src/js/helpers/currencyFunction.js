//@ts-check
const { VITE_API_URL } = import.meta.env

/**
 * @function
 * @name currencyFunction
 * @description The currencyFunction is an asynchronous function that fetches the exchange rate for a given currency
 * code.
 * @param {String} code - The `code` parameter is a string representing the currency code. It is used to specify
 * the currency from which you want to convert.
 * @returns {Promise<Number>} The function `currencyFunction` returns the TRM rate (currency conversion rate) for the
 * specified currency code.
 */
export const currencyFunction = (code) => {
    const dataFetch = async () => {
        const url = `${VITE_API_URL}/currency-convertion/from/${code}/ammount/1`
        const response = await fetch(url)
        const data = await response.json()
        return data.trm_rate
    }
    return dataFetch()
}
