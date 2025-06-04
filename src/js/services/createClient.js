export const createClient = async (data) => {
    const { VITE_API_URL } = import.meta.env;

    try {
        const response = await fetch(`${VITE_API_URL}/clients`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            if (errorResponse.errors) {
                throw errorResponse.errors; 
            }
            throw { message: errorResponse.message || 'Error creando cliente' }; 
        }

        const dataClient = await response.json();
        return dataClient;
    } catch (error) {
        throw error;
    }
};