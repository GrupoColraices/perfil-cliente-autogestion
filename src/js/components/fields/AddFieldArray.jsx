export const AddFieldArray = ({ options: { append, disabled, label, field } }) => {
    return (
        <div className="w-full">
            <button
                type="button"
                onClick={() => append(field)}
                disabled={disabled}
                className={`flex gap-1 mx-auto bg-gradient-to-r from-azure-900 to-azure-700 text-white font-medium rounded-2xl text-base w-full max-w-fit px-5 py-2.5 text-center border border-gold-400 shadow-lg hover:shadow-inner transition-colors ${
                    disabled && 'opacity-40'
                }`}
            >
                {label}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </button>
        </div>
    )
}
