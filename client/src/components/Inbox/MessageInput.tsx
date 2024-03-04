import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { IconButton, InputBase, Paper } from "@mui/material";
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
}));

const MessageInput = () => {
    const classes = useStyles();
    const [message, setMessage] = useState("");
    const [file, setFile] = useState<File | undefined>(undefined);
    const { createMessage } = useMessages();
    const { user } = useAuth();
    const { selectedConversation, addMessage } = useConversation();

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleMessageSend = () => {

        if (!message && !file) {
            return;
        }

        const content: Content = {
            type: file ? "file" : "text",
            text: message,
            file: file,
        };

        if (user && selectedConversation) {
            const sender = user.uid;

            createMessage(sender, content, selectedConversation._id)
                .then((message) => {
                    addMessage(message.conversationId, message);
                })
                .catch((error) => {
                    console.error("Error sending message: ", error);
                });
            setMessage("");
        }
    };

    return (
        <Paper className={classes.messageInput} elevation={0}>
            <IconButton aria-label="attach file">
                <AttachFileIcon />
            </IconButton>
            <InputBase
                className={classes.input}
                placeholder="Type a message..."
                value={message}
                onChange={handleMessageChange}
                inputProps={{ "aria-label": "type a message" }}
            />
            <IconButton aria-label="send message" onClick={handleMessageSend}>
                <SendIcon />
            </IconButton>
        </Paper>
    );
};

export default MessageInput;
