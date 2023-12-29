

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

export function showInfo({ title = "Info", message = "" }) {
    return window.Swal.fire({
        title,
        text: message,
        icon: 'info',
        customClass: {
            container: 'swal-container',
        }
    });
}

export function showWarning({ title = "Warning", message = "" }) {
    return window.Swal.fire({
        title,
        text: message,
        icon: 'warning',
        customClass: {
            container: 'swal-container',
        }
    });
}