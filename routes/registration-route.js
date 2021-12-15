const {Router} = require('express');
const router = Router();

router.get('/', (req,res)=>{
    res.send('<h1>Registration</h1><pr><a href="/">back home</a>')
})

module.exports = router;