import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import React, {useContext} from 'react';
import {FunctionContext} from '../context/functionContext';

const BookCard = ({imageUrl, title, description}) => {
    const truncatedDescription = description.slice(0, 50) + '...';
    const truncatedtitle = title.slice(0, 20) + '...';

    const {currentTheme} = useContext(FunctionContext);

    return (
        <Card
            className={`w-80 h-95 flex flex-col rounded-2xl ${
                currentTheme === 'dark' ? 'bg-slate-800 text-white' : ''
            }`}
        >
            <CardMedia component='div' sx={{height: 240}}>
                <img
                    src={imageUrl}
                    loading='lazy'
                    className='bookCardImage'
                    alt='Book Cover'
                    title={title}
                    style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                    }}
                />
            </CardMedia>
            <CardContent
                className={`${
                    currentTheme === 'dark' ? 'bg-slate-800' : ''
                } p-10`}
            >
                <Typography
                    gutterBottom
                    variant='h6'
                    component='h4'
                    fontSize='1.0rem'
                    fontFamily={'Inter'}
                >
                    {truncatedtitle}
                </Typography>
                <Typography fontSize='0.8rem' fontFamily={'Inter'}>
                    {truncatedDescription}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default BookCard;
