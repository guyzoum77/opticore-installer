/**
 * Escapes a string for use in a shell command.
 * @param {string} str - The string to escape.
 * @returns {string} - The escaped string.
 */
export function shellEscape(str: string): string {
    return `"${str.replace(/(["$`\\])/g, '\\$1')}"`;
}