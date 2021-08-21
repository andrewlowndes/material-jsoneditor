import type { JSONType } from "../interfaces/JSONType";

export const typeFromValue = (value: JSONType): string => {
    switch (typeof value) {
        case 'number': return 'number';
        case 'string': return 'string';
        case 'boolean': return 'boolean';
        default:
            if (value === null || value === undefined) return 'null';
            if (Array.isArray(value)) return 'array';
            return 'object';
    }
};
