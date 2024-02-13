// config.js
const config = {
    development: {
        apiUrl: 'http://localhost:5000',
    },
    production: {
        apiUrl: 'https://mind-map-api.onrender.com',
    },
};

const environment = process.env.NODE_ENV || 'development';

export default config[environment];
