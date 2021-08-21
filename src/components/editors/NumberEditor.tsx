import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";

export interface NumberEditorProps {
    value: number;
    label: string;
    onChange: (newValue: number) => void;
}

export const NumberEditor = (props: NumberEditorProps) => {
    const [inputValue, setInputValue] = useState(props.value.toString());

    useEffect(() => {
        setInputValue(props.value.toString());
    }, [props.value]);

    const updateValue = (newInputValue: string) => {
        setInputValue(newInputValue);

        const newValue = parseFloat(newInputValue);

        if (!isNaN(newValue) && isFinite(newValue)) {
            props.onChange(newValue);
        }
    };

    return (
        <TextField 
            size="small" 
            label={props.label} 
            fullWidth={true} 
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
            InputLabelProps={{ shrink: true }}
            value={inputValue} 
            onChange={(e) => updateValue(e.target.value)} />
    );
};
