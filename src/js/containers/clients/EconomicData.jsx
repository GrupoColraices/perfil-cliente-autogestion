import { useContext } from 'react'
import { useFieldArray } from 'react-hook-form'
import { AppContext } from '@/context/AppContext'
import { InputField } from '@/components/fields/InputField'
import { SelectField } from '@/components/fields/SelectField'
import { CurrencyField } from '@/components/fields/CurrencyField'
import { FieldsetLegend } from '@/components/fields/FieldsetLegend'
import { AddFieldArray } from '@/components/fields/AddFieldArray'
import { RemoveFieldArray } from '@/components/fields/RemoveFieldArray'


export const EconomicData = ({ options: { register, control, errors, watch, readOnly = false, getDataClient = {} } }) => {
    const {
        selectOptions: { currencies, incomeTypes, expenseTypes, options },
    } = useContext(AppContext)
    const {
        fields: incomeFields,
        append: incomeAppend,
        remove: incomeRemove,
    } = useFieldArray({
        control,
        name: 'Incomes',
    })
    const {
        fields: expenseFields,
        append: expenseAppend,
        remove: expenseRemove,
    } = useFieldArray({
        control,
        name: 'Expenses',
    })
    const {
        fields: financialFields,
        append: financialAppend,
        remove: financialRemove,
    } = useFieldArray({
        control,
        name: 'FinancialExpenses',
    })
    const {
        fields: patrimonyFields,
        append: patrimonyAppend,
        remove: patrimonyRemove,
    } = useFieldArray({
        control,
        name: 'Patrimonies',
    })
    const employments = watch('Employments')
    const incomes = watch('Incomes')
    const financialExpenses = watch('FinancialExpenses')
    const expenses = watch('Expenses')
    const negativesReports = watch('negative_reports')
    const salaryIncomes = employments?.reduce(
        (accumulator, employment) =>
            isNaN(employment?.salary) !== true ? accumulator + employment?.salary : accumulator, 0)
    const otherIncomes = incomes?.reduce(
        (accumulator, income) =>
            isNaN(income?.income_value) !== true ? accumulator + income.income_value : accumulator, 0)
    const financialExpense = financialExpenses?.reduce(
        (accumulator, fExpense) => isNaN(fExpense?.expense_value) !== true ? accumulator + fExpense.expense_value : accumulator, 0)
    const generalExpense = expenses?.reduce((accumulator, expense) =>
        isNaN(expense?.expense_value) !== true ? accumulator + expense.expense_value : accumulator, 0)
    return (
        <fieldset className="relative mb-12 pt-14 pb-8 bg-gray-50 rounded-xl shadow-[4px_4px_4px_0_rgba(48,48,48,.5882352941),-5px_-5px_3px_0_#fff] px-4">
            <FieldsetLegend>Información económica</FieldsetLegend>
            <div className="shadow-inner rounded-lg py-3 border-b border-b-gold-400/25 mb-3">
                <h4 className="font-bold text-azure-700 uppercase text-sm border-b-2 border-gold-400 max-w-fit mb-4 ml-2">
                    Ingresos
                </h4>
                <div className="md:grid md:grid-cols-4 mb-4 ">
                    <SelectField
                        options={{
                            name: `currency_id`,
                            label: 'Moneda del país donde reside',
                            register,
                            required: true,
                            opts: currencies,
                            isIdValue: true,
                            error: errors?.currency_id,
                            disabled: readOnly

                        }}
                    />
                    <SelectField
                        options={{
                            name: `account_holder`,
                            label: 'De cuantas cuentas es titular',
                            register,
                            opts: options?.accountHolder,
                            isIdValue: false,
                            info: 'De las cuentas en que registra sus movimientos, ¿de cuántas es titular?',
                            disabled: readOnly
                        }}
                    />
                    <CurrencyField
                        options={{
                            name: `salary_incomes`,
                            label: 'Ingresos laborales mensuales',
                            control,
                            value: salaryIncomes,
                            disabled: readOnly

                        }}
                    />
                    <CurrencyField
                        options={{
                            name: `total_incomes`,
                            label: 'Total ingresos',
                            control,
                            value: otherIncomes + salaryIncomes,
                            disabled: readOnly
                        }}
                    />
                </div>
                {incomeFields.map((field, index) => (
                    <div key={field.id} className="w-full md:grid md:grid-cols-[1fr,1fr,.5fr] mb-4">
                        <SelectField
                            options={{
                                name: `Incomes.${index}.income_type_id`,
                                label: 'Tipo de ingreso',
                                register,
                                required: true,
                                opts: incomeTypes,
                                isIdValue: true,
                                info:
                                    index == 1 &&
                                    'Hace referencia a comisiones, bonificaciones u otros conceptos que no sean fijos, pero que pueden ser soportados.',
                                error: errors.Expenses?.[index]?.income_type_id,

                                disabled: readOnly
                            }}
                        />
                        <CurrencyField
                            options={{
                                name: `Incomes.${index}.income_value`,
                                label: 'Valor del ingreso',
                                control,
                                disabled: readOnly
                            }}
                        />
                        {!readOnly &&
                            <RemoveFieldArray
                                options={{ remove: incomeRemove, index, typeRegister: { data: getDataClient?.Incomes, name: "incomes" } }}
                            />
                        }
                    </div>
                ))}
                {!readOnly &&
                    <AddFieldArray
                        options={{
                            append: incomeAppend,
                            disabled: incomeFields.length == 3 && true,
                            label: 'Agregar ingreso',
                            field: { income_type_id: '', income_value: '' },
                        }}
                    />
                }
            </div>
            <div className="shadow-inner rounded-lg py-3 border-b border-b-gold-400/25 mb-3">
                <h4 className="font-bold text-azure-700 uppercase text-sm border-b-2 border-gold-400 max-w-fit mb-4 ml-2">
                    Egresos
                </h4>
                <div className="md:grid md:grid-cols-3 my-4 gap-y-4">
                    <InputField
                        options={{
                            name: 'dependents',
                            label: 'Número de personas a cargo',
                            register,
                            type: 'number',
                            disabled: readOnly
                        }}
                    />
                    <SelectField
                        options={{
                            name: `taxpayer`,
                            label: 'Declarante de renta',
                            register,
                            validate: (value) => value !== "",
                            opts: [
                                { id: true, name: 'Si' },
                                { id: false, name: 'No' },
                            ],
                            isIdValue: true,
                            info: '¿Es declarante de renta en su país de residencia?',
                            error: errors?.taxpayer,
                            disabled: readOnly
                        }}
                    />
                    <SelectField
                        options={{
                            name: `negative_reports`,
                            label: '¿Tiene reportes negativos en las centrales de riesgo de Colombia?',
                            placeholder: 'Seleccione',
                            opts: options?.negativesReports,
                            register,
                            isIdValue: false,
                            disabled: readOnly
                        }}
                    />
                    {negativesReports === "Si" &&

                        <SelectField
                            options={{
                                name: `paid_in_full`,
                                label: '¿Tiene paz y salvos de los reportes negativos?',
                                placeholder: 'Seleccione',
                                opts: [
                                    { id: true, name: 'Si' },
                                    { id: false, name: 'No' },
                                ],
                                register,
                                isIdValue: true,
                                disabled: readOnly
                            }}
                        />
                    }
                    <InputField
                        options={{
                            name: 'score',
                            label: 'Puntaje en centrales de riesgo',
                            register,
                            type: 'number',
                            placeholder: '0',
                            disabled: readOnly
                        }}
                    />
                    <CurrencyField
                        options={{
                            name: `total_expenses`,
                            label: 'Total gastos',
                            control,
                            value: financialExpense + generalExpense,
                            disabled: !readOnly ? true : readOnly
                        }}
                    />
                </div>
                {expenseFields.map((field, index) => (
                    <div key={field.id} className="w-full md:grid md:grid-cols-[1fr,1fr,.5fr] mb-4">
                        <SelectField
                            options={{
                                name: `Expenses.${index}.expense_type_id`,
                                label: 'Tipo de gasto',
                                register,
                                required: true,
                                opts: expenseTypes?.slice(0, 4),
                                isIdValue: true,
                                error: errors.Expenses?.[index]?.expense_type_id,
                                disabled: readOnly
                            }}
                        />
                        <CurrencyField
                            options={{
                                name: `Expenses.${index}.expense_value`,
                                label: 'Valor del gasto',
                                control,
                                disabled: readOnly
                            }}
                        />
                        {!readOnly &&
                            <RemoveFieldArray
                                options={{ remove: expenseRemove, index, typeRegister: { data: getDataClient?.Expenses, name: "expenses" }, }}
                            />
                        }
                    </div>
                ))}
                {!readOnly &&
                    <AddFieldArray
                        options={{
                            append: expenseAppend,
                            disabled: expenseFields.length == 4 && true,
                            label: 'Agregar gasto',
                            field: { expense_type_id: '', expense_value: '' },
                        }}
                    />
                }
            </div>
            <div className="shadow-inner rounded-lg py-3 border-b border-b-gold-400/25 mb-3">
                <h4 className="font-bold text-azure-700 uppercase border-b-2 border-gold-400 max-w-fit mb-4 ml-2 text-sm">
                    Gastos financieros
                </h4>
                {financialFields.map((field, index) => (
                    <div key={field.id} className="w-full md:grid md:grid-cols-4 gap-y-4 mb-4 rounded-lg py-3">
                        <SelectField
                            options={{
                                name: `FinancialExpenses.${index}.expense_type_id`,
                                label: 'Tipo de deuda financiera',
                                register,
                                required: true,
                                opts: expenseTypes?.slice(4, 7),
                                isIdValue: true,
                                error: errors.FinancialExpenses?.[index]?.expense_type_id,
                                disabled: readOnly
                            }}
                        />
                        <InputField
                            options={{
                                name: `FinancialExpenses.${index}.entity`,
                                label: 'Entidad',
                                register,
                                type: 'text',
                                info: "Si la deuda es en Colombia, por favor indiquelo en este campo.",
                                disabled: readOnly
                            }}
                        />
                        <CurrencyField
                            options={{
                                name: `FinancialExpenses.${index}.total_amount`,
                                label: 'Monto inicial/Cupo total',
                                control,
                                disabled: readOnly
                            }}
                        />

                        <CurrencyField
                            options={{
                                name: `FinancialExpenses.${index}.current_balance`,
                                label: 'Saldo actual',
                                control,
                                disabled: readOnly
                            }}
                        />
                        <CurrencyField
                            options={{
                                name: `FinancialExpenses.${index}.expense_value`,
                                label: 'Cuota mensual',
                                control,
                                info: "Digite el valor en la moneda del país donde reside.",
                                disabled: readOnly
                            }}
                        />
                        {!readOnly &&
                            <RemoveFieldArray
                                options={{ remove: financialRemove, index, typeRegister: { data: getDataClient.FinancialExpenses, name: "financial-expenses" } }}
                            />
                        }
                    </div>
                ))}
                {
                    !readOnly && financialFields.length < 1 && (
                        <p className="text-center text-lg mb-3">
                            Si requiere agregar una deuda financiera, hágalo dando clic en el siguiente botón.
                        </p>
                    )}
                {!readOnly &&
                    <AddFieldArray
                        options={{
                            append: financialAppend,
                            disabled: financialFields.length == 3 && true,
                            label: 'Agregar gasto financiero',
                            field: {
                                entity: '',
                                expense_value: 0,
                                expense_type_id: '',
                                total_amount: 0,
                                current_balance: 0,
                            },
                        }}
                    />
                }
            </div>
            <div className="shadow-inner rounded-lg py-3 border-b border-b-gold-400/25 mb-3">
                <h4 className="font-bold text-azure-700 uppercase border-b-2 border-gold-400 max-w-fit mb-4 ml-2 text-sm">
                    Patrimonio
                </h4>
                {patrimonyFields.map((field, index) => (
                    <div key={field.id} className="w-full md:grid md:grid-cols-4 gap-y-4 mb-4 rounded-lg py-3">
                        <SelectField
                            options={{
                                name: `Patrimonies.${index}.patrimony_type`,
                                label: 'Tipo de patrimonio',
                                register,
                                opts: options?.typeHeritage,
                                isIdValue: false,
                                error: errors.Patrimonies?.[index]?.patrimony_type,
                                disabled: readOnly
                            }}
                        />
                        <InputField
                            options={{
                                name: `Patrimonies.${index}.description`,
                                label: 'Descripción del activo',
                                register,
                                type: 'text',
                                info: 'Específique el tipo de inmueble, marca del vehículo, etc.',
                                disabled: readOnly
                            }}
                        />
                        <InputField
                            options={{
                                name: `Patrimonies.${index}.city`,
                                label: 'Ciudad',
                                register,
                                type: 'text',
                                disabled: readOnly
                            }}
                        />
                        <SelectField
                            options={{
                                name: `Patrimonies.${index}.mortgaged`,
                                label: 'Hipotecado/Pignorado',
                                register,
                                opts: [
                                    { id: true, name: 'Si' },
                                    { id: false, name: 'No' },
                                ],
                                isIdValue: true,
                                disabled: readOnly
                            }}
                        />
                        <CurrencyField
                            options={{
                                name: `Patrimonies.${index}.value`,
                                label: 'Valor comercial',
                                control,
                                disabled: readOnly
                            }}
                        />

                        {!readOnly && <RemoveFieldArray
                            options={{ remove: patrimonyRemove, index, typeRegister: { data: getDataClient.Patrimonies, name: "patrimonies" } }}
                        />}
                    </div>
                ))}

                {!readOnly &&
                    patrimonyFields.length < 1 && (
                        <p className="text-center text-lg mb-3">
                            Si requiere agregar un patrimonio, hágalo dando clic en el siguiente botón.
                        </p>
                    )}
                {
                    !readOnly &&
                    <AddFieldArray
                        options={{
                            append: patrimonyAppend,
                            disabled: patrimonyFields.length == 3 && true,
                            label: 'Agregar patrimonio',
                            field: {
                                description: '',
                                patrimony_type: '',
                                city: '',
                                mortgaged: '',
                                value: 0,
                            },
                        }}
                    />
                }

            </div>
        </fieldset>
    )
}
