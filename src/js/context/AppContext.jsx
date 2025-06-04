import { useState } from 'react'
import { createContext } from 'react'
import { useGetSelectOptions } from '../hooks/useGetSelectOptions'

const AppContext = createContext()

const AppContextProvider = ({ children }) => {
    //Sidebar context
    const [isOpen, setIsOpen] = useState(false)
    const [isFixed, setIsFixed] = useState(false)

    const handleIsOpen = (value) => {
        if (!value && !isFixed) {
            return setIsOpen(false);
        }
        if (!isFixed) {
            setIsOpen((prevState) => !prevState)
        }
    }
    const handleIsFixed = () => {
        setIsOpen(true)
        setIsFixed(true)
        if (isFixed) {
            setIsFixed(false)
            setIsOpen(false)
        }
    }
    const handleIsOpenHover = () => {
        if (!isFixed && window.innerWidth >= 1024) {
            setTimeout(() => {
                setIsOpen((prevState) => !prevState)
            }, 200)
        }
    }

    const typeDocuments = useGetSelectOptions(`national-documents`)
    const countries = useGetSelectOptions(`countries`)
    const relationships = useGetSelectOptions(`relationships`)
    const typeDocumentsImmigration = useGetSelectOptions(`immigration-documents`)
    const statusMigratories = useGetSelectOptions(`migratories`)
    const stateMarital = useGetSelectOptions(`marital`)
    const levelStudy = useGetSelectOptions(`education-levels`)
    const economicActivities = useGetSelectOptions(`economic-activities`)
    const contractTypes = useGetSelectOptions(`contract-types`)
    const currencies = useGetSelectOptions(`currencies`)
    const creditTypes = useGetSelectOptions(`credits`)
    const nationalities = useGetSelectOptions(`nationalities`)
    const feeTypes = useGetSelectOptions(`fee-types`)
    const propertyTypes = useGetSelectOptions(`property-types`)
    const cities = useGetSelectOptions(`cities`)
    const incomeTypes = useGetSelectOptions(`income-types`)
    const expenseTypes = useGetSelectOptions(`expense-types`)
    const allies = useGetSelectOptions(`allies`)
    const options = useGetSelectOptions(`select-options`)
    const visOptions = [
        { id: 1, label: 'VIS', value: true },
        { id: 2, label: 'NO VIS', value: false }
    ]
    const selectOptions = {
        typeDocuments,
        countries,
        relationships,
        typeDocumentsImmigration,
        statusMigratories,
        stateMarital,
        levelStudy,
        economicActivities,
        contractTypes,
        currencies,
        creditTypes,
        nationalities,
        feeTypes,
        propertyTypes,
        cities,
        incomeTypes,
        expenseTypes,
        allies,
        options,
        visOptions
    }
    return (
        <AppContext.Provider
            value={{
                selectOptions,
                isOpen,
                isFixed,
                handleIsOpen,
                handleIsFixed,
                handleIsOpenHover,
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export { AppContext, AppContextProvider }
