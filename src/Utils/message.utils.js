

export function showSuccess({ title = "Success", message = "" }) {
    return window.Swal.fire({
        title,
        text: message,
        icon: 'success',
        customClass: {
            container: 'swal-container',
        }
    });
}

export function showError({ title = "Error", message = "" }) {
    return window.Swal.fire({
        title,
        text: message,
        icon: 'error',
        customClass: {
            container: 'swal-container',
        }
    });
}
