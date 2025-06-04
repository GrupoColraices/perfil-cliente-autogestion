
export const ButtonTab = ({ text, type, onClick, onInput, onChange, customClass, disabled }) => {
    return (
        <button
            type={type}
            onClick={onClick}
            onInput={onInput}
            onChange={onChange}
            className={`max-w-fit flex items-center p-5 justify-around border border-gold-400 from-azure-800 to-azure-700 rounded-xl transition-all duration-200 ease-in-out shadow-lg hover:shadow-inner text-white font-medium h-[35px] w-[180px] hover:to-azure-600 ${disabled ? 'cursor-not-allowed bg-azure-800/50' : 'cursor-pointer bg-gradient-to-b'} ${customClass} `}
            disabled={disabled}
        >
            {text}
        </button>
    )
}
