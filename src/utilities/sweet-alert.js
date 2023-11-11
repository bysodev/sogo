import Swal from 'sweetalert2'

export const showErrorMessage = (text) => {
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text
    })
}

export const showSuccessMessage = (text) => {
    Swal.fire({
        icon: 'success',
        title: 'Success',
        text
    })
}