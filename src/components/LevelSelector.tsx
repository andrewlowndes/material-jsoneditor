import { Breadcrumbs } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import React, { useState } from 'react';

import type { JSONType } from '../interfaces/JSONType';
import { LevelBreadcrumb } from './LevelBreadcrumb';

export type Path = Array<string | number>;

export interface LevelSelectorProps {
    obj: JSONType;
    path: Path;
    setPath: (newPath: Path) => void;
}

export const LevelSelector = (props: LevelSelectorProps) => {
    let subobj = props.obj;

    const paths = props.path.map(pathItem => {
        let items = new Array<string | number>();

        if (Array.isArray(subobj)) {
            const keys = Array.from(subobj.keys());
            items = [ ...keys.slice(0, +pathItem), ...keys.slice(+pathItem+1)];
            subobj = subobj[+pathItem];
        } else if (typeof subobj === 'object' && subobj !== null) {
            const keys = new Set(Object.keys(subobj));
            keys.delete(pathItem.toString());
            items = Array.from(keys);
            subobj = subobj[pathItem.toString()];
        }
        
        return {
            items,
            pathItem
        };
    })
    
    return (
        <Breadcrumbs aria-label="breadcrumb">
            <LevelBreadcrumb
                label="Home"
                icon={<HomeIcon fontSize="small" />}
                onSelect={() => props.setPath([])}
            />
            
            {
                paths.map((path, index) => (
                    <LevelBreadcrumb
                        key={index}
                        label={path.pathItem.toString()}
                        onSelect={(selectedItem) => props.setPath([ ...props.path.slice(0, index), selectedItem])}
                        items={path.items}
                    />
                ))
            }
        </Breadcrumbs>
    );
};
