import { createClient } from "../services/createClient";
import { updateClient } from "../services/updateClient";
import { createProfile } from "../services/createProfile";
import toast from "react-hot-toast";
import { handleHubSpotSync } from "./handleHubSpotSync";

export const initializeSelectValues = (clientData) => ({
    
    'Employments[0].economic_activity_id': clientData?.client_data?.Employments?.[0]?.economic_activity_id || "",
    currency_id: clientData?.client_data?.currency_id || "",
    'Request.credit_id': clientData?.client_data?.Request?.credit_id || "",
    'Property.city_id': clientData?.client_data?.Property?.city_id || "",
    type_service: clientData?.client_data?.type_service || '',
    selected_property: clientData?.client_data?.selected_property || '',
});

export const initializeFormValues = (clientData, createdBy) => ({
    defaultValues: {
        Identification: {
            national_document_number: clientData?.client_data?.Identification?.national_document_number || '',
            national_document_id: clientData?.client_data?.Identification?.national_document_id || 1,
        },
        name: clientData?.client_data?.name || '',
        last_name: clientData?.client_data?.last_name || '',
        phone_number: clientData?.client_data?.phone_number || '',
        email: clientData?.client_data?.email || '',
        Employments: [
            {
                employment_start_date: clientData?.client_data?.Employments?.[0]?.employment_start_date || {},
                salary: clientData?.client_data?.Employments?.[0]?.salary || '',
                economic_activity_id: clientData?.client_data?.Employments?.[0]?.economic_activity_id || {},
            },
        ],
        FinancialExpenses: [
            {
                expense_value: clientData?.client_data?.FinancialExpenses?.[0]?.expense_value || {},
                expense_type_id: clientData?.client_data?.FinancialExpenses?.[0]?.expense_type_id || 7,
            },
        ],
        Request: {
            credit_id: clientData?.client_data?.Request?.credit_id || '',
            time_limit: clientData?.client_data?.Request?.time_limit || '',
            credit_value: clientData?.client_data?.Request?.credit_value,
        },
        Property: {
            city_id: clientData?.client_data?.Property?.city_id || '',
            property_value: clientData?.client_data?.Property?.property_value || '',
        },
        country_id: clientData?.client_data?.country_id || '',
        currency_id: clientData?.client_data?.currency_id || '',
        selected_property: clientData?.client_data?.selected_property || '',
        type_service: clientData?.client_data?.type_service || '',
        service_taken: clientData?.client_data?.service_taken || 'Cupo crédito',
        user_id: createdBy,
    },
    mode: 'onChange',
})

export const createNewClient = async (data, setProfilesCreated, updateProfiles, navigate, toggleQuota) => {
    try {
        const client = await createClient(data);
        const client_id = client?.data?.id;

        const profiles = await Promise.all([
            createProfile(client_id, 1),
            createProfile(client_id, 2),
            createProfile(client_id, 3)
        ]);

        updateProfiles(profiles?.data);
        setProfilesCreated(true);
        toggleQuota(false)

        navigate('/cupo-de-credito/validado', { state: { clientData: { client_id, client_data: client?.data } } });
        toast.success('Se ha creado correctamente');
        handleHubSpotSync(client_id)
    } catch (error) {
        toggleQuota(false)
        handleError(error, toggleQuota);
    }
};


export const updateExistingClient = async (data, clientData, client_id, updateProfiles, navigate, toggleQuota) => {
    try {
        if (clientData?.client_data?.Employments?.[0]?.id) {
            data.Employments[0].id = clientData?.client_data?.Employments?.[0]?.id
        }
        if (clientData?.client_data?.FinancialExpenses?.[0]?.id) {
            data.FinancialExpenses[0].id = clientData?.client_data?.FinancialExpenses?.[0]?.id
        }
        const updateData = await updateClient(data, client_id, updateProfiles, toggleQuota);
        navigate('/cupo-de-credito/validado', { state: { clientData: { client_id, client_data: updateData } } });
    } catch (error) {
        handleError(error, toggleQuota);
    }
};


const handleError = (error, toggleQuota) => {
    toggleQuota(false)
    if (Array.isArray(error)) {
        error.forEach((err) => toast.error(err?.msg));
    } else if (typeof error === 'object') {
        toast.error(error.message || 'Error inesperado');
    }
};