import React from 'react'
export const Input = ({
    type,
    name,
    label,
    placeholder,
    register,
    options,
    readonly,
    required,
    error,
    min,
    maximo,
    minimo,
    pattern,
    children,
    tippy,
    action,
    value,
    number,
    customInput,
    customSelect,
    prefix,
    onlyNumbers,
    defaultValue,
    customClass,
    field,
    validate,
    onChange,
}) => {
 
    if (type === 'select') {
        return (
            <div className={`form-group ${customInput} ${customClass}`}>
                <label>
                    {label}
                    {tippy}
                </label>

                <>
                    <select
                        {...register(name, { required: required })}
                        onChange={(e) => onChange(name, e.target.value)}
                        value={value}
                        className={`${customSelect ? customSelect : ''}`}
                        onInput={action}
                        
                    >
                        <option value="">
                            {placeholder}{' '}
                        </option>

                        {options?.map((date) =>
                            date?.created_at || !date?.name ? (
                                <option key={date.id} value={date.id}>
                                    {date?.[prefix]}
                                </option>
                            ) : prefix === 'name' ? (
                                <option key={date.id} value={date.id}>
                                    {date?.[prefix]}
                                </option>
                            ) : (
                                <option key={date.id} value={date.value}>
                                    {date.name}
                                </option>
                            )
                        )}
                    </select>
                    {children}
                    {error && <p>Este campo es requerido</p>}
                </>
            </div>
        )
    } else if (type === 'hidden') {
        ;<div className={`form-group ${customClass}`}>
            <div className="input-field">
                <input
                    {...register(name, { required: required })}
                    readOnly={readonly}
                    type={type}
                    defaultValue={value}
                />
            </div>
        </div>
    } else {
        return (
            <div className={`form-group ${customInput ? customInput : ''} ${customClass ? customClass : ''}`}>
                <label>
                    {label}
                    {tippy}
                </label>
                <div className={`input-field`}>
                    <input
                        {...register(name, {
                            required: required,
                            minLength: min,
                            min: minimo,
                            max: maximo,
                            pattern: pattern,
                            validate,
                        })}
                        type={type}
                        defaultValue={defaultValue}
                        onInput={action}
                        onKeyDown={onlyNumbers}
                        value={value}
                        min={min}
                        placeholder={placeholder}
                        onWheel={(e) => e.target.blur()}
                        readOnly={readonly}
                        
                    />
                    {children}
                    {error?.type === "required" && <p className='message__error'>Este campo es requerido</p>}
                    {error?.type === "pattern" && (<p className='message__error'>El nombre solo debe contener letras y espacios. No se permiten números ni caracteres especiales.</p>)}
                    {error?.type === "minLength" && (<p className='message__error'>Minimo cinco caracteres</p>)}
                    {error?.type === "max" && (<p className='message__error'>{name === "Request.time_limit" ? "Plazo en años maximo 30 años" : "Porcentaje máximo 30 %"}</p>)}
                    {error?.type === "min" && (<p className='message__error'>{name === "Request.time_limit" ? "Plazo en años minimo 5 años" : "Porcentaje mínimo 1 %"}</p>)}
                    {error?.type === "validate" && (<p className='message__error'>La fecha de nacimiento debe indicar una edad entre 18 y 71 años.</p>)}
                </div></div>
        )
    }
}
