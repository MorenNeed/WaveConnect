import React, { useEffect, useRef } from "react";
import { makeStyles } from "@mui/styles";
import { Typography, Paper } from "@mui/material";
import { Theme } from "@mui/system";
import { useConversation } from "../../hooks/ConversationsProvider";
import { useAuth } from "../../hooks/AuthProvider";
import { Message } from "../../types/Message";
import { Attachement } from "../../types/Attachement";
import FileContent from "./FileContent";

const useStyles = makeStyles((theme: Theme) => ({
  contentContainer: {
    flex: 1,
    overflowY: "auto",
    height: "100%",
  },
  conversationContainer: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    borderRadius: 0,
    minHeight: "100%",
  },
  conversationHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(1, 2),
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: `0 0 ${theme.shape.borderRadius}px ${theme.shape.borderRadius}px`,
    position: "sticky",
    top: 0,
    zIndex: 1,
  },
  participants: {
    marginRight: theme.spacing(2),
    fontWeight: "bold",
  },
  messageContainer: {
    marginTop: theme.spacing(2),
  },
  message: {
    padding: theme.spacing(1, 2),
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(1),
    width: "fit-content",
    maxWidth: "40%",
  },
  ownMessage: {
    backgroundColor: theme.palette.primary.light,
    textAlign: "right",
    marginLeft: "auto",
  },
  otherMessage: {
    backgroundColor: theme.palette.secondary.light,
    textAlign: "left",
  },
  messageText: {
    color: theme.palette.text.secondary,
  },
  messageFile: {
    color: theme.palette.text.primary,
    textDecoration: "none",
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    backgroundColor: theme.palette.action.hover,
    display: "block",
    width: "fit-content",
  },
  timestamp: {
    color: theme.palette.text.secondary,
    fontSize: "0.75rem",
    marginTop: theme.spacing(1),
  },
}));

const ConversationContent = () => {
  const classes = useStyles();
  const { selectedConversation } = useConversation();
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedConversation]);

  return (
    <div className={classes.contentContainer}>
      {selectedConversation && (
        <>
          <div className={classes.conversationHeader}>
            <Typography variant="h6">{selectedConversation.name}</Typography>
          </div>
          <Paper className={classes.conversationContainer} elevation={0}>
            <div className={classes.messageContainer}>
              {selectedConversation.messages.map((message) => (
                <Paper
                  key={message._id}
                  className={`${classes.message} ${message.sender === user?.uid
                    ? classes.ownMessage
                    : classes.otherMessage
                    }`}
                >
                  <Typography variant="body1" className={classes.messageText}>
                    {message.content.text}
                  </Typography>
                  {message.content.attachements?.map((attachement: Attachement) => (
                    <FileContent key={attachement.name} attachment={attachement} />
                  ))}
                  <Typography variant="body2" className={classes.timestamp}>
                    {new Date(message.updatedAt).toLocaleString()}
                  </Typography>
                </Paper>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </Paper>
        </>
      )}
    </div>
  );
};

export default ConversationContent;
