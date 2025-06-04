import { excludeFields } from './excludeFields'
import { handleClickScroll } from './clickScroll'
import { createClient } from '../services/createClient'
import { updateClient } from '../services/updateClient'
import { createProfile } from '../services/createProfile'
import { calculateAge } from '../helpers/currentAge'
import toast from 'react-hot-toast'
import { handleHubSpotSync } from './handleHubSpotSync'

/**
 * @function dataManagement
 * @description The `dataManagement` function is responsible for managing data related to client registration,
 * including creating a new client, updating an existing client, and handling various data fields and
 * validations.
 * @param register - An object containing various registration data.
 * @param dataRegister - A function that takes in data and registers it.
 * @param dataIncome - An array of income data for the client.
 * @param dataExpense - An array of expense data.
 * @param inmDefinition - A boolean value indicating whether the property definition is true or false.
 * @param isVis - A boolean value indicating whether the property is a VIS property or not.
 * @param setResult - A function that sets the result of the data management operation.
 * @param client - The `client` parameter is an object that represents the client's information. It
 * contains properties such as `id`, `Identification`, `Request`, `Property`, `Agent`, `Employments`,
 * `Incomes`, `Expenses`, `FinancialExpenses`, `Patrimonies`, and `Co
 * @param setClient - A function that sets the client data.
 * @param updateProfiles - A function that updates the profiles of a client.
 * @param typeDebt - The `typeDebt` parameter is a string that determines the type of debt associated
 * with the client. It can have three possible values: 'true', 'false', or a specific debt type. If it
 * is 'true', it means that there is a debt associated with the client. If it
 * @param selectApoderado - A boolean value indicating whether an apoderado (representative) is
 * selected or not.
 * @param typePatrimonies - The parameter `typePatrimonies` is a string that determines the type of
 * patrimonies data to be included in the `data` object. It can have three possible values: 'true',
 * 'false', or any other string value.
 * @param linking - A boolean value indicating whether the linking feature is enabled or not.
 */
export const dataManagement = async (
    register,
    dataRegister,
    inmDefinition,
    setResult,
    client,
    setClient,
    updateProfiles,
    typeDebt,
    selectApoderado,
    typePatrimonies,
    linking,
    isEdit
) => {
    const hasProperties = inmDefinition && typeof inmDefinition === 'object' && Object.keys(inmDefinition).length > 0
    register.age = calculateAge(register.birthdate)
    register.marital_status_id = register.marital_status_id === '' ? null : register.marital_status_id
    register.education_level_id = register.education_level_id === '' ? null : register.education_level_id
    register.service_taken = 'Perfil cliente'
    if (hasProperties) {
        register.Property.isVis = register.Property?.isVis === 'true' ? true : false
    }
    if (!hasProperties && client?.Property) {
        register.Property.property_value = null
        register.Property.deadline = register.Property?.deadline === '' ? null : register.Property.deadline
    }
    if (register.score === '') {
        register.score = null
    }
    register.Employments = register?.Employments.map((item) => {
        item.last_employment_entry = item.last_employment_entry === '' ? null : item.last_employment_entry
        item.last_employment_exit = item.last_employment_exit === '' ? null : item.last_employment_exit
        return item
    })
    let Authorizations = []
    if (register.data_authorization) Authorizations.push(1)
    if (register.risks_authorization) Authorizations.push(2)
    if (register.conditions_authorization) Authorizations.push(3)
    if (Authorizations.length > 0) register.Authorizations = Authorizations

    const data = excludeFields(register, selectApoderado, hasProperties, linking, client)
    dataRegister(data)
    if (!data?.id) {
        setResult(true)
        const createdClient = await createClient(data)
        setClient(createdClient?.data)
        if (createdClient?.errors) {
            createdClient?.errors.forEach((item) => toast.error(item?.msg))
        }
        if (createdClient?.data) {
            const client_id = createdClient?.data?.id
            Promise.all([createProfile(client_id, 1), createProfile(client_id, 2), createProfile(client_id, 3)])
                .then((values) => {
                    const cleanedValues = values.map((value) => value.data)
                    updateProfiles(cleanedValues)
                })
                .finally(() => {
                    setResult(false)
                    toast.success('Cliente creado correctamente')
                    handleClickScroll()
                    handleHubSpotSync(client_id)
                })
        }
    } else {
        setResult(true)

        const client_id = data?.id
        // data.Identification.id = data?.Identification?.id
        // data.Identification.client_id = client?.Identification?.client_id
        // data.Request.id = client?.Request?.id
        // data.Request.client_id = client?.Request?.client_id

        // if (data?.Property) {
        //     data.Property.isVis = register.Property?.isVis === 'VIS' ? true : false
        // }
        // if (data?.Property && client?.Property) {
        //     data.Property.id = client?.Property?.id
        //     data.Property.client_id = client?.Property?.client_id
        //     data.Property.deadline = data.Property.deadline === '' ? null : data.Property.deadline
        // }
        // if (selectApoderado !== 'false' && data?.Agent && daya?.Agent) {
        //     data.Agent.id = client?.Agent?.id
        //     data.Agent.client_id = client?.Agent?.client_id
        // }
        data.Employments = data?.Employments.map((item) => {
            item.last_employment_entry = item.last_employment_entry === '' ? null : item.last_employment_entry
            item.last_employment_exit = item.last_employment_exit === '' ? null : item.last_employment_exit
            return item
        })
        // data?.Employments.forEach((item, index) => {
        //     item.id = client?.Employments[index]?.id
        //     item.client_id = client?.Employments[index]?.client_id
        // })
        // if (data?.Incomes) {
        //     data?.Incomes.forEach((item, index) => {
        //         item.id = client?.Incomes[index]?.id
        //         item.client_id = client?.Incomes[index]?.client_id
        //     })
        // }
        // if (data?.Expenses) {
        //     data?.Expenses.forEach((item, index) => {
        //         item.id = client?.Expenses[index]?.id
        //         item.client_id = client?.Expenses[index]?.client_id
        //     })
        // }
        // if (typeDebt !== 'false' && data?.FinancialExpenses && client?.FinancialExpenses) {
        //     data?.FinancialExpenses.forEach((item, index) => {
        //         item.id = client?.FinancialExpenses[index]?.id
        //         item.client_id = client?.FinancialExpenses[index]?.client_id
        //     })
        // }
        // if (typePatrimonies !== 'false' && data?.Patrimonies && client?.Patrimonies) {
        //     data?.Patrimonies.forEach((item, index) => {
        //         item.id = client?.Patrimonies[index]?.id
        //         item.client_id = client?.Patrimonies[index]?.client_id
        //     })
        // }
        // if (linking !== 'false' && data?.Coowners && client?.Coowners) {
        //     data?.Coowners.forEach((item, index) => {
        //         item.id = client?.Coowners[index]?.id
        //         item.client_id = client?.Coowners[index]?.client_id
        //     })
        // }
        console.log(data)
        const updatedClient = await updateClient(data, client_id, updateProfiles, setResult)
        if (!client?.id) {
            setClient(updatedClient)
        }
        handleClickScroll()
    }
}
