
import React from 'react';
import { makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

const useStyles = makeStyles((theme: Theme) => ({
    loading: {
        position: 'absolute',
        top: '0%',
        left: '0%',
        width: '100%',
        height: '100%',
        display: 'flex',
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    loader: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        animation: '$spin 1s linear infinite',
        fontSize: '2rem',
        fontWeight: 'bold',
        color: 'black',
    },
    '@keyframes spin': {
        '0%': {
            transform: 'rotate(0deg)',
        },
        '100%': {
            transform: 'rotate(360deg)',
        },
    },
}));

const Loading = ({ loading }: { loading: boolean }) => {
    const classes = useStyles();

    return (
        <>
            {!loading ? null : (
                <div className={classes.loading}>
                    <div className={classes.loader}>
                        <div>Loading...</div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Loading;