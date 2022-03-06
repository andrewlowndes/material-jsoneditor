import { Breadcrumbs } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import React from 'react';

import type { JSONType } from '../interfaces/JSONType';
import { LevelBreadcrumb } from './LevelBreadcrumb';
import { Breadcrumb } from '../interfaces/Breadcrumb';

export type Path = Array<Breadcrumb>;

export interface LevelSelectorProps {
  obj: JSONType;
  path: Path;
  setPath: (newPath: Path) => void;
}

export function LevelSelector({ obj, path, setPath }: LevelSelectorProps) {
  let subobj = obj;

  const paths = path.map((pathItem) => {
    let items = new Array<Breadcrumb>();

    if (Array.isArray(subobj)) {
      const keys = Array.from(subobj.keys());
      const itemIndex = parseInt(pathItem.toString(), 10);

      items = [...keys.slice(0, itemIndex), ...keys.slice(itemIndex + 1)];
      subobj = subobj[itemIndex];
    } else if (typeof subobj === 'object' && subobj !== null) {
      const keys = new Set(Object.keys(subobj));
      keys.delete(pathItem.toString());
      items = Array.from(keys);
      subobj = subobj[pathItem];
    }

    return {
      items,
      pathItem,
    };
  });

  return (
    <Breadcrumbs aria-label="breadcrumb">
      <LevelBreadcrumb
        item="Root"
        icon={<HomeIcon fontSize="small" />}
        onSelect={() => setPath([])}
      />

      {paths.map((pathPart, index) => (
        <LevelBreadcrumb
          key={pathPart.pathItem}
          item={pathPart.pathItem}
          onSelect={(selectedItem) => setPath([...path.slice(0, index), selectedItem])}
          items={pathPart.items}
        />
      ))}
    </Breadcrumbs>
  );
}
