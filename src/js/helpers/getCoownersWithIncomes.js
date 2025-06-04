export const getCoownersWithIncomes = (coowners) => {
    const validCoowners = coowners
        ?.filter(({ incomes }) => incomes > 0)
        ?.map(({ coowner_name }) => coowner_name);
    return validCoowners?.length > 0
        ? validCoowners
        : false;
};