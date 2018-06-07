
// 导入环境变量
require('dotenv').config();


const DB = require('./db');
const Koa =  require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('./router');
// const logger = require('koa-logger');
const checkAuth = require('./common/checkAuth');
// const schedule = require('node-schedule');
// const Config = require('./config');

// schedule.scheduleJob('0 * * * * *', function(){
//     // require('../src/crawler/movie');
// });

;(async () => {
    await DB.connect();
    await DB.initSchema();
    
})()

const App = new Koa();


App
    // .use(logger())
    .use(checkAuth())
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods());

App.listen(process.env.APP_PORT);