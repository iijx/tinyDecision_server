

const Router = require('koa-router');

const userController = require('../controller/userController');
const questionController = require('../controller/questionController');
const tplController = require('../controller/tplController');
const adminController = require('../controller/adminController');
const qiniuController = require('../controller/qiniuController');
const fileController = require('../controller/fileController');
const recordController = require('../controller/recordController');
const musicController = require('../controller/musicController');

const router = new Router();

const prefix = '/tinydec/api';

router.post(`${prefix}/login`, userController.login);

router.get(`${prefix}/question`, questionController.get)
      .post(`${prefix}/question`, questionController.create)
      .post(`${prefix}/questions_init`, questionController.init)
      .put(`${prefix}/question`, questionController.update)
      .get(`${prefix}/all_questions`, questionController.getAll)

router.get(`${prefix}/tpl`, tplController.get)
      .post(`${prefix}/tpl`, tplController.create)
      .put(`${prefix}/tpl`, tplController.update)
      .get(`${prefix}/all_tpls`, tplController.getAll)

router.post(`${prefix}/admin_register`, adminController.create)
router.post(`${prefix}/admin_login`, adminController.login)


router.post(`${prefix}/record`, recordController.create)
      .get(`${prefix}/record`, recordController.get)

router.post(`${prefix}/music`, musicController.create)
      .get(`${prefix}/music`, musicController.get)
      .get(`${prefix}/music_random`, musicController.music_random)
      .post(`${prefix}/music_addLyric`, musicController.addLyric)

router.get(`${prefix}/users`, userController.get)


// router.get(`${prefix}/lyric_random`, music)
router.get(`${prefix}/isCopy`, async (ctx, next) => {
      ctx.body = {
            success: true,
            result: {
                  isCopy: true,
                  copyText: 'DCWvhj67ZE'
            }
      }
})

router.get(`${prefix}/qiniuToken`, qiniuController.getUploadToken)
module.exports = router;
