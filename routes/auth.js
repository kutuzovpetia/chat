const {Router} = require('express');
const multer = require("multer");
const router = Router();
const controller = require('./authController');
const { check } = require('express-validator');
const authMiddleware = require('../middleware/auth');

//Option multer ****************************************************
const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads')
    },
    filename(req, file, cb){
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
})

fileMiddleware = multer({storage: storage});

router.post('/registration', fileMiddleware.array('photo', 1),
    [check('firstName','Not empty').notEmpty(), check('password','4 - 10 symbol').isLength({min: 4, max: 10})]
    , controller.registration);

router.post('/login', controller.login);
router.get('/auth', authMiddleware, controller.auth);
router.get('/user/:id', controller.getUser);
router.get('/users', controller.getUsers);


module.exports = router;