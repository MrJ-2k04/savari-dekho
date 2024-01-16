import { format } from "date-fns";

export function capitalizeWords(str) {
    return str.replace(/\b\w/g, function (match) {
        return match.toUpperCase();
    });
}

export function formatDateForRide(date) {
    if (typeof date === "string") {
        date = new Date(date);
    }
    const year = date.getFullYear();
    if (year !== new Date().getFullYear()) {
        return `${format(date, 'EEEE, dd MMMM, yyyy')}`;
    }
    return `${format(date, 'EEEE, dd MMMM')}`;
}