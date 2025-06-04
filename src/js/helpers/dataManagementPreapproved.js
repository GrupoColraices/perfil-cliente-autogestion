import { excludeFields } from './excludeFields'
import { handleClickScroll } from './clickScroll'
import { createClient } from '../services/createClient'
import { updateClient } from '../services/updateClient'
import { createProfile } from '../services/createProfile'
import { calculateAge } from '../helpers/currentAge'
import toast from 'react-hot-toast'
import { handleHubSpotSync } from './handleHubSpotSync'

export const initializeFormValues = (clientData, createdBy) => ({
    defaultValues: {
        country_id: clientData?.client_data?.country_id || '',
        Identification: {
            national_document_number: clientData?.client_data?.Identification?.national_document_number || '',
            national_document_id: clientData?.client_data?.Identification?.national_document_id || 1,
            immigration_document_number: clientData?.client_data?.Identification?.immigration_document_number || '',
            immigration_document_expiration_date:
                clientData?.client_data?.Identification?.immigration_document_expiration_date || '',
        },
        name: clientData?.client_data?.name || '',
        last_name: clientData?.client_data?.last_name || '',
        phone_number: clientData?.client_data?.phone_number || '',
        email: clientData?.client_data?.email || '',
        arrival_date: clientData?.client_data?.arrival_date || '',
        Employments: [
            {
                company_name: '',
                economic_activity_id: '',
                position: '',
                contract_type_id: '',
                salary: '',
                employment_start_date: '',
                last_employment_entry: null,
                last_employment_exit: null,
                boss_name: '',
                phone_number: '',
                address: '',
                city: '',
                payment_method: '',
                payment_frequency: '',
            },
        ],
        FinancialExpenses: [],
        Expenses: [],
        Request: {
            credit_id: clientData?.client_data?.Request?.credit_id || '',
            time_limit: clientData?.client_data?.Request?.time_limit || '',
            credit_value: clientData?.client_data?.Request?.credit_value || '',
            purchase_option: clientData?.client_data?.Request.purchase_option || '',
        },
        // Property: {
        //     property_type_id: clientData?.client_data?.Property.property_type_id ,
        //     city_id: clientData?.client_data?.Property?.city_id ,
        //     property_value: clientData?.client_data?.Property?.property_value ,
        //     isVis: clientData?.client_data?.Property?.isVis ,
        //     stratum: clientData?.client_data?.Property?.stratum,
        // },
        country_id: clientData?.client_data?.country_id || '',
        currency_id: clientData?.client_data?.currency_id || '',
        selected_property: clientData?.client_data?.selected_property || '',
        type_service: clientData?.client_data?.type_service || '',
        service_taken: clientData?.client_data?.service_taken || 'Pre-aprobado',
        user_id: createdBy,
        birthdate: clientData?.client_data?.birthdate || '',
        nationality_id: clientData?.client_data?.nationality_id || '',
        migratory_id: clientData?.client_data?.migratory_id || '',
        score: clientData?.client_data?.score || '',
        Coowners: [],
        Incomes: [],
    },
    mode: 'onChange',
})

const sanitizeField = (value) => (value === '' ? null : value)
const mapEmploymentData = (employments = []) =>
    employments.map((item) => ({
        ...item,
        last_employment_entry: sanitizeField(item.last_employment_entry),
        last_employment_exit: sanitizeField(item.last_employment_exit),
    }))

const mapFinancialExpenses = (financialExpenses = [], typeDebt) =>
    financialExpenses.map((item) => ({
        ...item,
        debt_type: typeDebt,
        total_amount: sanitizeField(item.total_amount),
        current_balance: sanitizeField(item.current_balance),
        expense_value: sanitizeField(item.expense_value),
    }))

