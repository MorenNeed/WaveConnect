import React from "react";
import { makeStyles } from "@mui/styles";
import { Avatar, IconButton, Typography, Tooltip } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Theme } from "@mui/system";
import { Menu, MenuOpen } from "@mui/icons-material";
import { useMobile } from "../../hooks/MobileProvider";

const useStyles = makeStyles((theme: Theme) => ({
    inboxBar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: theme.spacing(1, 2),
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
    },
    userInfo: {
        display: "flex",
        alignItems: "center",
    },
    username: {
        marginLeft: theme.spacing(1),
        fontWeight: "bold",
    },
    iconButton: {
        color: theme.palette.primary.contrastText,
    },
    menuButton: {
        color: theme.palette.primary.contrastText,
    },
}));

const InboxBar = ({ username, onSettingsClick, onLogoutClick }) => {
    const classes = useStyles();
    const { isMobile, menuToggled, toggleMenuClick } = useMobile();

    return (
        <div className={classes.inboxBar}>
            <div className={classes.userInfo}>
                {isMobile ? (
                <Tooltip title="Toggle Menu">
                    <IconButton onClick={toggleMenuClick} aria-label="menu" className={classes.menuButton}>
                        {menuToggled ? <Menu /> : <MenuOpen />}
                    </IconButton>
                </Tooltip>
                ) : null}
                <Avatar alt="User Avatar" />
                <Typography variant="body1" className={classes.username}>
                    {username}
                </Typography>
            </div>
            <div>
                {/* <Tooltip title="Settings">
                    <IconButton onClick={onSettingsClick} aria-label="settings" className={classes.iconButton}>
                        <SettingsIcon />
                    </IconButton>
                </Tooltip> */}
                <Tooltip title="Logout">
                    <IconButton onClick={onLogoutClick} aria-label="logout" className={classes.iconButton}>
                        <ExitToAppIcon />
                    </IconButton>
                </Tooltip>
            </div>
        </div>
    );
};

export default InboxBar;
