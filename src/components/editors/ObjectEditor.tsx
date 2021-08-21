import { Box, Button, List, ListItem, ListItemButton, ListItemText, Stack, Theme, TypographyProps } from '@material-ui/core';
import React, { useEffect, useReducer } from 'react';
import { SxProps } from '@material-ui/system';
import AddIcon from '@material-ui/icons/Add';

import type { JSONObject, JSONType } from '../../interfaces/JSONType';
import { ObjectActions, objectReducer } from '../../reducers/objectReducer';
import { valueToString } from '../../utils/valueToString';

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

const listItemButtonStyle: SxProps<Theme> = {
    width: '100%'
};

const listItemTextStyle: SxProps<Theme> = {
    flexBasis: '50%'
};

const listItemTextTypographyStyle: TypographyProps = {
    align: 'left',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
};

export interface ObjectEditorProps {
    value: JSONObject;
    onEdit: (propName: string) => void;
    onChange: (newValue: JSONObject) => void;
    newItemValue: (obj: JSONObject) => JSONType;
    newItemKey: (obj: JSONObject) => string;
}

export function ObjectEditor(props: ObjectEditorProps) {
    const [obj, dispatch] = useReducer(objectReducer, props.value);

    useEffect(() => {
        props.onChange(obj);
    }, [obj]);

    useEffect(() => {
        dispatch({ action: ObjectActions.SET, value: props.value });
    }, [props.value]);

    const onAdd = () => {
        dispatch({ action: ObjectActions.ADD_ITEM, key: props.newItemKey(obj), value: props.newItemValue(obj) });
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
                        Object.keys(obj).map((key) => (
                            <ListItem key={key} disablePadding>
                                <ListItemButton sx={listItemButtonStyle} onClick={() => props.onEdit(key)}>
                                    <ListItemText sx={listItemTextStyle} primaryTypographyProps={listItemTextTypographyStyle} primary={key} />
                                    <ListItemText sx={listItemTextStyle} secondaryTypographyProps={listItemTextTypographyStyle} secondary={valueToString(obj[key])} />
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
