
let mongoose = require('mongoose');
const ENV = process.env;

mongoose.Promise = global.Promise;

const connect = () => {
    let maxConnectTimes = ENV.DB_MAXCONNECT_TIMES;
    let curConnectTimes = 0;
    return new Promise( (resolve, reject) => {
        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true);
        }
        let db_address = ENV.DB_HOST + ENV.DB_NAME;
        let a = mongoose.connect(db_address);
        console.log(db_address)
        // a.then( res => { console.log( 'a', res.connections[0] === mongoose.connection )}).catch(err => console.log('a',err));
        let connection = mongoose.connection;
        connection.on('disconnected', () => {
            if (curConnectTimes < maxConnectTimes) {
                mongoose.connect(db_address);
                curConnectTimes++;
            }
            else {
                throw new Error('估计是数据库挂了');
            }
        })

        connection.on('error', (err) => {
            console.log(err);
            reject('connect error');
        })
    
        connection.once('open', () => {
            console.log('MongoDB Connected successfully');
            resolve(true);
        })
    })
}

const initSchema = () => {
    require('./schema/user.js');
    require('./schema/question.js');
    require('./schema/tpl.js');
}
module.exports = {
    connect,
    initSchema,
}
