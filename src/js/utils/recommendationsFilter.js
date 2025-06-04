export const recommendationsFilter = (data) => {
    if (!data) throw new Error('data is required')
    if (!Array.isArray(data)) throw new Error('data must be an array')

    return data?.filter(
        (item) =>
            (!item.viability && item.title !== 'Ley de vivienda' && item.viability !== 'No Aplica') ||
            (item.title === 'Actividad económica' && item.message !== null)
    )
}

export const getCountry = (data) => {
    if (!data) throw new Error('data is required')
    if (!Array.isArray(data)) throw new Error('data must be an array')

    return data?.find((item) => item.title === 'País de residencia')
}
