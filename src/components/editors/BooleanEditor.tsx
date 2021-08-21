import React from 'react';
import { FormControlLabel, Switch } from '@material-ui/core';

export interface BooleanEditorProps {
    label: string;
    value: boolean;
    onChange: (newValue: boolean) => void;
}

export const BooleanEditor = (props: BooleanEditorProps) => {
    return (
        <FormControlLabel
            label={props.label}
            control={(
                <Switch checked={props.value} onChange={(_e, checked) => props.onChange(checked)} />
            )}
        />
    )
};
