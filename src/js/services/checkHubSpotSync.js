const { VITE_API_URL } = import.meta.env

export const checkHubSpotSync = async (id) => {
    try {
        const response = await fetch(`${VITE_API_URL}/clients/hubspot/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        return { status: response.status, data };
    } catch (error) {
        console.error('Error al verificar la sincronización con HubSpot:', error);
        return { status: 500, data: null };
    }
};