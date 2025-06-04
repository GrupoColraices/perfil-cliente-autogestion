export const validateBirthdate = (value) => {
    const today = new Date();
    const minAge = 15;
    const maxAge = 90;

    const minAgeDate = new Date(today.getFullYear() - minAge, today.getMonth(), today.getDate());
    const maxAgeDate = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());

    const birthdate = new Date(value);

    if (birthdate > minAgeDate || birthdate < maxAgeDate) {
        return "La fecha de nacimiento debe indicar una edad entre 18 y 71 años.";
    }
    return true;
};