/**
 * Escapes a string for use in a shell command.
 * @param {string} str - The string to escape.
 * @returns {string} - The escaped string.
 */
export const SShellEscape: (str: string) => string = (str: string): string => {
    return `"${str.replace(/(["$`\\])/g, '\\$1')}"`;
}