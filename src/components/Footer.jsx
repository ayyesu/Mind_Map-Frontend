import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Footer(props) {
    return (
        <Typography
            variant='body2'
            color='text.secondary'
            align='center'
            {...props}
        >
            {'Copyright © '}
            <Link href='http://bit.ly/4585fmm'>{'ayyesu'}</Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
