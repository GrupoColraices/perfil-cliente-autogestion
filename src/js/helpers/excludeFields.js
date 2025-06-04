/**
 * @function excludeFields
 * @description The function `excludeFields` takes in various parameters and returns a modified object by excluding
 * certain fields based on the values of those parameters.
 * @param data - An object containing the data to be filtered.
 * @param typeDebt - A boolean value indicating whether to exclude the 'FinancialExpenses' field.
 * @param selectApoderado - A boolean value indicating whether to exclude the "Agent" field from the
 * data.
 * @param typePatrimonies - The parameter `typePatrimonies` is a boolean value that determines whether
 * or not to exclude the "Patrimonies" field from the data. If `typePatrimonies` is `true`, the
 * "Patrimonies" field will be excluded. If `typePatrimonies` is
 * @param inmDefinition - A boolean value indicating whether the property definition should be excluded
 * or not.
 * @returns a modified object that excludes certain fields based on the values of the input parameters.
 */
export const excludeFields = (data, selectApoderado, hasProperties, linking, client) => {
    const excludeApoderado = selectApoderado !== 'true' && 'Agent'
    const excludeProperty = !hasProperties && !client?.Property && 'Property'
    // const excludeDataIncome = incomes.length === 0 && 'Incomes'
    // const excludeDataExpense = expenses.length === 0 && 'Expenses'
    const excludeAtt = new Set([
        excludeProperty,
        excludeApoderado,
        // excludeDataIncome,
        // excludeDataExpense,
        'certifiedIncome',
        'draftExpense',
        'draftsIncome',
        'employmentIncome',
        'familiarExpense',
        'othersIncomes',
        'familiarExpense',
        'linkPerson',
        'apoderado',
        'othersIncomes',
        'rentalCosts',
        'sustainingExpense',
        'totalExpense',
        'totalIncome',
        'typeDebt',
        'typePatrimonies',
        'property',
    ])
    const modifiedObject = {}
    for (const [key, value] of Object.entries(data)) {
        if (!excludeAtt.has(key)) {
            modifiedObject[key] = value
        }
    }
    return modifiedObject
}
