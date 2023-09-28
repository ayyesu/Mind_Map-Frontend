import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import React from 'react';

const BookCard = ({imageUrl}) => {
    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <CardMedia
                component='div'
                sx={{height: 140}}
                title='green iguana'
                image={imageUrl}
            />
            <CardContent>
                <Typography gutterBottom variant='h5' component='h2'>
                    Heading
                </Typography>
                <Typography>
                    This is a media card. You can use this section to describe
                    the content.
                </Typography>
            </CardContent>
            <CardActions>
                <Button size='small'>View</Button>
            </CardActions>
        </Card>
    );
};

export default BookCard;
