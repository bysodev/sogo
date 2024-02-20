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
        showConfirmButton: false,
        didOpen: () => {
            let closeButton = document.createElement('button');
            closeButton.className = 'swal2-close';
            closeButton.onclick = function() { Swal.close(); };
            closeButton.textContent = '×';
            document.querySelector('.swal2-popup').appendChild(closeButton);
        },
    })
}

export const showSuccessMessage = (content) => {
    swalInstance = Swal.fire({
        icon: 'success',
        title: '¡Genial!',
        showConfirmButton: false,
        didOpen: () => {
            let closeButton = document.createElement('button');
            closeButton.className = 'swal2-close';
            closeButton.onclick = function() { Swal.close(); };
            closeButton.textContent = '×';
            document.querySelector('.swal2-popup').appendChild(closeButton);
        },
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
