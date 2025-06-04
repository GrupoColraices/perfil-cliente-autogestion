export const calculateSum = (employments, dataIncome, financialExpenses, dataExpense) => {
    let monthlyIncome = 0
    let financialDebtSum = 0

    employments?.forEach((item) => {
        monthlyIncome += Number(item.salary || 0)
    })
    financialExpenses?.forEach((item) => {
        financialDebtSum += Number(item.expense_value || 0)
    })
    const totalIncome =
        dataIncome?.reduce(
            (accumulator, income) =>
                isNaN(income.income_value) !== true ? accumulator + income.income_value : accumulator,
            0
        ) + monthlyIncome
    const totalExpense =
        dataExpense?.reduce(
            (accumulator, expense) =>
                isNaN(expense.expense_value) !== true ? accumulator + expense.expense_value : accumulator,
            0
        ) + financialDebtSum

    // console.log(totalIncome)
    return { monthlyIncome, totalIncome, totalExpense }
}
