import { Controller } from 'react-hook-form';
import { peso, reverseFormat } from '../../helpers/formatCurrency';
import Tippy from '@tippyjs/react';

export const CurrencyField = ({
  options: { name, control, label, value, error, disabled, customClass, info },
  rules,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <div className="w-full px-2">
          <label
            htmlFor={name}
            className="flex gap-1 mb-1 text-xs font-bold text-azure-700"
          >
            {label}
            {info && (
              <Tippy content={info} size="small">
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
          <input
            type="text"
            className={`bg-gray-50 border text-gold-500 text-sm rounded-lg focus:outline-none focus:ring-1 block w-full p-2 hover:shadow-md transition-shadow 
              ${disabled ? 'bg-azure-200/40 text-azure-600 cursor-not-allowed' : ''}
              ${error ? 'border-red-500 focus:ring-red-500' : 'border-gold-300 focus:ring-gold-400'}
              ${customClass}`}
            {...field}
            onChange={(e) =>
              field.onChange(
                e.target.value.length === 1
                  ? parseFloat(e.target.value)
                  : parseFloat(reverseFormat(e.target.value))
              )
            }
            value={
              isNaN(value ? value : field.value)
                ? peso.format('0')
                : peso.format(value ? value : field.value)
            }
            placeholder={label}
            readOnly={disabled}
          />
          {error?.message && <p className="text-red-600 text-xs">{error.message}</p>}
        </div>
      )}
    />
  );
};
