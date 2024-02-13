import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Footer from '../components/Footer';
import {AuthContext} from '../context/AuthContext';

const defaultTheme = createTheme();

export default function SignIn() {
    const {loginUser, updateLoginInfo, loginInfo, loggingIn} =
        React.useContext(AuthContext);

    const handleFieldChange = (fieldName, value) => {
        updateLoginInfo({
            ...loginInfo,
            [fieldName]: value,
        });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component='main' sx={{height: '100vh'}}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(/img/signin-cover.png)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light'
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: 'contain',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <img src='/img/logo.png' alt='logo' width='85px' />
                        </Avatar>
                        <Typography component='h1' variant='h5'>
                            Sign in to your account
                        </Typography>
                        <Box
                            component='form'
                            noValidate
                            onSubmit={loginUser}
                            sx={{mt: 1}}
                        >
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                id='email'
                                label='Email Address'
                                onChange={(e) =>
                                    handleFieldChange('email', e.target.value)
                                }
                                name='email'
                                autoComplete='email'
                                autoFocus
                            />
                            <TextField
                                margin='normal'
                                required
                                fullWidth
                                name='password'
                                label='Password'
                                type='password'
                                id='password'
                                onChange={(e) =>
                                    handleFieldChange(
                                        'password',
                                        e.target.value,
                                    )
                                }
                                autoComplete='current-password'
                            />
                            <Button
                                type='submit'
                                fullWidth
                                variant='contained'
                                sx={{mt: 3, mb: 2}}
                            >
                                {loggingIn ? '...' : 'Sign In'}
                            </Button>
                            <Grid container>
                                {/* <Grid item xs>
                                    <Link to='#' variant='body2'>
                                        Forgot password?
                                    </Link>
                                </Grid> */}
                                <Grid item>
                                    <Link to='/signup' variant='body2'>
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Footer sx={{mt: 5}} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}
