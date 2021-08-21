import type { JSONType } from "../interfaces/JSONType";

export const cloneValue = <T = JSONType>(value: T): T => {
    if (Array.isArray(value)) {
        return [...value] as unknown as T;
    }

    if (typeof value === 'object' && value !== null) {
        return { ...value };
    }

    return value;
};
