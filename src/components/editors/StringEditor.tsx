import { TextField } from '@mui/material';
import React from 'react';

export interface StringEditorProps {
  label: string;
  value: string;
  onChange: (newValue: string) => void;
}

export function StringEditor({ label, value, onChange }: StringEditorProps) {
  return (
    <TextField
      sx={{
        '& .MuiInputBase-root': {
          flex: 1,
        },
      }}
      label={label}
      margin="dense"
      fullWidth
      style={{ flex: 1 }}
      InputLabelProps={{ shrink: true }}
      inputProps={{ style: { height: '100%', overflow: 'auto' } }}
      hiddenLabel
      autoCorrect="off"
      spellCheck="false"
      autoComplete="off"
      multiline
      variant="outlined"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
