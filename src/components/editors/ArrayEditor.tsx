import React, { useEffect, useReducer } from 'react';
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  SxProps,
  Theme,
  TypographyProps,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import type { JSONArray, JSONType } from '../../interfaces/JSONType';
import { ArrayActions, arrayReducer } from '../../reducers/arrayReducer';
import valueToString from '../../utils/valueToString';

export interface ArrayEditorProps {
  value: JSONArray;
  onEdit: (index: number) => void;
  onChange: (newValue: JSONArray) => void;
  newItemValue: (arr: JSONArray) => JSONType;
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
  minHeight: 100,
};

const listStyle: SxProps<Theme> = {
  position: 'absolute',
  width: '100%',
};

const listItemTextTypographyStyle: TypographyProps = {
  align: 'left',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
};

export function ArrayEditor({ onChange, value, newItemValue, onEdit }: ArrayEditorProps) {
  const [arr, dispatch] = useReducer(arrayReducer, value);

  useEffect(() => {
    onChange(arr);
  }, [arr, onChange]);

  useEffect(() => {
    dispatch({ action: ArrayActions.SET, value });
  }, [value]);

  const onAdd = () => {
    dispatch({ action: ArrayActions.ADD_ITEM, value: newItemValue(arr) });
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
        <List dense sx={listStyle}>
          {arr.map((itemValue, index) => (
            // we do want to use the index here as the key as the items may not be unique
            // eslint-disable-next-line react/no-array-index-key
            <ListItem key={index} disablePadding>
              <ListItemButton onClick={() => onEdit(index)}>
                <ListItemText
                  primaryTypographyProps={listItemTextTypographyStyle}
                  primary={valueToString(itemValue)}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Button endIcon={<AddIcon />} color="primary" variant="outlined" fullWidth onClick={onAdd}>
        Add new
      </Button>
    </Stack>
  );
}
