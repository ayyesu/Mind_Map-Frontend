import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {ref, getDownloadURL, listAll} from 'firebase/storage';
import {storage} from '../config/FirebaseConfig';
import {useEffect, useState} from 'react';
import {useContext} from 'react';

const BookCard = () => {
    const [formData, setFormData] = useState([]);
    console.log('Form Data', formData);
    const ImageListRef = ref(storage, 'images/');
    // const FileRef = ref(storage, 'files');

    useEffect(() => {
        listAll(ImageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setFormData((prevState) => [...prevState, url]);
                });
            });
        });
        // getDownloadURL(FileRef).then((url) => {
        //     setFormData({
        //         ...formData,
        //         file: url,
        //     });
        // });
    }, []);

    return (
        <>
            <Card
                sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                {formData.map((url) => (
                    <CardMedia
                        component='div'
                        sx={{
                            // 16:9
                            pt: '56.25%',
                        }}
                        image={url}
                        key={url + Math.random()}
                    />
                ))}
                <CardContent sx={{flexGrow: 1}}>
                    <Typography gutterBottom variant='h5' component='h2'>
                        Heading
                    </Typography>
                    <Typography>
                        This is a media card. You can use this section to
                        describe the content.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size='small'>View</Button>
                </CardActions>
            </Card>
            ;
        </>
    );
};

export default BookCard;
