import React from "react";
import { makeStyles } from "@mui/styles";
import { Avatar, Typography } from "@mui/material";
import { Theme } from "@material-ui/core";
import { useConversation } from "../../hooks/ConversationsProvider";

const useStyles = makeStyles((theme: Theme) => ({
    inboxList: {
        overflowY: "auto",
        height: "100%",
    },
    inboxItem: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(2),
        borderBottom: `1px solid ${theme.palette.divider}`,
        cursor: "pointer",
        transition: "background-color 0.3s",
        "&:hover": {
            backgroundColor: theme.palette.action.hover,
        },
    },
    avatar: {
        marginRight: theme.spacing(2),
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
    inboxInfo: {
        flexGrow: 1,
    },
    unreadBadge: {
        marginLeft: "auto",
    },
    selected: {
        backgroundColor: theme.palette.action.selected,
    },
}));

const InboxList = () => {
    const classes = useStyles();

    const { userConversations, selectedConversation, selectConversation } = useConversation();

    return (
        <div className={classes.inboxList}>
            {userConversations
                .sort((a, b) => Number(b.updatedAt) - Number(a.updatedAt))
                .map((conversation) => (
                    <div
                        key={conversation._id}
                        className={`${classes.inboxItem} ${conversation === selectedConversation ? classes.selected : ""}`}
                        onClick={() => selectConversation(conversation)}
                    >
                        <Avatar alt={conversation.name} src={conversation.avatar} className={classes.avatar} />
                        <div className={classes.inboxInfo}>
                            <Typography variant="h6">{conversation.name}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                {conversation.lastMessage?.content.text}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {conversation.lastMessage?.content.attachements?.length ?? 0 > 0 ? "📎" : ""}
                            </Typography>
                        </div>
                        {/* {conversation.unreadCount > 0 && (
                            <div className={classes.unreadBadge}>
                                <Typography variant="body2">{conversation.unreadCount}</Typography>
                            </div>
                        )} */}
                    </div>
                ))}
        </div>
    );
};

export default InboxList;
