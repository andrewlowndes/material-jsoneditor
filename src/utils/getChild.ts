import type { JSONType } from "../interfaces/JSONType";

export const getChild = (parent: JSONType, path: Array<string | number>) => {
    let childObj = parent;

    for (const field of path) {
        if (typeof childObj !== 'object') {
            throw new Error(`Could not get child ${field} of ${childObj}`);
        }

        if (Array.isArray(childObj)) {
            childObj = childObj[+field];
        } else {
            childObj = childObj?.[field] ?? null;
        }
    }

    return childObj;
};
