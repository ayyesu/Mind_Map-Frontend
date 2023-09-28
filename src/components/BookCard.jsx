import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {ref, getDownloadURL, listAll} from 'firebase/storage';
import {storage} from '../config/FirebaseConfig';
import {useEffect, useState} from 'react';

const BookCard = () => {
    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(true);

    const ImageListRef = ref(storage, 'images/');

    useEffect(() => {
        listAll(ImageListRef).then((response) => {
            const promises = response.items.map((item) => getDownloadURL(item));

            Promise.all(promises).then((urls) => {
                setFormData(urls);
                setLoading(false);
            });
        });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            {formData.map((url) => (
                <CardMedia
                    sx={{height: 140}}
                    title='green iguana'
                    image={url}
                    key={url}
                />
            ))}
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
