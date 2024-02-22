import React, {useContext} from 'react';
import {TextField, Button, Box, Container, Typography} from '@mui/material';
import {AuthContext} from '../context/AuthContext';
import {FunctionContext} from '../context/functionContext';
import NavBar from '../components/NavBar';

const Waitlist = () => {
    const {user} = useContext(AuthContext);
    const {joinWaitlist, joiningWaitlist, currentTheme, waitlistJoined} =
        useContext(FunctionContext);

    return (
        <div>
            <NavBar />
            <div
                className={`${
                    currentTheme === 'dark' ? 'bg-slate-800 text-white ' : ''
                } admin-request`}
                style={{marginTop: 0}}
            >
                <Container maxWidth='sm'>
                    <Box mt={5}>
                        <Typography
                            fontFamily={'Inter'}
                            variant='h4'
                            align='center'
                            gutterBottom
                        >
                            Join the waitlist
                        </Typography>
                        <Typography
                            fontFamily={'Inter'}
                            variant='body1'
                            align='center'
                            gutterBottom
                        >
                            We're thrilled to hear that you're interested in
                            contributing to our community by publishing
                            books!.Please Join the waitlist, Once we receive
                            your request, our team will review it promptly. If
                            everything aligns, we'll be more than happy to grant
                            you the necessary rights to publish books on our
                            platform.
                        </Typography>
                        <form>
                            <TextField
                                fullWidth
                                variant='outlined'
                                label='Email'
                                name='email'
                                disabled
                                value={user?.user.email || ''}
                                margin='normal'
                                type='email'
                                required
                            />

                            {waitlistJoined ? (
                                <div className='waitlist-bar'>
                                    <span>
                                        Already on the waitlist. You'll receive
                                        an email when you are approved
                                    </span>
                                </div>
                            ) : (
                                <Button
                                    variant='contained'
                                    color='primary'
                                    fontFamily={'Inter'}
                                    onClick={() =>
                                        joinWaitlist(user?.user.email)
                                    }
                                    fullWidth
                                >
                                    {joiningWaitlist
                                        ? 'Joining...'
                                        : 'Join waitlist'}
                                </Button>
                            )}
                        </form>
                    </Box>
                </Container>
            </div>
        </div>
    );
};

export default Waitlist;
