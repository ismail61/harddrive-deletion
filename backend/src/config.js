const {
    PORT,
    MONGODB_URL,
    JWT_SECRET_KEY,
    JWT_COOKIE_EXPIRES_IN,
} = process.env

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
};
module.exports = projectConfig;