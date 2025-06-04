import { Controller } from 'react-hook-form'
import { reverseFormat, peso } from '../helpers/formatCurrency'

export const MoneyField = ({ name, control, rules, error, label, tippy }) => {
    return (
        <Controller
            name={name}
            control={control}
            defaultValue=""
            rules={rules}
            render={({ field }) => (
                <div className={`form-group`}>
                    <label>{label}</label>
                    <div className={`input-field`}>
                        <input
                            type="text"
                            {...field}
                            onChange={(e) => {
                                const numericValue =
                                    e.target.value.length === 1
                                        ? parseInt(e.target.value)
                                        : parseInt(reverseFormat(e.target.value))
                                field.onChange(numericValue)
                            }}
                            value={isNaN(field.value) ? peso.format(0) : peso.format(field.value)}
                        /> {tippy}
                        {error && (
                            <p className="message__error">Este campo es requerido</p>
                        )}
                    </div>
                </div>
            )}
        />
    )
}
