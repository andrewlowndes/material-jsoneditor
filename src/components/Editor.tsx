import { Button, TextField, Stack, Box } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import React, { useCallback, useEffect, useState } from 'react';

import type { JSONArray, JSONObject, JSONType } from '../interfaces/JSONType';
import type { Breadcrumb } from '../interfaces/Breadcrumb';
import { ValueEditor } from './editors/ValueEditor';
import deleteChild from '../utils/deleteChild';
import getChild from '../utils/getChild';
import setChild from '../utils/setChild';
import typeFromValue from '../utils/typeFromValue';
import valueFromType from '../utils/valueFromType';
import { LevelSelector } from './LevelSelector';

const newArrayItemValue = (subobj: JSONArray) => {
  if (subobj.length > 0) {
    const lastItem = subobj[subobj.length - 1];
    return valueFromType(typeFromValue(lastItem));
  }

  return '';
};

const newObjectItemValue = (subobj: JSONObject) => {
  const objKeys = Object.keys(subobj);

  if (objKeys.length > 0) {
    const lastItem = subobj[objKeys[objKeys.length - 1]];
    return valueFromType(typeFromValue(lastItem));
  }

  return '';
};

const newObjectItemKey = (subobj: JSONObject) => {
  // create a new property name that uses the last property name with new number of the end
  const objKeys = Object.keys(subobj);

  let i = 1;
  let newKey = `item${i}`;
  while (objKeys.includes(newKey)) {
    i += 1;
    newKey = `item${i}`;
  }

  return newKey;
};

export interface EditorProps {
  value: JSONType;
  onChange: (newValue: JSONType) => void;
}

export function Editor({ value, onChange }: EditorProps) {
  const [path, setPath] = useState<Array<Breadcrumb>>([]);
  const [obj, setObj] = useState(value);

  const [propName, setPropName] = useState<string | number | undefined>(path[path.length - 1]);

  useEffect(() => {
    setPropName(path[path.length - 1]);
  }, [path]);

  useEffect(() => {
    setObj(value);
  }, [value]);

  const setNewPropName = () => {
    const newPath = path.slice(0, path.length - 1);

    if (propName !== undefined) {
      newPath.push(propName);
    }

    const existingItem = getChild(obj, path);
    const newObj = setChild(deleteChild(obj, path), newPath, existingItem);
    setObj(newObj);
    setPath(newPath);
    onChange(newObj);
  };

  const updateObj = useCallback(
    (subobj: JSONType) => {
      const newObj = setChild(obj, path, subobj);
      setObj(newObj);
      onChange(newObj);
    },
    [obj, path, onChange],
  );

  const deleteCurrent = () => {
    const newObj = deleteChild(obj, path);
    setObj(newObj);
    setPath(path.slice(0, path.length - 1));
    onChange(newObj);
  };

  return (
    <Stack
      width="100%"
      direction="column"
      justifyContent="flex-start"
      alignItems="flex-start"
      spacing={2}
    >
      <LevelSelector path={path} setPath={setPath} obj={obj} />

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
          {typeof propName === 'string' ? (
            <TextField
              size="small"
              fullWidth
              label="Property Name"
              value={propName}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setPropName(e.target.value)}
              onBlur={setNewPropName}
            />
          ) : undefined}

          <ValueEditor
            newArrayItemValue={newArrayItemValue}
            newObjectItemValue={newObjectItemValue}
            newObjectItemKey={newObjectItemKey}
            value={getChild(obj, path)}
            onEdit={(index) => setPath([...path, index])}
            onChange={updateObj}
          />
        </Stack>

        {path.length > 0 ? (
          <Box width="100%">
            <Button
              endIcon={<DeleteForeverIcon />}
              color="error"
              variant="outlined"
              fullWidth
              onClick={deleteCurrent}
            >
              Delete
            </Button>
          </Box>
        ) : undefined}
      </Stack>
    </Stack>
  );
}
