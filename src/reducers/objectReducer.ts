import type { JSONObject, JSONType } from "../interfaces/JSONType";
import { cloneValue } from "../utils/cloneValue";

export enum ObjectActions {
    ADD_ITEM = 'ADD_ITEM',
    CLONE_ITEM = 'CLONE_ITEM',
    DELETE_ITEM = 'DELETE_ITEM',
    UPDATE_ITEM = 'UPDATE_ITEM',
    UPDATE_KEY = 'UPDATE_KEY',
    SET = 'SET'
}

export interface AddItemAction {
    action: ObjectActions.ADD_ITEM;
    key: string;
    value: JSONType;
}

export interface CloneItemAction {
    action: ObjectActions.CLONE_ITEM;
    key: string;
}

export interface DeleteItemAction {
    action: ObjectActions.DELETE_ITEM;
    key: string;
}

export interface UpdateItemAction {
    action: ObjectActions.UPDATE_ITEM;
    key: string;
    value: JSONType;
}

export interface UpdateKeyAction {
    action: ObjectActions.UPDATE_KEY;
    key: string;
    newKey: string;
}

export interface SetAction {
    action: ObjectActions.SET;
    value: JSONObject;
}

export type ObjectAction = AddItemAction | CloneItemAction | DeleteItemAction | UpdateItemAction | UpdateKeyAction | SetAction;

export type ObjectReducer<T> = (obj: T, action: ObjectAction) => T;

export const objectReducer: ObjectReducer<JSONObject> = (obj, action) => {
    switch (action.action) {
        case ObjectActions.ADD_ITEM: {
            return { ...obj, [action.key]: action.value };
        }
        case ObjectActions.CLONE_ITEM: {
            return {...obj, [action.key + '_copy']: cloneValue(obj[action.key]) };
        }
        case ObjectActions.DELETE_ITEM: {
            const newObj = { ...obj };
            delete newObj[action.key];
            return newObj;
        }
        case ObjectActions.UPDATE_ITEM: {
            return { ...obj, [action.key]: action.value };
        }
        case ObjectActions.UPDATE_KEY: {
            const newObj2 = { ...obj };
            const existingValue = newObj2[action.key];
            delete newObj2[action.key];
            newObj2[action.newKey] = existingValue;
            return newObj2;
        }
        case ObjectActions.SET: {
            return action.value;
        }
    }
};
