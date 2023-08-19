



export function showSuccess({ title = "Success", message = "" }) {
    return window.Swal.fire(
        title,
        message,
        'success'
    );
}

export function showError({ title = "Error", message = "" }) {
    return window.Swal.fire(
        title,
        message,
        'error'
    );
}