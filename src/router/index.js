

const Router = require('koa-router');
const mongoose = require('mongoose');

const userController = require('../controller/userController');
const questionController = require('../controller/questionController');
const tplController = require('../controller/tplController');


const router = new Router();

const prefix = '/tinydec/api';

router.post(`${prefix}/login`, userController.login);

router.get(`${prefix}/question`, questionController.get)
      .post(`${prefix}/question`, questionController.create)
      .post(`${prefix}/questions_init`, questionController.init)
      .put(`${prefix}/question`, questionController.update)

router.get(`${prefix}/tpl`, tplController.get)
      .post(`${prefix}/tpl`, tplController.create)
      .put(`${prefix}/tpl`, tplController.update)

router.get(`${prefix}/isCopy`, async (ctx, next) => {
      ctx.body = {
            success: true,
            result: {
                  isCopy: false,
                  copyText: 'HvRkKA67st'
            }
      }
})
module.exports = router;
