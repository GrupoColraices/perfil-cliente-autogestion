import toast from 'react-hot-toast'
import { checkHubSpotSync } from '../services/checkHubSpotSync';
export const handleHubSpotSync = async (client_id) => {
    const loadingToast = toast.loading('Sincronizando con HubSpot...');
    try {
        const { status, data } = await checkHubSpotSync(client_id);
        if (status === 200 && data?.data?.id_hubspot && data?.data?.id_deal_hubspot) {
            toast.dismiss(loadingToast);
            toast.success('Sincronización con HubSpot completada');
            return data;
        } else {
            toast.dismiss(loadingToast);
            toast.error('Fallo en la sincronización con HubSpot');
            return null;
        }
    } catch (error) {
        toast.dismiss(loadingToast);
        toast.error('Error en la consulta de HubSpot');
        return null;
    }
};
