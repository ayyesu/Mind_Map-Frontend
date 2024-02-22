import React, {useContext, useState} from 'react';
import {styled, alpha} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {Grid} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import {Link as RouterLink} from 'react-router-dom';
import {Link} from '@mui/material';
import {useLocation} from 'react-router-dom';
import {AuthContext} from '../context/AuthContext';
import {BookContext} from '../context/BookContext';
import SettingSvg from './svg/SettingSvg';
import ManagePostSvg from './svg/ManagePostSvg';
import CreatePostSvg from './svg/CreatePost';
import MenuSvg from './svg/Menu';
import WaitlistSvg from './svg/Waitlist';
import ThemeSwitcher from './ThemeSwitcher';
import {FunctionContext} from '../context/functionContext';
import LogoutSvg from './svg/Logout';

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function NavBar() {
    const {logoutUser, user} = useContext(AuthContext);
    const {setSearchQuery} = useContext(BookContext);
    const {currentTheme} = useContext(FunctionContext);

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    // Theme
    const [themeAnchorEl, setthemeAnchorEl] = useState(null);

    const handlethemeMenuOpen = (event) => {
        setthemeAnchorEl(event.currentTarget);
    };

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
            sx={{
                '& .MuiPaper-root': {
                    background: currentTheme === 'dark' ? '#1f2937' : 'white',
                    color: currentTheme === 'dark' ? 'white' : 'black',
                },
            }}
        >
            <div
                className={`${
                    currentTheme === 'dark' ? 'bg-slate-800 text-white' : ''
                } `}
            >
                {user?.user.role === 'admin' && (
                    <Grid className='menu-items hover:bg-slate-600 transition'>
                        <IconButton
                            size='large'
                            aria-label='admin console'
                            aria-controls='primary-search-account-menu'
                            aria-haspopup='true'
                            color='inherit'
                        >
                            <CreatePostSvg />
                        </IconButton>
                        <Link
                            sx={{textDecoration: 'none'}}
                            component={RouterLink}
                            to={`/admin/${user?.user._id}`}
                        >
                            <MenuItem
                                className={`${
                                    currentTheme === 'light' || null
                                        ? 'text-black'
                                        : 'text-white'
                                }`}
                            >
                                Create Post
                            </MenuItem>
                        </Link>
                    </Grid>
                )}
                {user?.user.role === 'admin' && (
                    <Grid className='menu-items hover:bg-slate-600 transition'>
                        <IconButton
                            size='large'
                            aria-label='admin console'
                            aria-controls='primary-search-account-menu'
                            aria-haspopup='true'
                            color='inherit'
                        >
                            <ManagePostSvg />
                        </IconButton>
                        <Link
                            sx={{textDecoration: 'none'}}
                            component={RouterLink}
                            to={`/user/posts/${user?.user._id}`}
                        >
                            <MenuItem
                                className={`${
                                    currentTheme === 'light' || ''
                                        ? 'text-black'
                                        : 'text-white'
                                }`}
                            >
                                Manage Posts
                            </MenuItem>
                        </Link>
                    </Grid>
                )}
                {user?.user.role === 'user' && (
                    <Grid className='menu-items hover:bg-slate-600 transition'>
                        <IconButton
                            size='large'
                            aria-label='admin console'
                            aria-controls='primary-search-account-menu'
                            aria-haspopup='true'
                            color='inherit'
                        >
                            <WaitlistSvg />
                        </IconButton>
                        <Link
                            sx={{textDecoration: 'none'}}
                            component={RouterLink}
                            to={`/join-waitlist`}
                        >
                            <MenuItem
                                className={`${
                                    currentTheme === 'light' || ''
                                        ? 'text-black'
                                        : 'text-white'
                                }`}
                            >
                                Join the waitlist
                            </MenuItem>
                        </Link>
                    </Grid>
                )}

                {user && (
                    <Grid className='menu-items hover:bg-slate-600 transition'>
                        <IconButton
                            size='large'
                            aria-label='admin console'
                            aria-controls='primary-search-account-menu'
                            aria-haspopup='true'
                            color='inherit'
                        >
                            <SettingSvg />
                        </IconButton>
                        <MenuItem
                            className={`${
                                currentTheme === 'light' || ''
                                    ? 'text-black'
                                    : 'text-white'
                            } flex flex-row`}
                            onClick={handlethemeMenuOpen}
                        >
                            <div>Theme Settings</div>
                        </MenuItem>
                    </Grid>
                )}

                {user && (
                    <Grid className='menu-items hover:bg-slate-600 transition'>
                        <IconButton
                            size='large'
                            aria-label='admin console'
                            aria-controls='primary-search-account-menu'
                            aria-haspopup='true'
                            color='inherit'
                        >
                            <LogoutSvg />
                        </IconButton>
                        <MenuItem onClick={logoutUser}>Log out</MenuItem>
                    </Grid>
                )}
            </div>
        </Menu>
    );

    const renderthememenu = (
        <ThemeSwitcher
            themeAnchorEl={themeAnchorEl}
            setthemeAnchorEl={setthemeAnchorEl}
            menuId={menuId}
        />
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
            sx={{
                '& .MuiPaper-root': {
                    background: currentTheme === 'dark' ? '#1f2937' : 'white',
                    color: currentTheme === 'dark' ? 'white' : 'black',
                },
            }}
        >
            <div
                className={`${
                    currentTheme === 'dark' ? 'bg-slate-800 text-white' : ''
                } `}
            >
                <MenuItem onClick={handleProfileMenuOpen}>
                    <Grid
                        className={`${
                            currentTheme === 'black'
                                ? 'bg-slate-800 text-white'
                                : ''
                        } flex`}
                    >
                        <MenuSvg />

                        <span className='ml-2'>Menu</span>
                    </Grid>
                </MenuItem>
            </div>
        </Menu>
    );

    const location = useLocation();

    return (
        <Box>
            <AppBar position='static'>
                <Toolbar>
                    <Typography
                        variant='h6'
                        noWrap
                        component='div'
                        sx={{
                            display: {
                                xs: `${
                                    location.pathname === '/' ? 'none' : ''
                                }`,
                                sm: 'block',
                            },
                        }}
                    >
                        <Link component={RouterLink} to='/' className='logo'>
                            <img src='/img/logo.png' alt='logo' width='85px' />
                        </Link>
                    </Typography>
                    {location.pathname === '/' && (
                        <Search>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder='Search…'
                                inputProps={{'aria-label': 'search'}}
                                onChange={handleSearch}
                            />
                        </Search>
                    )}

                    <Box sx={{flexGrow: 1}} />
                    <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                        <IconButton
                            size='large'
                            edge='end'
                            aria-label='account of current user'
                            aria-controls={menuId}
                            aria-haspopup='true'
                            onClick={handleProfileMenuOpen}
                            color='inherit'
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>
                    <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size='large'
                            aria-label='show more'
                            aria-controls={mobileMenuId}
                            aria-haspopup='true'
                            onClick={handleMobileMenuOpen}
                            color='inherit'
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>

            <div
                className={`${
                    currentTheme === 'dark' ? 'bg-slate-800 text-white' : ''
                } `}
            >
                {renderMobileMenu}
                {renderMenu}
                {renderthememenu}
            </div>
        </Box>
    );
}
