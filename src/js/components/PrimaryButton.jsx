import { Link } from 'react-router-dom'

export const PrimaryButton = ({ options: { link, action, type, label, isDisabled = false } }) => {
    if (type === 'submit') {
        return (
            <button
                disabled={isDisabled}
                type="submit"
                className={`text-white bg-azure-700 hover:bg-azure-800 focus:ring-4 focus:outline-none focus:ring-gold-200 font-medium rounded-2xl text-base w-full max-w-fit px-5 py-2.5 text-center border border-gold-400 shadow-lg hover:shadow-inner transition-colors mt-4  ${isDisabled && 'opacity-40'
                    }`}
            >
                {label}
            </button>
        )
    }
    if (type === 'button') {
        return (
            <button
                disabled={isDisabled}
                type="button"
                onClick={action}
                className={`text-white bg-azure-700 hover:bg-azure-800 focus:ring-4 focus:outline-none focus:ring-gold-200 font-medium rounded-2xl text-base w-full max-w-fit px-5 py-2.5 text-center border border-gold-400 shadow-lg hover:shadow-inner transition-colors mt-4 ${isDisabled && 'opacity-40'
                    }`}
            >
                {label}
            </button>
        )
    }
    return (
        <Link
            to={link}
            className="text-white bg-azure-700 hover:bg-azure-800 focus:ring-4 focus:outline-none focus:ring-gold-200 font-medium rounded-2xl text-base w-full max-w-fit px-5 py-2.5 text-center border border-gold-400 shadow-lg hover:shadow-inner transition-colors mt-4"
        >
            {label}
        </Link>
    )
}
