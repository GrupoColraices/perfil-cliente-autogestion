export const validateYear = (value) => {
    const year = new Date(value).getFullYear();
    return year >= 1900 && year <= 3000 || "El año ingresado es inválido";
}