export const dataManagementPrevApproved = async (
    register,
    dataRegister,
    inmDefinition,
    setResult,
    profile,
    setProfilesCreated,
    updateProfiles,
    typeDebt,
    selectApoderado,
    linking,
    navigate,
    setIsSubmitted
) => {
    setResult(true)

    try {
        const hasProperties =
            inmDefinition && typeof inmDefinition === 'object' && Object.keys(inmDefinition).length > 0

        register.age = calculateAge(register.birthdate)
        register.marital_status_id = sanitizeField(register.marital_status_id)
        register.education_level_id = sanitizeField(register.education_level_id)
        register.service_taken = 'Pre-aprobado'
        register.Patrimonies = null

        if (hasProperties) {
            register.Property.isVis = register.Property?.isVis === 'VIS'
        } else if (profile?.Property) {
            register.Property.property_value = null
            register.Property.deadline = sanitizeField(register.Property?.deadline)
        }

        register.score = sanitizeField(register.score)
        register.Employments = mapEmploymentData(register?.Employments)
        register.FinancialExpenses = mapFinancialExpenses(register?.FinancialExpenses, typeDebt)

        const Authorizations = [
            register.data_authorization && 1,
            register.risks_authorization && 2,
            register.conditions_authorization && 3,
        ].filter(Boolean)
        if (Authorizations.length > 0) register.Authorizations = Authorizations

        const data = excludeFields(register, selectApoderado, hasProperties, linking, profile)
        dataRegister(data)

        if (!profile || Object.keys(profile).length === 0) {
            await createNewProfile(data, updateProfiles, setProfilesCreated, setResult, navigate, setIsSubmitted)
        } else {
            const profile_id = profile.client_id
            await updateExistingProfile(
                data,
                profile,
                profile_id,
                updateProfiles,
                setProfilesCreated,
                setResult,
                typeDebt,
                navigate,
                setIsSubmitted
            )
        }
    } catch (error) {
        console.error(error)
        toast.error('Ocurrió un error al manejar los datos del perfil.')
    } finally {
        setResult(false)
        handleClickScroll()
    }
}
const createNewProfile = async (data, updateProfiles, setProfilesCreated, setResult, navigate, setIsSubmitted) => {
    try {
        const profile = await createClient(data)
        const profile_id = profile?.data?.id

        const profiles = await Promise.all([
            createProfile(profile_id, 1),
            createProfile(profile_id, 2),
            createProfile(profile_id, 3),
        ])

        updateProfiles(profiles.map((profile) => profile.data))
        setProfilesCreated(true)
        setIsSubmitted(true)

        navigate('/Pre-aprobado/validado', {
            state: { clientData: { client_id: profile_id, client_data: profile?.data } },
        })
        toast.success('Perfil creado correctamente.')
        handleHubSpotSync(profile_id)
    } catch (error) {
        handleError(error)
    } finally {
        setResult(false)
    }
}

const updateExistingProfile = async (
    data,
    profileData,
    profile_id,
    updateProfiles,
    setProfilesCreated,
    setResult,
    typeDebt,
    navigate,
    setIsSubmitted
) => {
    try {
        if (profileData?.Employments?.[0]?.id) {
            data.Employments[0].id = profileData?.Employments?.[0]?.id
        }
        if (profileData?.FinancialExpenses?.[0]?.id) {
            data.FinancialExpenses[0].id = profileData?.FinancialExpenses?.[0]?.id
        }

        data.FinancialExpenses = mapFinancialExpenses(data?.FinancialExpenses, typeDebt)

        const updateData = await updateClient(data, profile_id, updateProfiles, setResult)

        setProfilesCreated(true)
        setIsSubmitted(true)
        navigate('/Pre-aprobado/validado', {
            state: { clientData: { client_id: profile_id, client_data: updateData } },
        })
    } catch (error) {
        handleError(error)
    } finally {
        setResult(false)
    }
}

const handleError = (error) => {
    if (Array.isArray(error)) {
        error.forEach((err) => toast.error(err?.msg))
    } else if (typeof error === 'object') {
        toast.error(error.message || 'Error inesperado')
    }
}
