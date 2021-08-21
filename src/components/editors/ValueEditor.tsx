import { InputLabel, MenuItem, Stack, TextField } from '@material-ui/core';
import React from 'react';

import type { JSONArray, JSONObject, JSONType } from '../../interfaces/JSONType';
import { typeFromValue } from "../../utils/typeFromValue";
import { valueFromType } from "../../utils/valueFromType";
import { ArrayEditor } from './ArrayEditor';
import { BooleanEditor } from './BooleanEditor';
import { NumberEditor } from './NumberEditor';
import { ObjectEditor } from './ObjectEditor';
import { StringEditor } from './StringEditor';

interface TypeItem {
    name: string;
    value: string;
}

const types: Array<TypeItem> = [
    { name: 'Number', value: 'number' },
    { name: 'String', value: 'string' },
    { name: 'Boolean', value: 'boolean' },
    { name: 'Array', value: 'array' },
    { name: 'Object', value: 'object' },
    { name: 'Null', value: 'null' }
];

const typeByValue = types.reduce((acc, item) => {
    acc[item.value] = item;
    return acc;
}, {} as Record<string, TypeItem>);

export interface ValueEditorProps {
    value: JSONType;
    newArrayItemValue: (value: JSONArray) => JSONType;
    newObjectItemValue: (value: JSONObject) => JSONType;
    newObjectItemKey: (value: JSONObject) => string;
    onChange: (newValue: JSONType) => void;
    onEdit: (index: string | number) => void;
}

export const ValueEditor = (props: ValueEditorProps) => {
    const updateValue = (type: string) => {
        props.onChange(valueFromType(type));
    };

    const valueType = typeFromValue(props.value);
    
    const valueEditor = (() => {
        switch (valueType) {
            case 'number':
                return (
                    <>
                        <NumberEditor label="Value" value={props.value as number} onChange={props.onChange}></NumberEditor>
                    </>
                );
            case 'string':
                return (
                    <>
                        <StringEditor label="Value" value={props.value as string} onChange={props.onChange}></StringEditor>
                    </>
                );
            case 'boolean':
                return (
                    <>
                        <BooleanEditor label="Value" value={props.value as boolean} onChange={props.onChange}></BooleanEditor>
                    </>
                );
            case 'array':
                return (
                    <Stack 
                        display="flex" 
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        width="100%" 
                        flex="1"
                        spacing={1}
                    >
                        <InputLabel>Items ({(props.value as JSONArray).length})</InputLabel>
                        
                        <ArrayEditor
                            newItemValue={props.newArrayItemValue} 
                            onEdit={props.onEdit} 
                            value={props.value as Array<JSONType>} 
                            onChange={props.onChange}
                        ></ArrayEditor>
                    </Stack>
                );
            case 'object':
                return (
                     <Stack 
                        display="flex" 
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        width="100%" 
                        flex="1"
                        spacing={1}
                    >
                        <InputLabel>Properties ({Object.keys(props.value as JSONObject).length})</InputLabel>
                        
                        <ObjectEditor 
                            newItemValue={props.newObjectItemValue} 
                            newItemKey={props.newObjectItemKey} 
                            value={props.value as JSONObject} 
                            onEdit={props.onEdit} 
                            onChange={props.onChange}
                        ></ObjectEditor>
                    </Stack>
                );
            default: 
                return <></>;
        }
    })();

    return (
        <>
            <TextField
                select
                label="Type"
                size="small"
                fullWidth={true}
                value={typeByValue[valueType].value}
                onChange={(e) => updateValue(e.target.value)}
            >
                {
                    types.map((type, index) => (
                        <MenuItem key={index} value={type.value}>{type.name}</MenuItem>
                    ))
                }
            </TextField>
            
            {valueEditor}
        </>
    );
};
