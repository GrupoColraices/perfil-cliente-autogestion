import { createProfile } from "./createProfile";
import toast from 'react-hot-toast';
const { VITE_API_URL } = import.meta.env;

export const updateClient = async (data, client_id, updateProfiles, setResult) => {
    const { created_at, ...dataToSend } = data;
    
    try {
        const response = await fetch(`${VITE_API_URL}/clients/${client_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            
            if (errorResponse.errors) {
                throw errorResponse.errors; 
            }
            throw { msg: errorResponse.msg || 'Error actualizando cliente' }; 
        }

        const success = await response.json();
        
        await Promise.all([
            createProfile(client_id, 1),
            createProfile(client_id, 2),
            createProfile(client_id, 3),
        ])
        .then((values) => {
            const cleanedValues = values.map(value => value.data);
            updateProfiles(cleanedValues);
        })
        .finally(() => {
            setResult(false); 

            if (success?.data) {
                toast.success('Cliente actualizado con éxito');
            }
        });

        return success?.data; 

    } catch (error) {
        console.error('❌ Error en updateClient:', error); 
        throw error;
    }
};
