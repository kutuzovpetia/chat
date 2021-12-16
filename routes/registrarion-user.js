const {Router} = require('express');
const router = Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');

router.post('/registration', async (req, res)=>{
    const {email, password, details, imgUrl} = req.body;
    const candidate = await User.findOne({email});

    try {
        if(candidate){
            res.redirect('/');
        }else {
            const hashPassword = await bcrypt.hash(password, 10);
            const user = new User({email, password: hashPassword, details, imgUrl});
            await user.save(()=>{
                res.send(user)
                res.redirect('/chat');
            });
        }
    }catch (err){
        console.log(err)
    }

});

module.exports = router;