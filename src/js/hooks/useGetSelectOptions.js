//@ts-check
import { useEffect, useMemo, useState } from 'react'
const { VITE_API_URL } = import.meta.env

/**
 * @function
 * @name useGetSelectOptions
 * @description The `useGetSelectOptions` function is a custom hook in JavaScript that fetches data from an API based on a given subdirectory and returns the data.
 * @param {String} subDirectory - The `subDirectory` parameter is a string that represents the subdirectory of the API URL that you want to fetch data from.
 * @returns {Array} The `data` variable is being returned.
 */
export const useGetSelectOptions = (subDirectory) => {
    const [data, setData] = useState([])

    useEffect(() => {
        fetch(`${VITE_API_URL}/${subDirectory}`)
            .then((res) => res.json())
            .then((responseData) => setData(responseData?.data || []))
    }, [subDirectory])

    // Memoriza los datos para evitar recomputación si no cambian
    const memoizedData = useMemo(() => data, [data])

    return memoizedData
}
