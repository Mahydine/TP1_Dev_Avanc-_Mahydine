/**
 * @description Definie la variable pour le hash du premier bloc
 * @type {string}
 */
export const monSecret = "";

/**
 * @description Retourne un timestamp au format aaaammjj-hh:mm:ss
 * @return {string}
 */
export function getDate() {
    const dateObject = new Date();

    const date = (dateObject.getDate() < 10)? '0' + dateObject.getDate() : dateObject.getDate();
    const month = (dateObject.getMonth() + 1 < 10)? '0' + (dateObject.getMonth() + 1): dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    const hours = dateObject.getHours();
    const minutes = dateObject.getMinutes();
    const seconds = dateObject.getSeconds();

// prints date & time in YYYY-MM-DD HH:MM:SS format
    return `${year}${month}${date}-${hours}:${minutes}:${seconds}`;
}