import type { JSONType } from "../interfaces/JSONType";
import { cloneValue } from "./cloneValue";

//does not mutate but returns new objects for each parent for the path given with the leaf value changed
export const setChild = (parent: JSONType, path: Array<string | number>, value: any) => {
    let leaf = parent;
    
    check: {
        for (const part of path) {
            if (typeof leaf !== 'object' || leaf === null) {
                break check;
            }

            if (Array.isArray(leaf)) {
                leaf = leaf[+part];
            } else {
                leaf = leaf[part];
            }
        }
    
        if (leaf === value) {
            return parent;
        }
    }

    if (!path.length) {
        return value;
    }

    const newParent = cloneValue(parent);

    leaf = newParent;

    for (let i=0; i<path.length-1; i++) {
        if (typeof leaf !== 'object' || leaf === null) {
            leaf = {};
        } else {
            leaf = { ...leaf };
        }
        
        if (Array.isArray(leaf)) {
            leaf = leaf[+path[i]];
        } else {
            leaf = leaf[path[i]];
        }
    }

    if (typeof leaf !== 'object' || leaf === null) {
        leaf = {};
    }

    const lastKey = path[path.length - 1];

    if (Array.isArray(leaf)) {
        leaf[+lastKey] = value;
    } else {
        leaf[lastKey] = value;
    }

    return newParent;
};
