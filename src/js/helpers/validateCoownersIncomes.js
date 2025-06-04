
export const validateCoownersIncomes = (coowners) => {
    const incomeCount = coowners?.reduce((count, coowner) => {
        return count + (coowner?.incomes > 0 ? 1 : 0);
    }, 0);
    return incomeCount >= 3
}
