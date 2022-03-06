import React from 'react';
import { FormControlLabel, Switch } from '@mui/material';

export interface BooleanEditorProps {
  label: string;
  value: boolean;
  onChange: (newValue: boolean) => void;
}

export function BooleanEditor({ label, value, onChange }: BooleanEditorProps) {
  return (
    <FormControlLabel
      label={label}
      control={<Switch checked={value} onChange={(_e, checked) => onChange(checked)} />}
    />
  );
}
