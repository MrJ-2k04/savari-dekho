

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

export function showConfirmationDialog({
    title = "Are you sure?",
    message = "You won't be able to revert this!",
    icon = "warning",
    confirmBtnText = "Yes, delete it!",
    cancelBtnText = "No",
}) {
    return window.Swal.fire({
        title,
        text: message,
        icon,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: confirmBtnText,
        cancelButtonText: cancelBtnText,
        customClass: {
            container: 'swal-container',
        }
    });
}

export function showOtpDialog({
    title = 'Enter OTP',
    message = "Enter the OTP sent to the passenger's registered mobile number",
    onVerifyOtp,
    onResendOtp,
}) {
    return window.Swal.fire({
        title,
        text: message,
        input: "number",
        inputValidator: (value) => {
            if (!value) {
                return "You need to enter the OTP!";
            }
            if (value.length !== 6) {
                return "OTP must have 6 digits";
            }
        },
        showConfirmButton: true,
        confirmButtonText: "Verify OTP",
        showDenyButton: true,
        denyButtonText: "Resend OTP",
        preDeny: () => {
            onResendOtp();
            window.Swal.showValidationMessage("Resending OTP...");
            return false;
        },
        preConfirm: async (otp) => {
            onVerifyOtp(otp);
            return false;
        },
        // showCloseButton: true,
        showCancelButton: true,
        customClass: {
            container: 'swal-container',
        },
        // focusConfirm: false,
        // allowOutsideClick: false,
    });
}