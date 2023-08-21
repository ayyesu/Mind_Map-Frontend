import axios from 'axios';

export const baseUrl = 'http://localhost:5000/api';

export const getRequest = async (url) => {
    try {
        const response = await axios.get(url);
        const data = response.data;

        if (response.status !== 200) {
            let message;
            if (data?.message) {
                message = data.message;
            } else {
                message = data;
            }
            return {error: true, message};
        }
        return data;
    } catch (error) {
        return {
            error: 'Something happened fetching data, Our team will be working on it',
        };
    }
};

export const postRequest = async (url, body) => {
    try {
        const response = await axios.post(url, body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Response status:', response.status);
        console.log('Response data:', response.data);

        if (response.status !== 200) {
            let message;
            if (response.data?.message) {
                message = response.data.message;
            } else {
                message = 'An error occurred';
            }
            console.log('Error message:', message);
            return {error: true, message};
        }

        return response.data;
    } catch (error) {
        console.error('An error occurred making the request:', error);
        return {error: 'An error occurred making a post request'};
    }
};
