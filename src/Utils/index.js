

export const isNumeric = (value) => /^\d+$/.test(value)
export const IsEmptyString = (obj) => (obj === null || obj === undefined) ? false : obj.toString().trim().length === 0;
