import { useContext, useEffect, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import { differenceInMonths } from 'date-fns'
import { AppContext } from '@/context/AppContext'
import { InputField } from '@/components/fields/InputField'
import { SelectField } from '@/components/fields/SelectField'
import { CurrencyField } from '@/components/fields/CurrencyField'
import { FieldsetLegend } from '@/components/fields/FieldsetLegend'
import { AddFieldArray } from '@/components/fields/AddFieldArray'
import { RemoveFieldArray } from '@/components/fields/RemoveFieldArray'
import { validateYear } from '../../helpers/validateYear'

export const LaboralData = ({ options: { register, watch, control, errors, readOnly, getDataClient = {} } }) => {
    const [employmentStartDate, setEmploymentStartDate] = useState([])
    const [diffMonths, setMonths] = useState([])
    const {
        selectOptions: { economicActivities, contractTypes, options },
    } = useContext(AppContext)

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'Employments',
    })
    useEffect(() => {
        if (employmentStartDate.length === 0) setEmploymentStartDate(watch('Employments'))
        setMonths(
            employmentStartDate.map((date) => {
                if (date.employment_start_date) {
                    return differenceInMonths(new Date(), new Date(date.employment_start_date))
                }
                return differenceInMonths(new Date(), new Date(date))
            })
        )
    }, [employmentStartDate, watch])
    return (
        <fieldset className="w-full mb-12 relative bg-gray-50 rounded-xl shadow-[4px_4px_4px_0_rgba(48,48,48,.5882352941),-5px_-5px_3px_0_#fff] pt-14 pb-8 px-4">
            <FieldsetLegend>Datos laborales</FieldsetLegend>
            {fields.map((field, index) => (
                <div
                    key={field.id}
                    className="flex md:grid md:grid-cols-4 flex-wrap items-center gap-y-4 border-b border-gold-400/25 mb-8 py-3 shadow-inner rounded-lg"
                >
                    <InputField
                        options={{
                            name: `Employments.${index}.company_name`,
                            label: 'Nombre de la empresa',
                            register,
                            type: 'text',
                            disabled: readOnly
                        }}
                    />
                    <SelectField
                        options={{
                            name: `Employments.${index}.economic_activity_id`,
                            label: 'Actividad económica',
                            register,
                            opts: economicActivities,
                            isIdValue: true,
                            required: true,
                            error: errors?.Employments?.[index]?.economic_activity_id,
                            disabled: readOnly
                        }}
                    />
                    <InputField
                        options={{
                            name: `Employments.${index}.position`,
                            label: 'Cargo',
                            register,
                            type: 'text',
                            disabled: readOnly
                        }}
                    />
                    <SelectField
                        options={{
                            name: `Employments.${index}.contract_type_id`,
                            label: 'Tipo de contrato',
                            register,
                            required: true,
                            opts: contractTypes,
                            isIdValue: true,
                            error: errors?.Employments?.[index]?.contract_type_id,
                            disabled: readOnly
                        }}
                    />
                    <CurrencyField
                        options={{
                            name: `Employments.${index}.salary`,
                            control,
                            label: 'Salario mensual',
                            error: errors?.Employments?.[index]?.salary,
                            disabled: readOnly
                        }}
                        rules={{ required: true }}
                    />
                    <InputField
                        options={{
                            name: `Employments.${index}.employment_start_date`,
                            label: 'Fecha de ingreso',
                            register,
                            type: 'date',
                            action: (e) => {
                                const update = [...employmentStartDate]
                                update[index] = e.target.value
                                setEmploymentStartDate(update)
                            },
                            validate: validateYear,
                            required: true,
                            error: errors?.Employments?.[index]?.employment_start_date,
                            disabled: readOnly
                        }}
                    />
                    {diffMonths[index] < 6 && (
                        <>
                            <InputField
                                options={{
                                    name: `Employments.${index}.last_employment_entry`,
                                    label: 'Fecha de ingreso empleo anterior',
                                    register,
                                    type: 'date',
                                    validate: validateYear,
                                    required: diffMonths[index] < 6,
                                    error: errors.Employments?.[index]?.last_employment_entry,
                                    disabled: readOnly
                                }}
                            />
                            <InputField
                                options={{
                                    name: `Employments.${index}.last_employment_exit`,
                                    label: 'Fecha de retiro empleo anterior',
                                    register,
                                    required: diffMonths[index] < 6,
                                    type: 'date',
                                    validate: validateYear,
                                    error: errors.Employments?.[index]?.last_employment_exit,
                                    disabled: readOnly
                                }}
                            />
                        </>
                    )}
                    <InputField
                        options={{
                            name: `Employments.${index}.boss_name`,
                            label: 'Jefe inmediato',
                            register,
                            type: 'text',
                            disabled: readOnly
                        }}
                    />
                    <InputField
                        options={{
                            name: `Employments.${index}.phone_number`,
                            label: 'Teléfono',
                            register,
                            type: 'text',
                            disabled: readOnly
                        }}
                    />
                    <InputField
                        options={{
                            name: `Employments.${index}.address`,
                            label: 'Dirección',
                            register,
                            type: 'text',
                            disabled: readOnly
                        }}
                    />
                    <InputField
                        options={{
                            name: `Employments.${index}.city`,
                            label: 'Ciudad',
                            register,
                            type: 'text',
                            disabled: readOnly
                        }}
                    />
                    <SelectField
                        options={{
                            name: `Employments.${index}.payment_method`,
                            label: 'Modalidad de pago',
                            register,
                            opts: options?.paymentMethod,
                            isIdValue: false,
                            disabled: readOnly
                        }}
                    />
                    <SelectField
                        options={{
                            name: `Employments.${index}.payment_frequency`,
                            label: 'Frecuencia de pago',
                            register,
                            opts: options?.paymentFrequency,
                            isIdValue: false,
                            disabled: readOnly
                        }}
                    />
                    {!readOnly &&
                        <RemoveFieldArray options={{ remove, index, disabled: fields.length > 1 ? false : true, typeRegister: { data: getDataClient?.Employments, name: "employments" } }} />
                    }
                </div>
            ))}
            {!readOnly &&
                <AddFieldArray
                    options={{
                        append,
                        disabled: fields.length == 5 && true,
                        label: 'Agregar empleo',
                        field: {
                            company_name: '',
                            economic_activity_id: '',
                            position: '',
                            contract_type_id: '',
                            salary: '',
                            employment_start_date: '',
                            last_employment_entry: null,
                            last_employment_exit: null,
                            boss_name: '',
                            phone_number: '',
                            address: '',
                            city: '',
                            payment_method: '',
                            payment_frequency: '',
                        },
                    }}
                />
            }
        </fieldset>
    )
}
