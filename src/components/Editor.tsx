import { Button, TextField, Stack, Box } from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import React, { useEffect, useState } from 'react';

import type { JSONArray, JSONObject, JSONType } from '../interfaces/JSONType';
import { deleteChild } from '../utils/deleteChild';
import { getChild } from '../utils/getChild';
import { setChild } from '../utils/setChild';
import { ValueEditor } from './editors/ValueEditor';
import { typeFromValue } from '../utils/typeFromValue';
import { valueFromType } from '../utils/valueFromType';
import { LevelSelector } from './LevelSelector';

export interface EditorProps {
    value: JSONType;
    onChange: (newValue: JSONType) => void;
}

export const Editor = (props: EditorProps) => {
    const [path, setPath] = useState<Array<string | number>>([]);
    const [obj, setObj] = useState(props.value);

    const [propName, setPropName] = useState<string | number | undefined>(path[path.length - 1]);

    useEffect(() => {
        setPropName(path[path.length - 1]);
    }, [path]);

    const setNewPropName = () => {
        const newPath = [ ...path.slice(0, path.length-1), propName!];
        const existingItem = getChild(obj, path);
        let newObj = deleteChild(obj, path);
        newObj = setChild(newObj, newPath, existingItem);
        setObj(newObj);
        setPath(newPath);
        props.onChange(newObj);
    };

    const newArrayItemValue = (obj: JSONArray) => {
        if (obj.length > 0) {
            const lastItem = obj[obj.length-1];
            return valueFromType(typeFromValue(lastItem));
        }
        
        return '';
    };

    const newObjectItemValue = (obj: JSONObject) => {
        const objKeys = Object.keys(obj);

        if (objKeys.length > 0) {
            const lastItem = obj[objKeys[objKeys.length - 1]];
            return valueFromType(typeFromValue(lastItem));
        }

        return '';
    };
    
    const newObjectItemKey = (obj: JSONObject) => {
        //create a new property name that uses the last property name with new number of the end
        const objKeys = Object.keys(obj);

        let i = 1;
        let newKey: string;
        while ((newKey = `item${i}`) && objKeys.includes(newKey)) {
            i++;
        }

        return newKey;
    };

    const updateObj = (subobj: JSONType) => {
        const newObj = setChild(obj, path, subobj);
        setObj(newObj);
        props.onChange(newObj);
    };

    const deleteCurrent = () => {
        const newObj = deleteChild(obj, path);
        setObj(newObj);
        setPath(path.slice(0, path.length-1));
        props.onChange(newObj);
    };

    useEffect(() => {
        setObj(props.value);
    }, [props.value]);

    return (
        <Stack
            width="100%"
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={2}
        >
            <LevelSelector
                path={path}
                setPath={setPath}
                obj={obj}
            />

            <Stack
                display="flex"
                flex="1"
                width="100%"
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
            >
                <Stack 
                    display="flex" 
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    width="100%" 
                    flex="1"
                    spacing={2}
                >
                    {propName !== undefined ? (
                        <TextField 
                            size="small" 
                            fullWidth={true} 
                            label="Property Name" 
                            value={propName}
                            InputLabelProps={{ shrink: true }}
                            onChange={(e) => setPropName(e.target.value)} 
                            onBlur={setNewPropName} />
                    ) : undefined}

                    <ValueEditor
                        newArrayItemValue={newArrayItemValue}
                        newObjectItemValue={newObjectItemValue}
                        newObjectItemKey={newObjectItemKey}
                        value={getChild(obj, path)}
                        onEdit={(index) => setPath([...path, index])}
                        onChange={(newValue) => updateObj(newValue)}
                    />
                </Stack>

                {path.length > 0 ? (
                    <Box width="100%">
                        <Button endIcon={<DeleteForeverIcon />} color="error" variant="outlined" fullWidth={true} onClick={deleteCurrent}>Delete</Button>
                    </Box>
                ) : undefined }
            </Stack>
        </Stack>
    );
};
