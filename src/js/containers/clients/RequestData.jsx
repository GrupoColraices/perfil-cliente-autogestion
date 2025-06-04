import { useContext, useEffect, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import { AppContext } from '@/context/AppContext'
import { InputField } from '@/components/fields/InputField'
import { SelectField } from '@/components/fields/SelectField'
import { CurrencyField } from '@/components/fields/CurrencyField'
import { RadioField } from '@/components/fields/RadioField'
import { AddFieldArray } from '@/components/fields/AddFieldArray'
import { RemoveFieldArray } from '@/components/fields/RemoveFieldArray'
import { FieldsetLegend } from '@/components/fields/FieldsetLegend'
import { validateCoownersIncomes } from '../../helpers/validateCoownersIncomes'
import { authorizationCheckboxes } from '../../helpers/options'
import { CheckboxWithLink } from '../../components/CheckboxWithLink '

export const RequestData = ({
    options: { register, control, watch, errors, readOnly = false, getDataClient = {} },
}) => {
    const [checked, setChecked] = useState(false)
    const {
        selectOptions: {
            relationships,
            creditTypes,
            nationalities,
            feeTypes,
            propertyTypes,
            cities,
            options,
            visOptions,
        },
    } = useContext(AppContext)
    console.log({ visOptions })
    console.log(watch('Property.isVis'), 'isVis')
    const {
        fields: coownerFields,
        append: coownerAppend,
        remove: coownerRemove,
    } = useFieldArray({
        control,
        name: 'Coowners',
    })
    const hasProperty = watch('Property')
    const coowners = watch('Coowners')
    const typeCredit = watch('Request.credit_id')
    const disableCoownerIncomes = validateCoownersIncomes(coowners)

    useEffect(() => {
        if (hasProperty) setChecked(true)
    }, [hasProperty])
    return (
        <fieldset className="relative mb-12 pt-14 pb-6 bg-gray-50 rounded-xl shadow-[4px_4px_4px_0_rgba(48,48,48,.5882352941),-5px_-5px_3px_0_#fff] px-4">
            <FieldsetLegend>Información de la solicitud</FieldsetLegend>
            <div className="md:grid md:grid-cols-4 gap-y-4 mb-4">
                <SelectField
                    options={{
                        name: 'Request.credit_id',
                        label: 'Tipo de crédito',
                        register,
                        opts: creditTypes,
                        isIdValue: true,
                        errors,
                        required: true,
                        error: errors.Request?.credit_id,
                        disabled: readOnly,
                    }}
                />
                {Number(typeCredit) === 2 && (
                    <InputField
                        options={{
                            name: 'Request.purchase_option',
                            label: 'Opción de compra %',
                            register,
                            required: true,
                            disabled: readOnly,
                        }}
                    />
                )}
                <CurrencyField
                    options={{
                        name: 'Request.credit_value',
                        label: 'Valor del crédito',
                        control,
                        error: errors.Request?.credit_value,
                    }}
                    rules={{ required: true }}
                />
                <SelectField
                    options={{
                        name: 'Request.fee_type_id',
                        label: 'Modalidad de cuota',
                        register,
                        required: true,
                        opts: feeTypes,
                        isIdValue: true,
                        error: errors.Request?.fee_type_id,
                        disabled: readOnly,
                    }}
                />
                <InputField
                    options={{
                        name: 'Request.time_limit',
                        type: 'number',
                        label: 'Plazo en años',
                        min: 5,
                        register,
                        required: true,
                        errors,
                        error: errors.Request?.time_limit,
                        disabled: readOnly,
                    }}
                />
                <CurrencyField
                    options={{
                        name: 'Request.own_resources',
                        label: 'Recursos propios',
                        control,
                        disabled: readOnly,
                        info: 'Digite el valor en pesos colombianos.',
                    }}
                />
            </div>
            <div className="shadow-inner rounded-lg py-3 border-b border-b-gold-400/25 mb-3">
                <h4 className="font-bold text-azure-700 uppercase border-b-2 border-gold-400 max-w-fit mb-4 ml-2 text-sm">
                    Cotitulares
                </h4>
                {coownerFields.map((field, index) => (
                    <div key={field.id} className="w-full md:grid md:grid-cols-4 gap-y-4 mb-4 rounded-lg py-3">
                        {/* <InputField
                            options={{
                                name: `Coowners.${index}.coowner_code`,
                                label: 'Código del cotitular',
                                register,
                                type: 'text',
                                disabled: readOnly
                            }}
                        /> */}
                        <InputField
                            options={{
                                name: `Coowners.${index}.coowner_name`,
                                label: 'Nombre cotitular',
                                register,
                                type: 'text',
                                disabled: readOnly,
                            }}
                        />
                        <InputField
                            options={{
                                name: `Coowners.${index}.coowner_email`,
                                label: 'Email cotitular',
                                register,
                                type: 'email',
                                disabled: readOnly,
                            }}
                        />
                        <SelectField
                            options={{
                                name: `Coowners.${index}.relationship_id`,
                                label: 'Parentesco',
                                register,
                                opts: relationships,
                                isIdValue: true,
                                disabled: readOnly,
                            }}
                        />
                        <SelectField
                            options={{
                                name: `Coowners.${index}.nationality_id`,
                                label: 'Nacionalidad del cotitular',
                                register,
                                opts: nationalities,
                                isIdValue: true,
                                disabled: readOnly,
                            }}
                        />
                        <CurrencyField
                            options={{
                                name: `Coowners.${index}.incomes`,
                                label: 'Ingresos certificados',
                                control,
                                info: 'Digita el valor en la moneda local del titular.',
                                disabled:
                                    (disableCoownerIncomes &&
                                        (coowners?.incomes !== undefined || isNaN(coowners?.incomes))) ||
                                    readOnly,
                            }}
                        />
                        {!readOnly && (
                            <RemoveFieldArray
                                options={{
                                    remove: coownerRemove,
                                    index,
                                    typeRegister: { data: getDataClient?.Coowners, name: 'coowners' },
                                }}
                            />
                        )}
                    </div>
                ))}
                {!readOnly && coownerFields.length < 1 && (
                    <p className="text-center text-lg mb-3">
                        Si requiere agregar un cotitular adicional, hágalo dando clic en el siguiente botón.
                    </p>
                )}

                {!readOnly && (
                    <AddFieldArray
                        options={{
                            append: coownerAppend,
                            disabled: coownerFields.length == +1 && true,
                            label: 'Agregar cotitular',
                            field: {
                                coowner_code: '',
                                coowner_name: '',
                                coowner_email: '',
                                relationship_id: '',
                                nationality_id: '',
                                coowner_incomes: '',
                            },
                        }}
                    />
                )}
            </div>
            <div className="shadow-inner rounded-lg py-3 border-b border-b-gold-400/25 mb-3">
                <h4 className="font-bold text-azure-700 uppercase border-b-2 border-gold-400 max-w-fit mb-4 ml-2 text-sm">
                    Inmueble
                </h4>

                <div className="w-full grid place-items-center mb-4">
                    <span className="font-semibold text-azure-700">¿Tiene inmueble definido?</span>
                    <div className="flex items-center gap-x-4">
                        <RadioField
                            options={{
                                name: 'defined_property',
                                label: 'Si',
                                field_id: 'property_yes',
                                action: () => setChecked(true),
                                checked,
                                disabled: readOnly,
                            }}
                        />
                        <RadioField
                            options={{
                                name: 'defined_property',
                                label: 'No',
                                field_id: 'property_not',
                                action: () => setChecked(false),
                                checked: !checked,
                                disabled: readOnly,
                            }}
                        />
                    </div>
                </div>

                {checked && (
                    <div className="md:grid md:grid-cols-4 gap-y-4 mb-4">
                        <CurrencyField
                            options={{
                                name: 'Property.property_value',
                                label: 'Valor del inmueble',
                                control,
                                disabled: readOnly,
                            }}
                        />
                        <SelectField
                            options={{
                                name: 'Property.property_class',
                                label: 'Clase de inmueble',
                                register,
                                opts: options?.propertyClass,
                                isIdValue: false,
                                disabled: readOnly,
                            }}
                        />
                        <SelectField
                            options={{
                                name: 'Property.property_type_id',
                                label: 'Tipo de inmueble',
                                register,
                                required: checked,
                                opts: propertyTypes,
                                isIdValue: true,
                                error: errors?.Property?.property_type_id,
                                disabled: readOnly,
                            }}
                        />
                        <SelectField
                            options={{
                                name: 'Property.isVis',
                                label: 'Modalidad de vivienda',
                                register,
                                required: true,
                                opts: visOptions,
                                error: errors?.Property?.isVis,
                                disabled: readOnly,
                            }}
                        />
                        <SelectField
                            options={{
                                name: 'Property.property_purpose',
                                label: 'Destino del inmueble',
                                register,
                                opts: options?.propertyPurpose,
                                isIdValue: false,
                                disabled: readOnly,
                            }}
                        />
                        <InputField
                            options={{
                                name: 'Property.project_name',
                                label: 'Nombre del proyecto',
                                register,
                                type: 'text',
                                disabled: readOnly,
                            }}
                        />
                        <div className="grid grid-cols-2">
                            <InputField
                                options={{
                                    name: 'Property.tower',
                                    label: 'Torre',
                                    register,
                                    type: 'text',
                                    disabled: readOnly,
                                }}
                            />
                            <InputField
                                options={{
                                    name: 'Property.unit',
                                    label: 'Unidad',
                                    register,
                                    type: 'text',
                                    disabled: readOnly,
                                }}
                            />
                        </div>
                        <SelectField
                            options={{
                                name: 'Property.parquing',
                                label: 'Parqueadero',
                                register,
                                validate: (value) => value !== '',
                                opts: [
                                    { id: true, name: 'Si' },
                                    { id: false, name: 'No' },
                                ],
                                isIdValue: false,
                                error: errors?.parquing,
                            }}
                        />
                        <CurrencyField
                            options={{
                                name: 'Property.deposit',
                                label: 'Depósito',
                                control,
                                disabled: readOnly,
                            }}
                        />
                        <InputField
                            options={{
                                name: 'Property.property_address',
                                label: 'Dirección',
                                register,
                                type: 'text',
                                disabled: readOnly,
                            }}
                        />
                        <InputField
                            options={{
                                name: 'Property.neighborhood',
                                label: 'Barrio',
                                register,
                                type: 'text',
                                disabled: readOnly,
                            }}
                        />
                        <SelectField
                            options={{
                                name: 'Property.city_id',
                                label: 'Ciudad',
                                register,
                                required: checked,
                                opts: cities,
                                isIdValue: true,
                                error: errors?.Property?.city_id,
                                disabled: readOnly,
                            }}
                        />
                        <InputField
                            options={{
                                name: 'Property.stratum',
                                label: 'Estrato',
                                register,
                                required: checked,
                                type: 'number',
                                error: errors?.Property?.stratum,
                                disabled: readOnly,
                            }}
                        />
                        <InputField
                            options={{
                                name: 'Property.deadline',
                                label: 'Fecha de entrega',
                                register,
                                required: checked,
                                type: 'date',
                                error: errors?.Property?.deadline,
                                disabled: readOnly,
                            }}
                        />
                        <InputField
                            options={{
                                name: 'Property.seller_name',
                                label: 'Nombre del vendedor',
                                register,
                                type: 'text',
                                disabled: readOnly,
                            }}
                        />
                        <SelectField
                            options={{
                                name: 'Property.document_type',
                                label: 'Tipo de documento',
                                register,
                                opts: options?.typeDocument,
                                isIdValue: false,
                                disabled: readOnly,
                            }}
                        />
                        <InputField
                            options={{
                                name: 'Property.document_number',
                                label: 'Número de documento',
                                register,
                                type: 'number',
                                disabled: readOnly,
                            }}
                        />
                        <InputField
                            options={{
                                name: 'Property.construtor_name',
                                label: 'Constructora',
                                register,
                                type: 'text',
                                disabled: readOnly,
                            }}
                        />
                        <InputField
                            options={{
                                name: 'Property.construtor_address',
                                label: 'Dirección de la constructora',
                                register,
                                type: 'text',
                                disabled: readOnly,
                            }}
                        />
                        <InputField
                            options={{
                                name: 'Property.construtor_email',
                                label: 'Email de la constructora',
                                register,
                                type: 'text',
                                disabled: readOnly,
                            }}
                        />
                        <InputField
                            options={{
                                name: 'Property.construtor_phone',
                                label: 'Teléfono de la constructora',
                                register,
                                type: 'tel',
                                disabled: readOnly,
                            }}
                        />
                    </div>
                )}
            </div>
            <div className="w-full flex flex-col lg:flex-row justify-around">
                {authorizationCheckboxes.map((checkbox) => (
                    <CheckboxWithLink
                        key={checkbox.name}
                        name={checkbox.name}
                        link={checkbox.link}
                        label={checkbox.label}
                        register={register}
                    />
                ))}
            </div>
        </fieldset>
    )
}
