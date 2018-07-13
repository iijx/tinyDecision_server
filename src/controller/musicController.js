import { Mongoose } from 'mongoose';

const qiniu = require('qiniu');
const ENV = process.env;


const _getUploadToken = (() => {
    const { Qiniu_AccessKey, Qiniu_SecretKey, Qiniu_Bucket } = ENV;
    const mac = new qiniu.auth.digest.Mac(Qiniu_AccessKey, Qiniu_SecretKey);
    var putPolicy = new qiniu.rs.PutPolicy({
        scope: Qiniu_Bucket,
    });

    return function(){ 
        return putPolicy.uploadToken(mac) 
    };
})();

module.exports = {
    create: async function(ctx, next) {
        let Music = Mongoose.Modal('Music');
        let token = _getUploadToken();
        console.log('gte token', token);
        ctx.body = {
            success: true,
            result: {
                token,
                domain: ENV.Qiniu_Domain
            }
        }
    }
}