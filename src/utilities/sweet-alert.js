import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});

export const showErrorMessage = (text) => {
    Swal.fire({
        icon: 'error',
        title: 'Ups...',
        text,
        timer: 2000,
        showConfirmButton: false
    })
}

export const showSuccessMessage = (text) => {
    Swal.fire({
        icon: 'success',
        title: '¡Asombroso!',
        text,
        timer: 2000,
        showConfirmButton: false
    })
}

export const showSuccessToast = (text) => {
    Toast.fire({
        icon: 'success',
        title: text
    })
}

export const showErrorToast = (text) => {
    Toast.fire({
        icon: 'error',
        title: text
    })
}