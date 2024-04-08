// config.js
const config = {
    development: {
        apiUrl: 'http://localhost:5000',
    },
    production: {
        apiUrl: 'https://mindmap-backend-production.up.railway.app',
    },
};

const environment = process.env.NODE_ENV || 'development';

export default config[environment];
