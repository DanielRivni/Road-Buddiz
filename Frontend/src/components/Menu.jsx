import * as React from 'react';
import { Button, ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useNavigate } from 'react-router-dom';

const ClientMenuList = ({ uid }) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const navigate = useNavigate();

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    const handleIssuesClick = () => {
        // Use navigate to go to '/RequestsPage' when the history menu item is clicked
        navigate('/RequestsPage', { state: { uid: uid } });
        setOpen(false); // Close the menu
    };

    const handleProfileClick = () => {
        navigate('/ClientProfile', { state: { uid: uid } });
        setOpen(false);
    };

    const handleLogoutClick = () => {
        localStorage.removeItem("loggedInID");
        navigate('/');
        setOpen(false);
    };

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div>
            <Button
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                {open ? <MenuOpenIcon id='menu-icon' style={{ fontSize: 40 }} /> : <MenuIcon id='menu-icon' style={{ fontSize: 40 }} />}
            </Button>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    className="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                >
                                    <MenuItem onClick={handleProfileClick} style={{ fontSize: '1.2rem', padding: '16px' }}>פרופיל</MenuItem>
                                    <MenuItem onClick={handleIssuesClick} style={{ fontSize: '1.2rem', padding: '16px' }}>תקלות</MenuItem>
                                    <MenuItem onClick={handleLogoutClick} style={{ fontSize: '1.2rem', padding: '16px' }}>התנתק</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
}

const VolunteerMenuList = ({ uid }) => {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const navigate = useNavigate();

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    const handleIssuesClick = () => {
        // Use navigate to go to '/RequestsPage' when the history menu item is clicked
        navigate('/VolunteerTaskPage', { replace: true, state: { uid: uid } });
        setOpen(false); // Close the menu
    };

    const handleProfileClick = () => {
        navigate('/VolunteerProfile', { replace: true, state: { uid: uid } });
        setOpen(false);
    };

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <div>
            <Button
                ref={anchorRef}
                id="composition-button"
                aria-controls={open ? 'composition-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
                {open ? <MenuOpenIcon id='menu-icon' style={{ fontSize: 40 }} /> : <MenuIcon id='menu-icon' style={{ fontSize: 40 }} />}
            </Button>
            <Popper
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                placement="bottom-start"
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList
                                    autoFocusItem={open}
                                    className="composition-menu"
                                    aria-labelledby="composition-button"
                                    onKeyDown={handleListKeyDown}
                                >
                                    <MenuItem onClick={handleProfileClick} style={{ fontSize: '1.2rem', padding: '16px' }}>פרופיל</MenuItem>
                                    <MenuItem onClick={handleIssuesClick} style={{ fontSize: '1.2rem', padding: '16px' }}>משימות</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
}

export { ClientMenuList, VolunteerMenuList };
