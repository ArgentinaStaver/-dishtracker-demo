export const labelRegex = /^([a-zäöü0-9_&ß]+)(\.[a-zäöü0-9_&ß]+)*$/;

export const isValidLabel = (label: string) => labelRegex.test(label);
