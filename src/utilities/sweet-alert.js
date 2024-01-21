import Swal from 'sweetalert2'

export const showErrorMessage = (text) => {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text,
        confirmButtonText: "Aceptar",
    })
}

export const showSuccessMessage = (text) => {
    Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text,
        confirmButtonText: "Aceptar",
    })
}