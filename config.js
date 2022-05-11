require('dotenv').config();
module.exports = {
    remoteDB: process.env.REMOTE_DB || false,
    api: {
        port: process.env.API_PORT || 3005
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'notasecret'
    },
    sentry: {
        id: process.env.SENTRY_ID,
        dns: process.env.SENTRY_DNS
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'remotemysql.com',
        user: process.env.MYSQL_USER || '5atQzokoAZ',
        password: process.env.MYSQL_PASS || 'GQUrZaHS7E',
        database: process.env.MYSQL_DB || '5atQzokoAZ',
    },
    mysqlService: {
        host: process.env.MYSQL_SRV_HOST || 'localhost',
        port: process.env.MYSQL_SRV_PORT || 3003
    }
}