//@ts-check
/**
 * @function
 * @name getFilteredClients
 * @description The function filters an array of client data based on the provided filter and search parameters. 
 * It filters the clients based on whether they are assigned or not (filter) and searches for a matching `national_document_number` or `email` (search).
 * @param {Array} data - The array of client data.
 * @param {String} filter - The filter string to determine if the client is "unassigned" or not.
 * @param {String} search - The search string to filter by `national_document_number` (cedula) or `email`.
 * @returns {Array} The function `getFilteredClients` returns a filtered array of `data` based on the provided `filter` and `search` parameters.
 */
export const getFilteredClients = (data, filter, search) => {
    return data?.filter(({ user_id, email, Identification }) => {
        const nationalDocumentNumber = Identification?.national_document_number || "";
        const isMatchingFilter = filter === "unassigned" ? user_id === null : true;
        const isMatchingSearch = nationalDocumentNumber.toLowerCase().includes(search) || email?.toLowerCase().includes(search);
        return isMatchingFilter && isMatchingSearch;
    });
};
