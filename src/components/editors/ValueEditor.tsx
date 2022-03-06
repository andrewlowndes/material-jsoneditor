import { InputLabel, MenuItem, Stack, TextField } from '@mui/material';
import React from 'react';

import type { JSONArray, JSONObject, JSONType } from '../../interfaces/JSONType';
import typeFromValue from '../../utils/typeFromValue';
import valueFromType from '../../utils/valueFromType';
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
  { name: 'Null', value: 'null' },
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

export function ValueEditor({
  value,
  onChange,
  newArrayItemValue,
  onEdit,
  newObjectItemValue,
  newObjectItemKey,
}: ValueEditorProps) {
  const updateValue = (type: string) => {
    onChange(valueFromType(type));
  };

  const valueType = typeFromValue(value);

  const valueEditor = (() => {
    switch (valueType) {
      case 'number':
        return <NumberEditor label="Value" value={value as number} onChange={onChange} />;
      case 'string':
        return <StringEditor label="Value" value={value as string} onChange={onChange} />;
      case 'boolean':
        return <BooleanEditor label="Value" value={value as boolean} onChange={onChange} />;
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
            <InputLabel>Items ({(value as JSONArray).length})</InputLabel>

            <ArrayEditor
              newItemValue={newArrayItemValue}
              onEdit={onEdit}
              value={value as Array<JSONType>}
              onChange={onChange}
            />
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
            <InputLabel>Properties ({Object.keys(value as JSONObject).length})</InputLabel>

            <ObjectEditor
              newItemValue={newObjectItemValue}
              newItemKey={newObjectItemKey}
              value={value as JSONObject}
              onEdit={onEdit}
              onChange={onChange}
            />
          </Stack>
        );
      default:
        return '';
    }
  })();

  return (
    <>
      <TextField
        select
        label="Type"
        size="small"
        fullWidth
        value={typeByValue[valueType].value}
        onChange={(e) => updateValue(e.target.value)}
      >
        {types.map((typeObj) => (
          <MenuItem key={typeObj.value} value={typeObj.value}>
            {typeObj.name}
          </MenuItem>
        ))}
      </TextField>

      {valueEditor}
    </>
  );
}
