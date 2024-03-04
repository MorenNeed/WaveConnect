import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Grid, Link } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthProvider';
import { Theme } from '@mui/system';
import Loading from '../Loading';

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        position: 'absolute',
        top: 0,
        left: 0,
    },
    form: {
        width: '50%',
        marginTop: theme.spacing(2),
    },
    submitButton: {
        margin: theme.spacing(3, 0, 2),
        padding: theme.spacing(1.5), // Adjust button padding
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.primary.main,
        '&:hover': {
            textDecoration: 'underline',
        },
    }
}));

const Login = () => {
    const classes = useStyles();
    const { login, error } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [errorState, setErrorState] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            return;
        }
        login(formData.email, formData.password);

        if (error) {
            setErrorState(error);
        } else {
            setLoading(true);

            setTimeout(() => {
                setLoading(false);
                navigate('/');
            }, 2000);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Loading loading={loading} />
            <div className={classes.container}>
                <Typography component="h1" variant="h4" align="center" gutterBottom>
                    Login
                </Typography>
                <Typography variant="body1" align="center" gutterBottom>
                    Log in to your account
                </Typography>
                {errorState && (
                    <Typography variant="body1" align="center" color="error">
                        {errorState}
                    </Typography>
                )}
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                id="password"
                                label="Password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submitButton}
                    >
                        Login
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link
                                className={classes.link}
                                to="/register"
                                component={RouterLink}
                                variant="body2"
                            >
                                Don't have an account? Register
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default Login;
