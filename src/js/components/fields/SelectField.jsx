import Tippy from '@tippyjs/react'
export const SelectField = ({
    options: { name, label, register, opts, isIdValue, disabled, info, required, error, validate, customClass },
}) => {
    const renderOptions = () => {
        //Select options for value vis and noVis
        if (opts && opts.length > 0 && typeof opts[0].value === 'boolean') {
            return opts.map((item) => (
              <option key={item.id} value={item.value.toString()}>
                {item.label}
              </option>
            ))
        }

        if (isIdValue) {
            //*Select options with id as value
            return opts?.map((item) => (
                <option key={item.id} value={item.id}>
                    {Object.values(item)[1]}
                </option>
            ))
        } else {
            //*Select options with name as value
            return opts?.map((item) => (
                <option key={item.id} value={Object.values(item)[1]}>
                    {Object.values(item)[1]}
                </option>
            ))
        }
    }
    return (
        <div className="w-full  min-h-full px-2">
            <label htmlFor="first_name" className={"flex gap-2 items-center mb-1 text-xs font-bold text-azure-700"}>
                {label}{' '}
                {info && (
                    <Tippy content={info} size={'small'}>
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
            <select {...register(name, { required: required, validate: validate })}
                type="text"
                className={`bg-gray-50 border border-gold-300 text-gold-500 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-gold-400 focus:border-gold-400 block w-full px-2 py-[8px] hover:shadow-md transition-shadow ${disabled ? 'bg-azure-300/40  text-azure-600 cursor-not-allowed' : ''} ${error && 'focus:outline-none focus:ring-0 border-red-600 focus:border-red-600'
                    } ${customClass}`}

                placeholder={label}
                disabled={disabled}
            >
                <option value="">Selecciona una opción</option>
                {renderOptions()}
            </select>
            {error && <p className="text-red-600 text-xs">Este campo es obligatorio</p>}
        </div>
    )
}
