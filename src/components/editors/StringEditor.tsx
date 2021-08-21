import { TextField } from '@material-ui/core';
import React from 'react';

export interface StringEditorProps {
    label: string;
    value: string;
    onChange: (newValue: string) => void;
}

export const StringEditor = (props: StringEditorProps) => {
    return (
        <TextField
            sx={{
                '& .MuiInputBase-root': {
                    flex: 1
                }
            }}
            label={props.label}
            margin="dense"
            fullWidth={true}
            style={{ flex: 1 }}
            InputLabelProps={{ shrink: true }}
            inputProps={{ style: { height: '100%', overflow: 'auto' } }}
            hiddenLabel={true}
            autoCorrect="off" 
            spellCheck="false" 
            autoComplete="off"
            multiline={true}
            variant="outlined"
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
        />
    );
};
