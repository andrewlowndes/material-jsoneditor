import type { JSONType } from "../interfaces/JSONType";

export const valueFromType = (type: string): JSONType => {
    switch (type) {
        case 'number': return 0;
        case 'string': return '';
        case 'boolean': return false;
        case 'array': return [];
        case 'object': return {};
        default: return null;
    }
};
