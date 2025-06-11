import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import { Details } from '../containers/Details'
import { BankButton } from '../components/BankButton'
import { peso } from '../helpers/formatCurrency'
import { ProfileContext } from '../context/ProfileContext'
import { createProfileHubspot } from '../utils/createProfileHubspot'
import { updateProfileHubspot } from '../services/updateProfile'
import { AuthContext } from '../context/AuthContext'

function calculateQuota(profile, clientValue) {
    const maximumQuota = profile?.credit?.maximunQuota || 0
    const maximumQuotaFee = profile?.credit?.maximunQuotaFee || 0
    const requestedCreditFee = profile?.credit?.requestedCreditFee || 0
    const clientNumericValue = Number(clientValue?.client_value || 0)

    if (maximumQuota === 0) {
        return 0
    }

    if (clientNumericValue > maximumQuota) {
        return maximumQuotaFee
    }

    return requestedCreditFee || maximumQuotaFee
}
export const Result = ({
    clientID,
    idDealHubspot,
    title = 'Crédito pre-aprobado',
    withoutLetterPdf = false,
    isLoading = false,
}) => {
    const {
        isAuth: { token },
    } = useContext(AuthContext)
    const navigate = useNavigate()
    const { profiles, profile, updateProfile } = useContext(ProfileContext)
    const typeCredit = profile?.credit_params?.credit_type
    const modality = profile?.credit_params?.fee_type
    const maximunQuota = profile?.credit?.maximunQuota
    const client_value = profile?.profile?.find((type) => type?.title === 'Monto solicitado')
    const quota = calculateQuota(profile, client_value)
    const time_limit = profile?.credit_params?.time_limit

    const profileAlreadySent = profiles?.find((p) => p.id_deal_hubspot !== null)
    const defaultBank = profileAlreadySent?.Bank?.bank_name || 'Bancolombia'
    const [selectedBank, setSelectedBank] = useState(defaultBank)

    const handleCurrentProfile = (bank) => {
        const profile = profiles?.find((profile) => profile?.bank === bank || profile?.Bank?.bank_name === bank)
        updateProfile(profile)
    }

    const handleBankChange = (bankName) => {
        setSelectedBank(bankName)
        handleCurrentProfile(bankName)
    }

    const creditBancolombia = () => handleBankChange('Bancolombia')
    const creditBancoUnion = () => handleBankChange('Banco Union')
    const creditDavivienda = () => handleBankChange('Davivienda')

    const profileSelected = createProfileHubspot(profile, idDealHubspot)

    const handleSendProfile = async () => {
        try {
            await updateProfileHubspot(profileSelected, token)
            toast.success('Perfil enviado a HubSpot')
            setTimeout(() => {
                navigate('/')
            }, 500)
        } catch (error) {
            toast.error('Error al enviar el perfil a HubSpot')
            console.error('Error en handleSendProfile:', error)
        }
    }

    return (
        <>
            <Toaster
                position="bottom-right"
                toastOptions={{
                    success: {
                        duration: 3000,
                    },
                }}
                reverseOrder={false}
            />
            <section className="section__result" id="result">
                <div className="section__buttons">
                    <BankButton
                        img="/perfil-cliente/assets/icons/bancolombia_color.svg"
                        hover="/perfil-cliente/assets/icons/bancolombia_white.svg"
                        active={selectedBank === 'Bancolombia' ? 'active' : ''}
                        action={creditBancolombia}
                    ></BankButton>
                    <BankButton
                        img="/perfil-cliente/assets/icons/banco_union_color.svg"
                        hover="/perfil-cliente/assets/icons/banco_union_white.svg"
                        active={selectedBank === 'Banco Union' ? 'active' : ''}
                        action={creditBancoUnion}
                    ></BankButton>
                    <BankButton
                        img="/perfil-cliente/assets/icons/davivienda_color.svg"
                        hover="/perfil-cliente/assets/icons/davivienda_white.svg"
                        active={selectedBank === 'Davivienda' ? 'active' : ''}
                        action={creditDavivienda}
                    ></BankButton>
                </div>
                <h1>{title}</h1>
                <div className="form-group">
                    <input
                        type="text"
                        name="pre_approved"
                        className="pre__approved"
                        value={isLoading ? 'Cargando...' : peso.format(maximunQuota || 0)}
                        readOnly
                        style={{ width: '300px', height: '40px' }}
                    />
                </div>
                <div className="inputs">
                    <div className="form-group">
                        <label>Cuota mensual </label>
                        <input
                            className="font-medium"
                            type="text"
                            name="monthly_fee"
                            value={isLoading ? 'Cargando...' : peso.format(quota || 0)}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label>Tipo de Crédito </label>
                        <input
                            className="font-medium"
                            type="text"
                            name=""
                            value={isLoading ? 'Cargando...' : typeCredit}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label>Modalidad de Cuota </label>
                        <input
                            className="font-medium"
                            type="text"
                            name=""
                            value={isLoading ? 'Cargando...' : modality}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label>Plazo en años </label>
                        <input
                            className="font-medium"
                            type="text"
                            name=""
                            value={isLoading ? 'Cargando...' : time_limit}
                            readOnly
                        />
                    </div>
                </div>
                <Details />
            </section>
        </>
    )
}
