export const approvedCredit = (maximunQuota = 0, maximunQuotaFee = 0, requestedValue = 0, requestedCreditFee = 0) => {
    if (Number(requestedValue) === 0 || requestedValue === null) {
        console.log('Aqui')
        return { creditValue: maximunQuota, creditFee: maximunQuotaFee }
    }

    const creditValue = Number(requestedValue) > Number(maximunQuota) ? maximunQuota : requestedValue
    const creditFee = Number(requestedValue) > Number(maximunQuota) ? maximunQuotaFee : requestedCreditFee

    return { creditValue, creditFee }
}
