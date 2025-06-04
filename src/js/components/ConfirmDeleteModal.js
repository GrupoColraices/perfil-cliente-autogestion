import Swal from "sweetalert2";
import { deleteData } from "../services/apiService";

export const ConfirmDeleteModal = (index, data, setData, setEditingIndex, remove, path, text, token) => {
    Swal.fire({
        title: "Esta seguro que desea eliminar el registro?",
        text: "Esta acción es irreversible",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2a3f77",
        cancelButtonColor: "#CAA55E",
        confirmButtonText: "Si, Eliminar"
    }).then((result) => {
        if (result.isConfirmed) {
            const deleted = deleteData(`/${path}`, text, token, data?.id)
            if (deleted) {
                remove(index);
                setData(prev => {
                    return prev.filter((_, i) => i !== index);
                });
                setEditingIndex(null);
                Swal.fire({
                    title: "Eliminado!",
                    text: "El elemento ha sido eliminado con éxito.",
                    icon: "success",
                    confirmButtonColor: "#2a3f77",
                    timer: 3000,
                });
            }
        }
    });
}