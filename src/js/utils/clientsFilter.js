//@ts-check
/**
 * @function
 * @name clientsFilter
 * @description The function filters an array of client data based on the provided identification and service parameters.
 * @param {Array} data - The array of client data.
 * @param {String} identificationOrEmail - The identification or email string to filter the array.
 * @param {String} service - The service string to filter the array.
 * @returns {Array} The function `clientsFilter` returns a filtered array of `data` based on the provided `identification` and `service` parameters.
 */
export const clientsFilter = (data, identificationOrEmail, service) => {
    if (service || identificationOrEmail) {
        return data
            ?.filter((item) =>
                item.Identification?.national_document_number.indexOf(identificationOrEmail.toLowerCase()) != -1 ||
                item.email?.toLowerCase().indexOf(identificationOrEmail.toLowerCase()) != -1
            )
            ?.filter((item) => item.service_taken?.toLowerCase().indexOf(service.toLowerCase()) != -1)
    }
    return data
}
