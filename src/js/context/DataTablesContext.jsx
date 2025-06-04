const { VITE_API_URL } = import.meta.env
import { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { useGetClients } from '../hooks/useGetClients'
import { AuthContext } from '@/context/AuthContext'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { ProfileContext } from './ProfileContext'
import { createProfile } from '@/services/createProfile'

const DataTablesContext = createContext()
const DataTablesContextProvider = ({ children }) => {
    const { id } = useParams()
    console.log({ id })
    const {
        isAuth: { token },
    } = useContext(AuthContext)
    const { updateProfiles, profiles, updateProfile, result, setResult } = useContext(ProfileContext)

    const { data } = useGetClients(`${VITE_API_URL}/clients/${id}`, token)
    const { data: dataProfiles } = useGetClients(`${VITE_API_URL}/profiles/client/${id}/?limit=3`, token)

    const [employments, setEmployments] = useState([])
    const [incomes, setIncomes] = useState([])
    const [expenses, setExpenses] = useState([])
    const [financialExpenses, setFinancialExpenses] = useState([])
    const [patrimonies, setPatrimonies] = useState([])
    const [creditRequest, setCreditRequest] = useState([])
    const [coowners, setCoowners] = useState([])
    const [property, setProperty] = useState()
    const [references, setReferences] = useState()
    const [agent, setAgent] = useState()
    const [canRevalidate, setCanRevalidate] = useState(false)
    const {
        Incomes,
        Expenses,
        FinancialExpenses,
        Employments,
        Request,
        Property,
        References,
        Agent,
        Patrimonies,
        ...clientData
    } = data || {}
    const [client, setClient] = useState({})
    const revalidateResult = () => {
        setResult(true)
        Promise.all([createProfile(id, 1), createProfile(id, 2), createProfile(id, 3)])
            .then((values) => {
                const cleanedValues = values.map((value) => value.data)
                updateProfiles(cleanedValues)
            })
            .finally(() => {
                setResult(false)
                setCanRevalidate(true)
                toast.success('¡Revalidación completada!')
            })
    }
    useEffect(() => {
        setEmployments(data?.Employments)
        setIncomes(data?.Incomes)
        setExpenses(data?.Expenses)
        setFinancialExpenses(data?.FinancialExpenses)
        setPatrimonies(data?.Patrimonies)
        setCoowners(data?.Coowners)
        setCreditRequest(data?.Request)
        setProperty(data?.Property)
        setReferences(data?.References)
        setAgent(data?.Agent)
        setClient(clientData)

        if (dataProfiles?.length > 0) {
            updateProfile(dataProfiles?.find((p) => p?.Bank?.bank_name === 'Bancolombia'))
        }
        updateProfiles(dataProfiles)
    }, [dataProfiles, data])
    useEffect(() => {
        if (canRevalidate) {
            updateProfile(profiles[0])
        }
    }, [canRevalidate, profiles])

    return (
        <DataTablesContext.Provider
            value={{
                employments,
                setEmployments,
                incomes,
                setIncomes,
                expenses,
                setExpenses,
                financialExpenses,
                setFinancialExpenses,
                patrimonies,
                setPatrimonies,
                creditRequest,
                coowners,
                setCoowners,
                property,
                setProperty,
                references,
                setReferences,
                agent,
                setAgent,
                revalidateResult,
                canRevalidate,
                clientData: client,
                setClient,
            }}
        >
            {children}
        </DataTablesContext.Provider>
    )
}
export { DataTablesContext, DataTablesContextProvider }
