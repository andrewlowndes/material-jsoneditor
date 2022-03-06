import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

import type { JSONType } from '../../interfaces/JSONType';

export interface JSONTextEditorProps {
  value: JSONType;
  onChange: (val: JSONType) => void;
}

export function JSONTextEditor({ value, onChange }: JSONTextEditorProps) {
  const [textareaValue, setTextareaValue] = useState(JSON.stringify(value, null, '    '));
  const [isValid, setIsValid] = useState(true);

  const updateValue = (newValue: string) => {
    setTextareaValue(newValue);

    try {
      const parsedResult = JSON.parse(newValue);
      setIsValid(true);
      onChange(parsedResult);
    } catch (err) {
      setIsValid(false);
    }
  };

  useEffect(() => {
    setTextareaValue(JSON.stringify(value, null, '    '));
    setIsValid(true);
  }, [value]);

  return (
    <TextField
      sx={{
        '& .MuiInputBase-root': {
          flex: 1,
        },
      }}
      margin="dense"
      fullWidth
      style={{ flex: 1, margin: 0 }}
      inputProps={{ style: { height: '100%', overflow: 'auto' } }}
      error={!isValid}
      hiddenLabel
      autoCorrect="off"
      spellCheck="false"
      autoComplete="off"
      multiline
      variant="outlined"
      onChange={(e) => updateValue((e.target as HTMLTextAreaElement).value)}
      value={textareaValue}
    />
  );
}
