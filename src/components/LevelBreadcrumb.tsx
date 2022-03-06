import { MenuItem, MenuList, Popper, Paper, ClickAwayListener } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { KeyboardEvent, MouseEvent, ReactElement } from 'react';

import type { Breadcrumb } from '../interfaces/Breadcrumb';
import ChipBreadcrumb from './ChipBreadcrumb';

export interface LevelBreadcrumbProps {
  icon?: ReactElement;
  item: Breadcrumb;
  onSelect: (item: Breadcrumb) => void;
  items?: Array<Breadcrumb>;
}

export function LevelBreadcrumb({ items, onSelect, icon, item }: LevelBreadcrumbProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | undefined>(undefined);

  const openMenu = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.target as HTMLElement);
  };

  const closeMenu = () => {
    setAnchorEl(undefined);
  };

  const selectMenuItem = (selectedItem: Breadcrumb) => {
    closeMenu();
    onSelect(selectedItem);
  };

  const handleListKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      closeMenu();
    } else if (e.key === 'Escape') {
      closeMenu();
    }
  };

  return items?.length ? (
    <div style={{ position: 'relative' }}>
      <ChipBreadcrumb
        icon={icon}
        label={item}
        onClick={() => onSelect(item)}
        deleteIcon={<ExpandMoreIcon />}
        onDelete={openMenu}
        aria-controls="basic-menu"
        aria-haspopup="true"
        aria-expanded={anchorEl ? 'true' : undefined}
      />

      <Popper open={Boolean(anchorEl)} role={undefined} anchorEl={anchorEl} placement="bottom">
        <Paper>
          <ClickAwayListener onClickAway={closeMenu}>
            <MenuList dense autoFocusItem={Boolean(anchorEl)} onKeyDown={handleListKeyDown}>
              {items?.map((listItem) => (
                <MenuItem key={listItem} onClick={() => selectMenuItem(listItem)}>
                  {listItem}
                </MenuItem>
              ))}
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </div>
  ) : (
    <ChipBreadcrumb icon={icon} label={item} onClick={() => onSelect(item)} />
  );
}

LevelBreadcrumb.defaultProps = {
  icon: undefined,
  items: [],
};
