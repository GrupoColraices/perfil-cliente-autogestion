const { VITE_API_URL } = import.meta.env

export const createProfile = async (client_id, bank_id) => {


    try {
        const response = await fetch(`${VITE_API_URL}/profiles?client_id=${client_id}&bank_id=${bank_id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const profile = await response.json();
        return profile

    } catch (errors) {
        console.log(errors)
    }
}