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
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASS || '',
        database: process.env.MYSQL_DB || 'modo_qr',
    },
    mysqlService: {
        host: process.env.MYSQL_SRV_HOST || 'localhost',
        port: process.env.MYSQL_SRV_PORT || 8080
    },
    cacheService: {
        host: process.env.CACHE_SRV_HOST || 'localhost',
        port: process.env.CACHE_SRV_PORT || 3002
    },
    redis:{
        host: process.env.REDIS_HOST || 'redis-13556.c14.us-east-1-3.ec2.cloud.redislabs.com',
        port: process.env.REDIS_PORT || 13556,
        password: process.env.REDIS_PASS || '9sWIItAvlPbkoTcwOXstNm9hDFv7AU2F',
    }
}