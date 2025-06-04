import { useNavigate } from 'react-router-dom'
import { PrimaryButton } from '@/components/PrimaryButton'
import toast from 'react-hot-toast'
const { VITE_API_URL } = import.meta.env
export const ValidateClient = ({ setSearchClient, reset, setIsEdit }) => {
    const findClient = async (e) => {
        e.preventDefault()
        const national_document_number = e.target.national_document_number.value
        toast.loading('Validando cliente...', { duration: 2000 })
        setTimeout(async () => {
            const resp = await fetch(`${VITE_API_URL}/clients/validation`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ national_document_number }),
            })
            const data = await resp.json()
            if (data?.client_id) {
                reset(data.client_data)
                toast.success('Cliente registrado, procede a editar.')
                setSearchClient(false)
                setIsEdit(true)
            } else {
                toast.error('No existe el cliente, procede a crearlo.')
                setSearchClient(false)
            }
        }, 2000)
    }
    return (
        <form onSubmit={findClient} className="w-full md:w-1/2 mx-auto bg-white p-6 rounded-xl shadow-sm">
            <label className="mb-1 text-sm font-bold text-secondary-700 grid gap-2 text-center">
                Digite la cédula del cliente
                <input
                    type="text"
                    placeholder="Documento de identidad colombiano"
                    name="national_document_number"
                    className="bg-gray-50 border border-secondary-300 text-secondary-500 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-secondary-400 focus:border-secondary-400 block w-full p-2 hover:shadow-md transition-shadow text-center"
                    required
                />
            </label>
            <div className="w-full flex justify-center">
                <PrimaryButton options={{ label: 'Verificar', type: 'submit' }} />
            </div>
        </form>
    )
}
