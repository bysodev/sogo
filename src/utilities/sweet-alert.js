import Swal from 'sweetalert2';
let swalInstance = null;

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
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
        timer: 3000,
        showConfirmButton: false
    })
}

export const showSuccessMessage = (content) => {
    swalInstance = Swal.fire({
        icon: 'success',
        title: '¡Genial!',
        showConfirmButton: false,
        ...content
    })
}
export const updateSuccessMessage = (content) => {
    if (swalInstance) {
        swalInstance.update({
            icon: 'success',
            title: '¡Genial!',
            ...content,
            showConfirmButton: true,
            confirmButtonText: 'Continuar'
        });
    }
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