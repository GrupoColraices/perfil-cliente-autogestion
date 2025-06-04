import { useState, useEffect } from 'react'

export const useGetData = (url, token) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        fetch(url, {
            headers: { 'c-token': token },
        })
            .then((response) => response.json())
            .then((data) => setData(data.data))
            .catch((error) => setError(error))
            .finally(() => setLoading(false))
    }, [url, token])

    return { data, loading, error }
}
