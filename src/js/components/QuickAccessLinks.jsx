import { Link, useParams } from 'react-router-dom'
import { GoBackButton } from '@/components/GoBackButton'

import { useContext } from 'react'
import { DataTablesContext } from '../context/DataTablesContext'
export const QuickAccessLinks = ({ setOpen }) => {
    const { id } = useParams()
    const {
        clientData: { Identification },
    } = useContext(DataTablesContext)
    return (
        <nav className="py-4">
            <ul className="flex justify-between items-center w-full text-sm text-gold-500 font-bold">
                <li className="mr-auto">
                    <GoBackButton label="Atrás" goBack={true} />
                </li>
                <li className="ml-4">
                    <Link to={`/clientes/${id}/detalle`}>Consolidado</Link>
                </li>
                <li className="ml-4">
                    <Link to={`/clientes/historial/${id}`}>Historial</Link>
                </li>
                <li className="ml-4">
                    <button
                        type={'button'}
                        onClick={() => {
                            setOpen(true)
                        }}
                    >
                        Actualizar resultado
                    </button>
                </li>
                <li className="ml-4">
                    <button
                        type={'button'}
                        onClick={async () => {
                            await navigator.clipboard.writeText(
                                `${import.meta.env.VITE_API_URL_PAGE}documents-upload?client=${
                                    Identification?.national_document_number
                                }`
                            )
                            alert('enlace copiado en el porta papeles')
                            console.log(
                                `${import.meta.env.VITE_API_URL_PAGE}documents-upload?client=${
                                    Identification?.national_document_number
                                }`
                            )
                        }}
                    >
                        Generar link documentos
                    </button>
                </li>
            </ul>
        </nav>
    )
}
