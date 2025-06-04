import { useContext } from 'react'
import { AppContext } from '@/context/AppContext'
import { InputField } from '@/components/fields/InputField'
import { SelectField } from '@/components/fields/SelectField'
import { FieldsetLegend } from '@/components/fields/FieldsetLegend'
import { validateBirthdate } from '../../helpers/validateBirthdate'
import { validateYear } from '../../helpers/validateYear'
export const PersonalData = ({ options: { register, watch, errors, readOnly = false }, showTitle = true }) => {
    const {
        selectOptions: {
            typeDocuments,
            countries,
            typeDocumentsImmigration,
            statusMigratories,
            stateMarital,
            levelStudy,
            options,
            cities,
        },
    } = useContext(AppContext)
    const housingType = watch('housing_type')
    return (
        <fieldset className="relative w-full flex flex-wrap md:grid md:grid-cols-4 gap-y-4 mb-12 pt-14 pb-8 px-4 bg-gray-50 rounded-xl shadow-[4px_4px_4px_0_rgba(48,48,48,.5882352941),-5px_-5px_3px_0_#fff]">
            {showTitle && <FieldsetLegend>Datos personales</FieldsetLegend>}
            <InputField
                options={{
                    name: 'name', label: 'Nombre', register, type: 'text', required: true, error: errors.name,
                    disabled: readOnly, pattern: /^[A-Za-z\s]+$/
                }}
            />
            <InputField
                options={{
                    name: 'last_name',
                    label: 'Apellido',
                    register,
                    type: 'text',
                    required: true,
                    pattern: /^[A-Za-z\s]+$/,
                    error: errors.last_name,
                    disabled: readOnly
                }}
            />
            <SelectField
                options={{ name: 'gender', label: 'Genero', register, opts: options?.gender, isIdValue: false, disabled: readOnly }}
            />
            <InputField
                options={{
                    name: 'email',
                    label: 'E-mail',
                    register,
                    type: 'text',
                    required: true,
                    error: errors.email,
                    disabled: readOnly
                }}
            />
            <InputField options={{ name: 'phone_number', label: 'Celular', register, type: 'text', disabled: readOnly }} />
            <SelectField
                options={{
                    name: 'Identification.national_document_id',
                    label: 'Tipo de documento colombiano',
                    register,
                    required: true,
                    opts: typeDocuments,
                    isIdValue: true,
                    error: errors.Identification?.national_document_id,

                    disabled: readOnly
                }}
            />
            <InputField
                options={{
                    name: 'Identification.national_document_number',
                    label: 'Número de identificación',
                    register,
                    type: 'text',
                    required: true,
                    error: errors.Identification?.national_document_number,
                    disabled: readOnly
                }}
            />
            <InputField
                options={{
                    name: 'Identification.national_document_expidition_date',
                    label: 'Expedición documento colombiano',
                    register,
                    required: true,
                    type: 'date',
                    validate: validateYear,
                    error: errors.Identification?.national_document_expidition_date,
                    disabled: readOnly
                }}
            />
            <InputField
                options={{
                    name: 'place_of_document_expedition',
                    label: 'Lugar expedición documento colombiano',
                    register,
                    type: 'text',
                    disabled: readOnly
                }}
            />
            <InputField
                options={{
                    name: 'birthdate',
                    label: 'Fecha de nacimiento',
                    register,
                    type: 'date',
                    required: true,
                    validate: validateBirthdate,
                    error: errors?.birthdate,
                    disabled: readOnly
                }}
            />
            <SelectField
                options={{
                    name: 'place_of_birth',
                    label: 'Lugar nacimiento',
                    register,
                    opts: cities,
                    isIdValue: false,
                    error: errors?.city_id,
                }}
            />
            <SelectField
                options={{
                    name: 'nationality_id',
                    label: 'Nacionalidad',
                    register,
                    required: true,
                    opts: countries,
                    isIdValue: true,
                    error: errors?.nationality_id,
                    disabled: readOnly
                }}
            />
            <SelectField
                options={{
                    name: 'country_id',
                    label: 'País de residencia',
                    register,
                    required: true,
                    opts: countries,
                    isIdValue: true,
                    error: errors?.country_id,
                    disabled: readOnly
                }}
            />
            <InputField
                options={{
                    name: 'city_of_residence',
                    label: 'Ciudad de residencia',
                    register,
                    type: 'text',
                    disabled: readOnly
                }}
            />
            <InputField
                options={{
                    name: 'address',
                    label: 'Dirección de residencia',
                    register,
                    type: 'text',
                    disabled: readOnly
                }}
            />
            <SelectField
                options={{
                    name: 'Identification.immigration_document_id',
                    label: 'Tipo de documento (país residencia)',
                    register,
                    required: true,
                    opts: typeDocumentsImmigration,
                    isIdValue: true,
                    error: errors?.Identification?.immigration_document_id,
                    disabled: readOnly
                }}
            />
            <InputField
                options={{
                    name: 'Identification.immigration_document_number',
                    label: 'Número de identificación (país residencia)',
                    register,
                    required: true,
                    type: 'text',
                    error: errors?.Identification?.immigration_document_number,
                    disabled: readOnly
                }}
            />
            <InputField
                options={{
                    name: 'Identification.immigration_document_expiration_date',
                    label: 'Fecha de vencimiento',
                    register,
                    required: true,
                    type: 'date',
                    validate: validateYear,
                    error: errors?.Identification?.immigration_document_expiration_date,
                    disabled: readOnly
                }}
            />
            <InputField
                options={{
                    name: 'arrival_date',
                    label: 'Fecha llegada al país de residencia',
                    register,
                    required: true,
                    type: 'date',
                    validate: validateYear,
                    error: errors?.arrival_date,
                    disabled: readOnly
                }}
            />
            <SelectField
                options={{
                    name: 'marital_status_id',
                    label: 'Estado civil',
                    register,
                    opts: stateMarital,
                    isIdValue: true,
                    disabled: readOnly
                }}
            />
            <SelectField
                options={{
                    name: 'education_level_id',
                    label: 'Nivel de estudio',
                    register,
                    opts: levelStudy,
                    isIdValue: true,
                    disabled: readOnly
                }}
            />
            <SelectField
                options={{
                    name: 'migratory_id',
                    label: 'Estado migratorio',
                    register,
                    required: true,
                    opts: statusMigratories,
                    isIdValue: true,
                    error: errors?.migratory_id,
                    disabled: readOnly
                }}
            />
            <InputField
                options={{
                    name: 'profession',
                    label: 'Profesión',
                    register,
                    type: 'text',
                    disabled: readOnly
                }}
            />
            <SelectField
                options={{
                    name: 'housing_type',
                    label: 'Tipo de vivieda',
                    register,
                    opts: options?.housingType,
                    isIdValue: false,
                    disabled: readOnly
                }}
            />
            {housingType === 'Alquiler' && (
                <>
                    <InputField
                        options={{
                            name: 'ownership_name',
                            label: 'Nombre del arrendador',
                            register,
                            type: 'text',
                            disabled: readOnly
                        }}
                    />
                    <InputField
                        options={{
                            name: 'ownership_phone',
                            label: 'Teléfono del arrendador',
                            register,
                            type: 'text',
                            disabled: readOnly
                        }}
                    />
                    <InputField
                        options={{
                            name: 'people_paying',
                            label: 'Cuántas personas pagan el arriendo',
                            register,
                            type: 'text',
                            disabled: readOnly
                        }}
                    />
                </>
            )}
            <InputField
                options={{
                    name: 'time_at_home',
                    label: 'Tiempo que lleva en la vivienda',
                    register,
                    type: 'text',
                    disabled: readOnly
                }}
            />
        </fieldset>
    )
}
