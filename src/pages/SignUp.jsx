import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Footer from '../components/Footer';
import {AuthContext} from '../context/AuthContext';

const defaultTheme = createTheme();

export default function SignUp() {
    const {registerUser, registerInfo, updateRegisterInfo, signingup} =
        React.useContext(AuthContext);

    const handleFieldChange = (fieldName, value) => {
        updateRegisterInfo({
            ...registerInfo,
            [fieldName]: value,
        });
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component='main' maxWidth='xs'>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                        <img
                            src='/img/mindmap-logo.png'
                            alt='logo'
                            width='85px'
                        />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Sign up for an account
                    </Typography>
                    <Box
                        component='form'
                        noValidate
                        onSubmit={registerUser}
                        sx={{mt: 3}}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete='given-name'
                                    name='firstName'
                                    required
                                    fullWidth
                                    id='firstName'
                                    label='First Name'
                                    autoFocus
                                    onChange={(e) =>
                                        handleFieldChange(
                                            'firstName',
                                            e.target.value,
                                        )
                                    }
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id='lastName'
                                    label='Last Name'
                                    name='lastName'
                                    autoComplete='family-name'
                                    onChange={(e) =>
                                        handleFieldChange(
                                            'lastName',
                                            e.target.value,
                                        )
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id='username'
                                    label='Username'
                                    name='username'
                                    autoComplete='username'
                                    onChange={(e) =>
                                        handleFieldChange(
                                            'username',
                                            e.target.value,
                                        )
                                    }
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id='email'
                                    label='Email Address'
                                    name='email'
                                    autoComplete='email'
                                    onChange={(e) =>
                                        handleFieldChange(
                                            'email',
                                            e.target.value,
                                        )
                                    }
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name='password'
                                    label='Password'
                                    type='password'
                                    id='password'
                                    autoComplete='new-password'
                                    onChange={(e) =>
                                        handleFieldChange(
                                            'password',
                                            e.target.value,
                                        )
                                    }
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            sx={{mt: 3, mb: 2}}
                        >
                            {signingup ? '...' : 'Sign up'}
                        </Button>
                        <Grid container justifyContent='flex-end'>
                            <Grid item>
                                <Link href='/signin' variant='body2'>
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Footer sx={{mt: 5}} />
            </Container>
        </ThemeProvider>
    );
}