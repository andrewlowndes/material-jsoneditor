import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";

import type { JSONType } from "../../interfaces/JSONType";

export interface JSONTextEditorProps {
    value: JSONType;
    onChange?: (val: JSONType) => void;
}

export const JSONTextEditor = (props: JSONTextEditorProps) => {
    const [textareaValue, setTextareaValue] = useState(JSON.stringify(props.value, null, '    '));
    const [isValid, setIsValid] = useState(true);

    const updateValue = (newValue: string) => {
        setTextareaValue(newValue);

        try {
            const parsedResult = JSON.parse(newValue);
            props.onChange?.(parsedResult);
            setIsValid(true);
        } catch (err) {
            setIsValid(false);
        }
    };

    useEffect(() => {
        setTextareaValue(JSON.stringify(props.value, null, '    '));
        setIsValid(true);
    }, [props.value]);

    return (
        <TextField
            sx={{
                '& .MuiInputBase-root': {
                    flex: 1
                }
            }}
            margin="dense"
            fullWidth={true}
            style={{ flex: 1, margin: 0 }}
            inputProps={{ style: { height: '100%', overflow: 'auto' } }}
            error={!isValid}
            hiddenLabel={true}
            autoCorrect="off" 
            spellCheck="false" 
            autoComplete="off"
            multiline={true}
            variant="outlined"
            onChange={(e) => updateValue((e.target as HTMLTextAreaElement).value)} 
            value={textareaValue}
        />
    );
};
