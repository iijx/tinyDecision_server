

const Router = require('koa-router');
const mongoose = require('mongoose');

const userController = require('../controller/userController');
const questionController = require('../controller/questionController');
const tplController = require('../controller/tplController');


const router = new Router();


router.post('/api/login', userController.login);

router.get('/api/question', questionController.get)
      .post('/api/question', questionController.create)
      .post('/api/questions_init', questionController.init)
      .put('/api/question', questionController.update)


// router.post('/api/formId', formId.add)
router.get('/api/tpl', tplController.get)
      .post('/api/tpl', tplController.create)
      .put('/api/tpl', tplController.update)


// test router
router.get('/api', async (ctx, next) => {
      console.log('tets');
})
router.get('/', async (ctx, next) => {
      console.log('tets');
})

module.exports = router;
