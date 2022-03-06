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

import type { JSONObject, JSONType } from '../../interfaces/JSONType';
import { ObjectActions, objectReducer } from '../../reducers/objectReducer';
import valueToString from '../../utils/valueToString';

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

const listItemButtonStyle: SxProps<Theme> = {
  width: '100%',
};

const listItemTextStyle: SxProps<Theme> = {
  flexBasis: '50%',
};

const listItemTextTypographyStyle: TypographyProps = {
  align: 'left',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
};

export interface ObjectEditorProps {
  value: JSONObject;
  onEdit: (propName: string) => void;
  onChange: (newValue: JSONObject) => void;
  newItemValue: (obj: JSONObject) => JSONType;
  newItemKey: (obj: JSONObject) => string;
}

export function ObjectEditor({
  value,
  onChange,
  onEdit,
  newItemKey,
  newItemValue,
}: ObjectEditorProps) {
  const [obj, dispatch] = useReducer(objectReducer, value);

  useEffect(() => {
    onChange(obj);
    // do not trigger an update when the change func is updated
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [obj]);

  useEffect(() => {
    dispatch({ action: ObjectActions.SET, value });
  }, [value]);

  const onAdd = () => {
    dispatch({
      action: ObjectActions.ADD_ITEM,
      key: newItemKey(obj),
      value: newItemValue(obj),
    });
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
          {Object.keys(obj).map((key) => (
            <ListItem key={key} disablePadding>
              <ListItemButton sx={listItemButtonStyle} onClick={() => onEdit(key)}>
                <ListItemText
                  sx={listItemTextStyle}
                  primaryTypographyProps={listItemTextTypographyStyle}
                  primary={key}
                />
                <ListItemText
                  sx={listItemTextStyle}
                  secondaryTypographyProps={listItemTextTypographyStyle}
                  secondary={valueToString(obj[key])}
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
