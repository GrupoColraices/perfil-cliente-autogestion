import Tippy from '@tippyjs/react'

export const InputField = ({
    options: {
        name,
        label,
        register,
        type,
        action,
        value,
        disabled,
        info,
        required,
        error,
        validate,
        min,
        pattern,
        customClass,
        onChange,
    },
}) => {
    return (
        <div className="w-full px-2">
            {/* ✅ Label ajustable para móviles */}
            <label
                htmlFor={name}
                className="mb-1 text-xs font-bold text-azure-700 flex gap-2 items-center"
            >
                {label}
                {info && (
                    <Tippy content={info} placement="top" delay={100}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-4 h-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                            />
                        </svg>
                    </Tippy>
                )}
            </label>

            {/* ✅ Input responsive */}
            <input
                type={type}
                onInput={action}
                className={`bg-gray-50 border border-gold-300 text-gold-500 text-sm rounded-lg 
                    focus:outline-none focus:ring-1 focus:ring-gold-400 focus:border-gold-400 block w-full 
                    p-1 sm:p-2 hover:shadow-md transition-shadow
                    ${error && 'border-red-600 focus:border-red-600'} ${customClass}`}
                placeholder={label}
                value={value}
                onWheel={(e) => e.target.blur()}
                {...register(name, { required, validate, min, pattern })}
                disabled={disabled}
                onChange={onChange || register(name, { required, validate, min, pattern }).onChange}
            />

            {/* ✅ Mensajes de error responsivos */}
            {error?.type === 'required' && <p className="text-red-600 text-xs sm:text-sm">Este campo es obligatorio</p>}
            {error?.type === 'pattern' && <p className="text-red-600 text-xs sm:text-sm">Formato no válido</p>}
            {error?.type === 'min' && (
                <p className="text-red-600 text-xs sm:text-sm">
                    {name === 'Request.time_limit' ? 'Mínimo 5 años' : 'Mínimo 1%'}
                </p>
            )}
            {error && <p className="text-red-600 text-xs sm:text-sm">{error?.message}</p>}
        </div>
    )
}
