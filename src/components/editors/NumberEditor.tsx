import { TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';

export interface NumberEditorProps {
  value: number;
  label: string;
  onChange: (newValue: number) => void;
}

export function NumberEditor({ value, onChange, label }: NumberEditorProps) {
  const [inputValue, setInputValue] = useState(value.toString());

  useEffect(() => {
    setInputValue(value.toString());
  }, [value]);

  const updateValue = (newInputValue: string) => {
    setInputValue(newInputValue);

    const newValue = parseFloat(newInputValue);

    if (!Number.isNaN(newValue) && Number.isFinite(newValue)) {
      onChange(newValue);
    }
  };

  return (
    <TextField
      size="small"
      label={label}
      fullWidth
      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
      InputLabelProps={{ shrink: true }}
      value={inputValue}
      onChange={(e) => updateValue(e.target.value)}
    />
  );
}
