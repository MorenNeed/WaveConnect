import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import DownloadIcon from '@mui/icons-material/FileDownload';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
    messageFile: {
        display: 'flex',
        alignItems: 'center',
        textDecoration: 'none',
        color: theme.palette.primary.main,
        '&:hover': {
            textDecoration: 'underline',
        },
    },
    downloadIcon: {
        marginRight: theme.spacing(1),
    },
    messageImage: {
        maxWidth: '100%',
        height: 'auto',
        borderRadius: theme.shape.borderRadius,
        cursor: 'pointer',
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalImageContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 'none',
    },
    modalImage: {
        maxWidth: '90vw',
        maxHeight: '90vh',
        borderRadius: theme.shape.borderRadius,
    },
}));

const FileContent = ({ attachment }) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const isImage = (attachment) => attachment.type.startsWith('image');

    const handleClick = () => {
        if (isImage(attachment)) {
            setOpen(true);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const formatSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <>
            {isImage(attachment) ? (
                <>
                    <img
                        src={attachment.url}
                        alt={attachment.name}
                        className={classes.messageImage}
                        onClick={handleClick}
                    />
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="image-modal"
                        aria-describedby="image-modal-description"
                        className={classes.modal}
                    >
                        <div className={classes.modalImageContainer}>
                            <img
                                src={attachment.url}
                                alt={attachment.name}
                                className={classes.modalImage}
                            />
                        </div>
                    </Modal>
                </>
            ) : (
                <a
                    href={attachment.url}
                    download
                    className={classes.messageFile}
                >
                    <DownloadIcon className={classes.downloadIcon} />
                    {attachment.name} ({formatSize(attachment.size)})
                </a>
            )}
        </>
    );
};

FileContent.propTypes = {
    attachment: PropTypes.object.isRequired,
};

export default FileContent;
