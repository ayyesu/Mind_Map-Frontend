import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import React from 'react';

const BookCard = ({imageUrl, title, description}) => {
    const truncatedDescription = description.slice(0, 50) + '...';
    const truncatedtitle = title.slice(0, 20) + '...';

    return (
        <Card
            sx={{
                width: '80%',
                height: '95%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '10px',
            }}
        >
            <CardMedia component='div' sx={{height: 240}}>
                <img
                    src={imageUrl}
                    alt='Book Cover'
                    title={title}
                    style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                    }}
                />
            </CardMedia>
            <CardContent sx={{padding: '10px'}}>
                <Typography
                    gutterBottom
                    variant='h6'
                    component='h4'
                    fontSize='1.0rem'
                >
                    {truncatedtitle}
                </Typography>
                <Typography fontSize='0.8rem'>
                    {truncatedDescription}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default BookCard;
