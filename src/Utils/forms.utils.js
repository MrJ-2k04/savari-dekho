

// -------------------------------------------------------- VALIDATION FUNCTIONS --------------------------------------------------------

export const isNumeric = (value) => /^\d+$/.test(value)
export const isEmptyString = (obj) => (obj === null || obj === undefined) ? false : obj.toString().trim().length === 0;
export function isFalsy(value) {
    if (value === null || value === undefined) {
        return true;
    }

    if (typeof value === "string" && value.trim() === "") {
        return true;
    }

    if (Array.isArray(value) && value.length === 0) {
        return true;
    }

    if (typeof value === "object" && Object.keys(value).length === 0) {
        return true;
    }

    return false;
}

export function isValidDateObject(dObj) {
    return (
        Object.prototype.toString.call(dObj) === "[object Date]" &&
        !isNaN(dObj.valueOf())
    );
}

export function is18Plus(birthdate) {
    const today = new Date();
    const birthDateObj = new Date(birthdate);
    const ageDiff = today - birthDateObj;
    const ageDate = new Date(ageDiff); // This creates a new date from the age difference
    const years = ageDate.getUTCFullYear() - 1970; // Subtract 1970 to get the actual age in years

    return years >= 18;
}

export function isValidEmail(email) {
    if (!email) return false;

    if (email.length > 254) return false;

    const emailRegexp =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const valid = emailRegexp.test(email);
    if (!valid) return false;

    // Further checking of some things regex can't handle
    const parts = email.split("@");
    if (parts[0].length > 64) return false;

    const domainParts = parts[1].split(".");

    if (
        domainParts[0] === undefined ||
        domainParts[1] === undefined ||
        domainParts.some((part) => part.length > 63)
    ) {
        return false;
    }
    return true;
}

export function formatMobileNumber(mobileNumber) {
    const formattedNumber = mobileNumber.replace(/[^0-9\s]+/g, ""); // Remove non-digit characters except spaces
    const index = formattedNumber.indexOf(" "); // Find the index of the first empty space
    const countryCode = formattedNumber.slice(0, index); // Extract the country code
    const phoneNumber = formattedNumber.slice(index + 1).replace(/\s/g, ""); // Extract the phone number and remove all spaces
    const finalMobileNumber = `${countryCode}-${phoneNumber}`;
    const validMobileNumberLength = 10;
    // console.log(finalMobileNumber.length,countryCode.length,validMobileNumberLength);
    if (
        finalMobileNumber.length !== (countryCode.length + validMobileNumberLength + 1)
        // finalMobileNumber.length < (countryCode.length + validMobileNumberLength + 1)
        // ||
        // finalMobileNumber.length > (countryCode.length + validMobileNumberLength + 3)
    ) {
        return "";
    }
    return finalMobileNumber;
};

export function unformatMobileNumber(mobileNumber) {
    if (isEmptyString(mobileNumber)) return "";
    if (mobileNumber.includes("+")) return mobileNumber;

    const splittedNumber = mobileNumber.split('-');
    const result = `+${splittedNumber[0]} ${splittedNumber[1]}`;
    return result;
}

export function getPricePrediction(distance) {
    // const response = {};
    // const priceList = [
    //     [0, 0],
    //     [500]
    //     [Infinity, 1.75]
    // ]
}

export async function sleep(delayMs) {
    return new Promise((res, rej) => setTimeout(() => res(), delayMs))
}


// -------------------------------------------------------- CONVERSION FUNCTIONS --------------------------------------------------------

export function combineObjects(obj1, obj2) {
    const result = {};
    if (!(obj1 && obj2)) return obj1 ?? obj2 ?? {}

    for (const key of Object.keys(obj1)) {
        result[key] = obj1[key] !== undefined ? obj1[key] : obj2[key];
    }

    for (const key of Object.keys(obj2)) {
        if (obj1[key] === undefined) {
            result[key] = obj2[key];
        }
    }

    return result;
}

export function parseFormData(targetForm) {
    // if (typeof targetForm === 'object') {
    //     const formData = new FormData();
    //     Object.entries(targetForm).forEach(([k, v]) => {
    //         formData.append(k, v);
    //     })
    //     return formData;
    // }
    const formData = new FormData(targetForm);
    const data = {};
    for (let [key, value] of formData.entries()) {
        if (value.trim() !== "") {
            if (value.toLowerCase() === "true") {
                data[key] = true;
            } else if (value.toLowerCase() === "false") {
                data[key] = false;
            } else {
                data[key] = value;
            }
        }
    }
    return data;
};

export function jsonToFormData(json) {
    const formData = new FormData();

    for (const key in json) {
        if (json.hasOwnProperty(key)) {
            formData.append(key, json[key]);
        }
    }

    return formData;
}
