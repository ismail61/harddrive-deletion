const {
    PORT,
    MONGODB_URL,
    JWT_SECRET_KEY,
    JWT_COOKIE_EXPIRES_IN,
    EMAIL_ADDRESS,
    EMAIL_PASSWORD,
} = process.env;

const projectConfig = {
    app: {
        port: parseInt(PORT) || 3001,
    },
    db: {
        url: MONGODB_URL || 'mongodb://localhost:27017/hard-drive'
    },
    jwt: {
        key: JWT_SECRET_KEY || 'secret',
        expire: JWT_COOKIE_EXPIRES_IN || '7d'
    },
    email: {
        address: EMAIL_ADDRESS,
        password: EMAIL_PASSWORD,
    },
};
module.exports = projectConfig;