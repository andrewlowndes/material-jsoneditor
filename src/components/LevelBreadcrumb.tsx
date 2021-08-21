import { Chip, styled, emphasize, MenuItem, MenuList, Popper, Grow, Paper, ClickAwayListener } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { KeyboardEvent, MouseEvent, ReactElement } from 'react';

const ChipBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor = theme.palette.mode === 'light' ? theme.palette.grey[100]: theme.palette.grey[800];
    
    return {
        backgroundColor,
        height: theme.spacing(3),
        color: theme.palette.text.primary,
        fontWeight: theme.typography.fontWeightRegular,
        '&:hover, &:focus': {
            backgroundColor: emphasize(backgroundColor, 0.06),
        },
        '&:active': {
            boxShadow: theme.shadows[1],
            backgroundColor: emphasize(backgroundColor, 0.12),
        }
    };
});

export type Path = Array<string | number>;

export interface LevelBreadcrumbProps {
    icon?: ReactElement;
    label: string;
    onSelect: (string: string | number) => void;
    items?: Array<string | number>;
}

export const LevelBreadcrumb = (props: LevelBreadcrumbProps) => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | undefined>(undefined);

    const openMenu = (e: MouseEvent<HTMLElement>) => {
        setAnchorEl(e.target as HTMLElement);
    };

    const closeMenu = () => {
        setAnchorEl(undefined);
    };

    const selectMenuItem = (item: string | number) => {
        closeMenu();
        props.onSelect(item);
    };

    const handleListKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            closeMenu();
        } else if (e.key === 'Escape') {
            closeMenu();
        }
    };

    return props.items?.length ? (
        <div style={{ position: 'relative' }}>
            <ChipBreadcrumb 
                icon={props.icon}
                label={props.label}
                onClick={() => props.onSelect(props.label)}
                deleteIcon={<ExpandMoreIcon />}
                onDelete={openMenu}
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={anchorEl ? 'true' : undefined}
            />

            <Popper
                open={Boolean(anchorEl)}
                role={undefined}
                anchorEl={anchorEl}
                placement="bottom"
            >
                <Paper>
                    <ClickAwayListener onClickAway={closeMenu}>
                        <MenuList
                            dense
                            autoFocusItem={Boolean(anchorEl)}
                            onKeyDown={handleListKeyDown}
                        >
                            {
                                props.items?.map((item, index) => (
                                    <MenuItem key={index} onClick={() => selectMenuItem(item)}>{item}</MenuItem>
                                ))
                            }
                        </MenuList>
                    </ClickAwayListener>
                </Paper>
            </Popper>
        </div>
    ) : (
        <ChipBreadcrumb 
            icon={props.icon}
            label={props.label}
            onClick={() => props.onSelect(props.label)}
        />
    );
};
