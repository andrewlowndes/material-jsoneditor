import type { JSONArray, JSONType } from "../interfaces/JSONType";

export enum ArrayActions {
    ADD_ITEM = 'ADD_ITEM',
    MOVE_ITEM = 'MOVE_ITEM',
    CLONE_ITEM = 'CLONE_ITEM',
    DELETE_ITEM = 'DELETE_ITEM',
    CHANGE_ITEM = 'CHANGE_ITEM',
    SET = 'SET'
}

export interface AddItemAction {
    action: ArrayActions.ADD_ITEM;
    value: JSONType;
}

export interface MoveItemAction {
    action: ArrayActions.MOVE_ITEM;
    index: number;
    targetIndex: number;
}

export interface CloneItemAction {
    action: ArrayActions.CLONE_ITEM;
    index: number;
}

export interface DeleteItemAction {
    action: ArrayActions.DELETE_ITEM;
    index: number;
}

export interface ChangeItemAction {
    action: ArrayActions.CHANGE_ITEM;
    index: number;
    value: JSONType;
}

export interface SetAction {
    action: ArrayActions.SET,
    value: JSONArray;
}

export type ArrayAction = AddItemAction | MoveItemAction | CloneItemAction | DeleteItemAction | ChangeItemAction | SetAction;

export type ArrayReducer = (arr: JSONArray, action: ArrayAction) => JSONArray;

export const arrayReducer: ArrayReducer = (arr, action) => {
    switch (action.action) {
        case ArrayActions.ADD_ITEM: {
            return [ ...arr, action.value ];
        }
        case ArrayActions.MOVE_ITEM: {
            const newArr = [ ...arr ];
            const existingItems = newArr.splice(action.index, 1);
            newArr.splice(action.targetIndex, 0, existingItems[0]);
            return newArr;
        }
        case ArrayActions.CLONE_ITEM: {
            return [...arr.slice(0, action.index), arr[action.index], ...arr.slice(action.index)];
        }
        case ArrayActions.DELETE_ITEM: {
            return [...arr.slice(0, action.index), ...arr.slice(action.index+1)];
        }
        case ArrayActions.CHANGE_ITEM: {
            const newArr = [ ...arr ];
            newArr[action.index] = action.value;
            return newArr;
        }
        case ArrayActions.SET: {
            return action.value;
        }
    }
};
