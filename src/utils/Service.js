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

export const postRequest = async (url) => {
    try {
        const response = await axios.post(url);
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
        return {error: 'An error occurred making a post request'};
    }
};
