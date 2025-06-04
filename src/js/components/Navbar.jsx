import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
const { VITE_PREAPROBADO_URL } = import.meta.env

export const Navbar = ({ children = 'Dashboard' }) => {
    const [showMessage, setShowMessage] = useState(false)
    const { isAuth, removeAuth } = useContext(AuthContext)

    const handleCopyLink = () => {
        const gestorCode = window.localStorage.getItem('gestorCode')
        const link = `${VITE_PREAPROBADO_URL}/?codigo_gestor=${gestorCode}`
        navigator.clipboard.writeText(link)
        setShowMessage(true)
        setTimeout(() => setShowMessage(false), 1500)
    }

    return (
        <div className="bg-white py-2 px-8 flex justify-between items-center max-h-18 w-full sticky top-0 z-30 shadow-sm  ">
            <h1 className="text-azure-700  font-semibold text-xl">
                {children}
                <span className="block  text-sm text-gray-400 font-normal">Gestionar {children}</span>
            </h1>
            <div className="group relative min-w-[200px]">
                <button className=" text-azure-700 font-semibold rounded inline-flex items-center ">
                    <span className="mr-1">
                        {isAuth.username} | <span className="font-normal text-gold-400">{isAuth?.role_name}</span>
                    </span>
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                    </svg>
                </button>
                <ul className="absolute hidden text-gray-700 group-hover:block w-full bg-white border border-gray-100 min-w-fit">
                    <li className="">
                        <button
                            type="button"
                            onClick={removeAuth}
                            href="#"
                            className="text-azure-600 rounded text-sm bg-white hover:bg-gray-100 hover:text-azure-900 py-2 px-4 flex gap-1 w-full justify-center"
                        >
                            Cerrar sesión
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                    </li>
                    <li>
                        <button
                            type="button"
                            onClick={handleCopyLink}
                            className="text-azure-600 rounded text-sm bg-white hover:bg-gray-100 hover:text-azure-900 py-2 px-4 flex gap-1 w-full justify-center"
                        >
                            Link Preaprobado
                        </button>
                    </li>
                </ul>
                {showMessage && (
                    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-500 text-white text-xs py-1 px-3 rounded shadow-md transition-opacity duration-500">
                        Link copiado al portapapeles
                    </div>
                )}
            </div>
        </div>
    )
}
