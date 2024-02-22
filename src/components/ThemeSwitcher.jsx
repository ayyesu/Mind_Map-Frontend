import React, {useContext, useEffect, useState} from 'react';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';

import LightModeSvg from './svg/LightMode';
import DarkModeSvg from './svg/DarkMode';
import {FunctionContext} from '../context/functionContext';

const ThemeSwitcher = ({themeAnchorEl, setthemeAnchorEl, menuId}) => {
    const {setTheme, handleThemeChange} = useContext(FunctionContext);
    // Theme

    const {currentTheme} = useContext(FunctionContext);

    const isThemeOpen = Boolean(themeAnchorEl);

    const handlethemeMenuClose = () => {
        setthemeAnchorEl(null);
    };

    useEffect(() => {
        handleThemeChange();

        return () => {
            document.documentElement.classList.remove('dark');
        };
    }, [setTheme]);

    return (
        <Menu
            anchorEl={themeAnchorEl}
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
            open={isThemeOpen}
            onClose={handlethemeMenuClose}
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
                }  h-full flex flex-col transition-all duration-300`}
            >
                <div>
                    <Button
                        onClick={() => setTheme('light')}
                        className={`${
                            currentTheme === 'dark'
                                ? 'text-white'
                                : 'text-black'
                        }gap-3 `}
                    >
                        <LightModeSvg /> Light Mode
                    </Button>
                </div>

                <div>
                    <Button
                        onClick={() => setTheme('dark')}
                        className={`${
                            currentTheme === 'dark'
                                ? 'text-white'
                                : 'text-black'
                        }gap-3 `}
                    >
                        <DarkModeSvg />
                        Dark Mode
                    </Button>
                </div>
            </div>
        </Menu>
    );
};

export default ThemeSwitcher;
