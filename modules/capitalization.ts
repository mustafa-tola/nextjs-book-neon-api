export function capitalization(str: string) {
    let capitalizedStr = "";
    const type = str.split(" ");
    type.map((word) => capitalizedStr += word.charAt(0).toUpperCase() + word.slice(1) + " ");
    capitalizedStr = capitalizedStr.slice(0,capitalizedStr.length - 1) + "'"
    return capitalizedStr;
}