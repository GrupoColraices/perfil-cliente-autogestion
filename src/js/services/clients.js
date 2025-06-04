const { VITE_API_URL } = import.meta.env


const updateClient = async ({ formData, id }) => {
    const response = await fetch(`${VITE_API_URL}/clients/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
    })
    const data = await response.json()
    return data
}

export { updateClient }
