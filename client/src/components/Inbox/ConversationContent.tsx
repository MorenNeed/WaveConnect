import React, { useEffect, useRef, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Typography, Paper, Tooltip, IconButton, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Theme } from "@mui/system";
import { useConversation } from "../../hooks/ConversationsProvider";
import { useAuth } from "../../hooks/AuthProvider";
import { Message } from "../../types/Message";
import { Attachement } from "../../types/Attachement";
import FileContent from "./FileContent";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMessages } from "../../hooks/MessagesProvider";

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
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
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
  selectedMessage: {
    backgroundColor: theme.palette.action.selected,
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
  tooltipButton: {
    marginRight: theme.spacing(1),
  },
  editContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginBottom: theme.spacing(1),
  },
  editMessageInput: {
    marginBottom: theme.spacing(1),
  },
  modalMessageText: {
    color: theme.palette.error.main,
  }
}));

const ConversationContent = () => {
  const classes = useStyles();
  const { selectedConversation } = useConversation();
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [editingMessage, setEditingMessage] = useState<Message | null>(null);
  const [editedText, setEditedText] = useState<string>("");
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const { deleteMessage, updateMessage } = useMessages();
  const { deleteMessageFromConversation, updateMessageInConversation } = useConversation();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedConversation]);

  const handleMessageClick = (message: Message) => {
    if (editingMessage) return; // Prevent changing selection while editing
    if (message.sender === user?.uid) {
      setSelectedMessage(message);
    }
  }

  const handleEdit = (message: Message) => {
    setEditingMessage(message);
    setEditedText(message.content.text);
  };

  const handleSaveEdit = () => {
    if (editingMessage && editedText !== "") {
      const updatedMessage = { ...editingMessage, content: { text: editedText, attachements: editingMessage.content.attachements } };
      updateMessage(updatedMessage._id, updatedMessage.content).then((message) => {
        updateMessageInConversation(message.conversationId, message);
      });

      setEditingMessage(null);
      setEditedText("");
    }
  };

  const handleCancelEdit = () => {
    setEditingMessage(null);
    setEditedText("");
  };

  const handleDelete = (message: Message) => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (selectedMessage) {
      deleteMessage(selectedMessage._id).then(() => {
        deleteMessageFromConversation(selectedMessage.conversationId, selectedMessage._id);
      });
    }
    
    setShowDeleteModal(false);
    setSelectedMessage(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

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
                    } ${selectedMessage === message && classes.selectedMessage}`}
                  onClick={() => handleMessageClick(message)}
                >
                  {editingMessage === message ? (
                    <div className={classes.editContainer}>
                      <TextField
                        multiline
                        rows={2}
                        fullWidth
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        className={classes.editMessageInput}
                      />
                      <div>
                        <Button variant="contained" color="primary" onClick={handleSaveEdit}>
                          Save
                        </Button>
                        <Button onClick={handleCancelEdit}>Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <Typography variant="body1" className={classes.messageText}>
                        {message.content.text}
                      </Typography>
                      {message.content.attachements?.map((attachement: Attachement) => (
                        <FileContent key={attachement.name} attachment={attachement} />
                      ))}
                      <Typography variant="body2" className={classes.timestamp}>
                        {new Date(message.updatedAt).toLocaleString()}
                      </Typography>
                      {selectedMessage === message && (
                        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "8px" }}>
                          {message.sender === user?.uid && (
                            <Tooltip title="Edit">
                              <IconButton
                                className={classes.tooltipButton}
                                onClick={() => handleEdit(message)}
                              >
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                          {editingMessage !== message && (
                            <Tooltip title="Delete">
                              <IconButton
                                className={classes.tooltipButton}
                                onClick={() => handleDelete(message)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                        </div>
                      )}
                    </>
                  )}
                </Paper>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </Paper>
          {/* Delete Confirmation Modal */}
          <Dialog open={showDeleteModal} onClose={cancelDelete}>
            <DialogTitle>Delete Message</DialogTitle>
            <DialogContent>
              <Typography variant="body1">
                Are you sure to delete: <span className={classes.modalMessageText}>{selectedMessage?.content.text}</span>?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={confirmDelete} color="primary">
                Yes
              </Button>
              <Button onClick={cancelDelete} color="primary">
                No
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default ConversationContent;