import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { InputBase, IconButton, Paper, Avatar, Typography, ClickAwayListener } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Theme } from "@mui/system";
import { useUsers } from "../../hooks/UsersProvider";
import { useConversation } from "../../hooks/ConversationsProvider";
import { useAuth } from "../../hooks/AuthProvider";

const useStyles = makeStyles((theme: Theme) => ({
    searchBar: {
        position: "sticky",
        top: 0,
        zIndex: 1000,
        padding: theme.spacing(1, 2),
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.default,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderRadius: 0,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    searchResultContainer: {
        position: "absolute",
        top: 'calc(100% + 1px)',
        left: 0,
        width: "100%",
        zIndex: 1000,
        backgroundColor: theme.palette.background.paper,
        borderRadius: `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
        maxHeight: "200px",
        overflowY: "auto",
    },
    searchResultItem: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(1, 2),
        cursor: "pointer",
        "&:hover": {
            backgroundColor: theme.palette.action.hover,
        },
    },
    avatar: {
        marginRight: theme.spacing(2),
    },
}));

const SearchBar = () => {
    const classes = useStyles();
    const [searchQuery, setSearchQuery] = useState("");
    const [showResults, setShowResults] = useState(false);
    const { searchUsers, searchedUsers } = useUsers();
    const { createConversation } = useConversation();
    const { user } = useAuth();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchQuery(value);
        if (value.length >= 3) {
            setShowResults(true);
            searchUsers(value);
        } else {
            setShowResults(false);
        }
    };

    const handleSearch = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (searchQuery.length >= 3) {
            setShowResults(true);
            searchUsers(searchQuery);
        }
    };

    const handleClickAway = () => {
        setShowResults(false);
    };

    const handleClick = (userId: string) => () => {
        setShowResults(false);

        if (user) {
            createConversation(user.uid, userId);
        }
    };

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Paper component="form" className={classes.searchBar}>
                <IconButton type="submit" aria-label="search" onClick={handleSearch}>
                    <SearchIcon />
                </IconButton>
                <InputBase
                    className={classes.input}
                    placeholder="Search..."
                    inputProps={{ "aria-label": "search" }}
                    value={searchQuery}
                    onChange={handleInputChange}
                />
                {showResults && (
                    <Paper className={classes.searchResultContainer}>
                        {searchedUsers.map((user, index) => (
                            <div
                                key={index}
                                className={classes.searchResultItem}
                                onClick={handleClick(user.uid)}
                            >
                                <Avatar className={classes.avatar} />
                                <div>
                                    <Typography variant="subtitle1">{user.name}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {user.email}
                                    </Typography>
                                </div>
                            </div>
                        ))}
                    </Paper>
                )}
            </Paper>
        </ClickAwayListener>
    );
};

export default SearchBar;
