import toast from "react-hot-toast";

const { VITE_API_URL } = import.meta.env

export const deleteItemArray = async (id, typeRegister) => {
    try {
        const response = await fetch(`${VITE_API_URL}/${typeRegister}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        if (response.status === 204) {
            toast.success(" Elemento removido con éxito")
        }
    }
    catch (error) {
        console.log(error);
    }
}