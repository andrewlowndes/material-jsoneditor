import { Box, Button, List, ListItem, ListItemButton, ListItemText, Stack, Theme, TypographyProps } from '@material-ui/core';
import React, { useEffect, useReducer } from 'react';
import { SxProps } from '@material-ui/system';
import AddIcon from '@material-ui/icons/Add';

import type { JSONArray, JSONType } from '../../interfaces/JSONType';
import { ArrayActions, arrayReducer } from '../../reducers/arrayReducer';
import { valueToString } from '../../utils/valueToString';

export interface ArrayEditorProps {
    value: JSONArray;
    onEdit: (index: number) => void;
    onChange: (newValue: JSONArray) => void;
    newItemValue: (obj: JSONArray) => JSONType;
}

const listWrapStyle: SxProps<Theme> = {
    width: '100%', 
    flex: 1, 
    border: 1, 
    borderColor: 'grey.500', 
    borderRadius: 1, 
    boxSizing: 'border-box',
    overflow: 'auto',
    position: 'relative',
    minHeight: 100
};

const listStyle: SxProps<Theme> = {
    position: 'absolute',
    width: '100%'
};

const listItemTextTypographyStyle: TypographyProps = {
    align: 'left',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
};

export function ArrayEditor(props: ArrayEditorProps) {
    const [obj, dispatch] = useReducer(arrayReducer, props.value);

    useEffect(() => {
        props.onChange(obj);
    }, [obj]);

    useEffect(() => {
        dispatch({ action: ArrayActions.SET, value: props.value });
    }, [props.value]);

    const onAdd = () => {
        dispatch({ action: ArrayActions.ADD_ITEM, value: props.newItemValue(obj) });
    };
    
    return (
        <Stack
            display="flex"
            width="100%"
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={1}
            flex={1}
        >
            <Box sx={listWrapStyle}>
                <List dense={true} sx={listStyle}>
                    {
                        obj.map((value, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton onClick={() => props.onEdit(index)}>
                                    <ListItemText primaryTypographyProps={listItemTextTypographyStyle} primary={valueToString(value)} />
                                </ListItemButton>
                            </ListItem>
                        ))
                    }
                </List>
            </Box>

            <Button endIcon={<AddIcon />} color="primary" variant="outlined" fullWidth={true} onClick={onAdd}>Add new</Button>
        </Stack>
     );
};
