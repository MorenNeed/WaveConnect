import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { IconButton, InputBase, Paper, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Theme } from "@mui/system";
import { useMessages } from "../../hooks/MessagesProvider";
import { useAuth } from "../../hooks/AuthProvider";
import { useConversation } from "../../hooks/ConversationsProvider";
import { Content } from "../../types/Content";

const useStyles = makeStyles((theme: Theme) => ({
    messageInput: {
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(1, 2),
        borderTop: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    fileAttached: {
        marginLeft: theme.spacing(1),
        color: theme.palette.text.secondary,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.action.hover,
        border: `1px solid ${theme.palette.divider}`,
        padding: theme.spacing(1),
    },
}));

const MessageInput = () => {
    const classes = useStyles();
    const [message, setMessage] = useState("");
    const [files, setFiles] = useState<File[]>([]);
    const [fileName, setFileName] = useState<string>("");
    const [filesAttached, setFilesAttached] = useState<boolean>(false);
    const { createMessage } = useMessages();
    const { user } = useAuth();
    const { selectedConversation, addMessage } = useConversation();

    const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setFiles(Array.from(files));
            setFilesAttached(true);
            setFileName(files[0].name); // Set the name of the attached file
        }
    }

    const handleMessageSend = () => {
        if (message || files.length) {
            const content: Content = {
                text: message,
                attachements: null,
            };

            if (user && selectedConversation) {
                createMessage(user.uid, content, files, selectedConversation._id).then((message) => {
                    addMessage(message.conversationId, message);
                });
            }

            setMessage("");
            setFiles([]);
            setFilesAttached(false);
            setFileName(""); // Reset the file name after sending the message
        }
    };

    const isDisabled = !selectedConversation;

    return (
        <Paper className={classes.messageInput} elevation={0}>
            <IconButton aria-label="attach file" disabled={isDisabled}>
                <label htmlFor="file-input">
                    {filesAttached ? <AttachFileIcon color="primary" /> : <AttachFileIcon />}
                </label>
                <input
                    id="file-input"
                    type="file"
                    accept="image/*, video/*, .pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                    multiple
                    disabled={isDisabled}
                />
            </IconButton>
            <InputBase
                className={classes.input}
                placeholder="Type a message..."
                value={message}
                onChange={handleMessageChange}
                inputProps={{ "aria-label": "type a message" }}
                disabled={isDisabled}
            />
            {filesAttached && (
                <Typography className={classes.fileAttached} variant="body2">{fileName}</Typography>
            )}
            <IconButton aria-label="send message" onClick={handleMessageSend} disabled={isDisabled}>
                <SendIcon />
            </IconButton>
        </Paper>
    );
};

export default MessageInput;
