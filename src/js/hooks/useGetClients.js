//@ts-check
import { useState, useEffect } from 'react'
/**
 * @function
 * @name useGetClients
 * @description The `useGetClients` function is a custom hook in JavaScript that fetches data from a specified URL
 * and returns the data, loading state, and error state.
 * @param {String} url - URL of the API endpoint from which you want to fetch the data.
 * @returns {Object} The `useGetClients` function returns an object with three properties: `data`, `loading`, and `error`.
 */
export const useGetClients = (url, token) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!url) {
            setLoading(false);
            return;
        }

        setLoading(true);
        fetch(url, {
            headers: { 'c-token': token },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Error en la petición');
                }
                return response.json();
            })
            .then((data) => setData(data.data))
            .catch((error) => setError(error))
            .finally(() => setLoading(false));
    }, [url, token]);

    return { data, loading, error };
};