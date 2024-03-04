import React from "react";
import { makeStyles } from "@mui/styles";
import SearchBar from "../components/Inbox/SearchBar";
import { useAuth } from "../hooks/AuthProvider";
import { Theme, Paper } from "@mui/material";
import InboxList from "../components/Inbox/InboxList";
import InboxBar from "../components/Inbox/InboxBar";
import { useNavigate } from "react-router-dom";
import ConversationContent from "../components/Inbox/ConversationContent";
import MessageInput from "../components/Inbox/MessageInput";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  },
  chatSection: {
    display: "flex",
    flex: 1,
    overflow: "hidden",
  },
  chatListContainer: {
    width: "300px",
    flexShrink: 0,
    borderRight: `1px solid ${theme.palette.divider}`,
    overflowY: "auto",
    backgroundColor: theme.palette.background.paper,
  },
  chatContent: {
    flex: 1,
    overflowY: "auto",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));

const Inbox = () => {
  const classes = useStyles();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    console.log("Settings clicked");
  };

  const handleLogoutClick = () => {
    logout();

    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className={classes.root}>
      <InboxBar
        username={user?.email}
        onSettingsClick={handleSettingsClick}
        onLogoutClick={handleLogoutClick}
      />
      <div className={classes.chatSection}>
        <Paper className={classes.chatListContainer} elevation={0}>
          <SearchBar />
          <InboxList />
        </Paper>
        <div className={classes.chatContent}>
          <ConversationContent />
          <MessageInput />
        </div>
      </div>
    </div>
  );
};

export default Inbox;
