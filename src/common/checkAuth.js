const Config = require('../config');
const jwt = require('jsonwebtoken');
const resolveTokenFromHeaders = (headers) => {
    if (!headers || !headers.authorization) return '';
    const parts = headers.authorization.split(' ');

    if (parts.length === 2) {
        const scheme = parts[0];
        const token = parts[1];

        if (/^Bearer$/i.test(scheme)) {
            return token || '';
        }
    }
    else return '';
}
const checkAuth = async function (ctx, next) {
    // 如果不需要登陆，则下一步
    let noLoginApi = Config.AUTH.noLoginApi;
    if (noLoginApi.findIndex(item => ctx.url.indexOf(item) !== -1 ? true : false) !== -1) {
        await next();
        return;
    }
    // 检查权限
    const token = resolveTokenFromHeaders(ctx.headers);
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            ctx.state = decoded;
        } catch (error) {
            ctx.response.status = 401;
            ctx.response.body = {
                code: -101,
                message: 'invalid token or token expired',
                error: error || ''
            };
            return;
        }
        await next()
    } else {
        ctx.response.status = 401;
        ctx.response.body = {
            code: -100,
            message: 'please login first',
        };
        return;
    }
}

module.exports = () => checkAuth;
