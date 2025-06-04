export const RadioField = ({ options: { name, label, field_id, action, checked, disabled } }) => {
    return (
        <div className="flex items-center">
            <input
                id={field_id}
                type="radio"
                name={name}
                className="w-4 h-4 text-azure-700 bg-gray-100 border-gray-300 focus:ring-gold-400 dark:focus:ring-gold-400 checked:border-gold-400  accent-gold-400"
                checked={checked}
                onChange={action}
                disabled={disabled}
            />
            <label htmlFor={field_id} className="ml-2 text-sm font-bold text-azure-700">
                {label}
            </label>
        </div>
    )
}
