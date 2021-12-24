const {Router} = require('express');
const router = Router();
const authMiddleware = require('../middleware/auth');


router.get('/', authMiddleware, (req , res)=>{
    res.send('CHAT !!!!!!')
})

module.exports = router;