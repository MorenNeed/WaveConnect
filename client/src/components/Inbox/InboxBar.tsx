import React from "react";
import { makeStyles } from "@mui/styles";
import { Avatar, IconButton, Typography, Tooltip } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Theme } from "@mui/system";
import { useTheme } from "../../hooks/CustomThemeProvider";
import { Brightness4, Brightness7 } from "@mui/icons-material";

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
}));

const InboxBar = ({ username, onSettingsClick, onLogoutClick }) => {
    const classes = useStyles();
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={classes.inboxBar}>
            <div className={classes.userInfo}>
                <Avatar alt="User Avatar" />
                <Typography variant="body1" className={classes.username}>
                    {username}
                </Typography>
            </div>
            <div>
                <Tooltip title="Theme">
                    <IconButton aria-label="theme" className={classes.iconButton} onClick={toggleTheme}>
                        {theme.palette.mode === "light" ? <Brightness4 /> : <Brightness7 />}
                    </IconButton>
                </Tooltip>
                <Tooltip title="Settings">
                    <IconButton onClick={onSettingsClick} aria-label="settings" className={classes.iconButton}>
                        <SettingsIcon />
                    </IconButton>
                </Tooltip>
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
