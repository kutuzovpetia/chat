const {Router} = require('express');
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const multer = require("multer");
const router = Router();
const fs = require('fs-extra');
const path = require("path");

//Option multer ****************************************************

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, 'uploads')
    },
    filename(req, file, cb){
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
})

fileMiddleware = multer({storage: storage})


//Routes *************************************************************

router.get('/', (req,res)=>{
    res.send('<h1>Registration</h1><pr><a href="/">back home</a>')
})

router.post('/', fileMiddleware.single('photo'), async (req, res)=>{

    const {name, password, details, imgUrl} = req.body;
    const candidate = await User.findOne({name});

    try {
        if(candidate){
            fs.remove(path.join(__dirname, `/../uploads/${req.file.filename}`))
            res.status(401).send({message: 'User with this name exists'});
        }else {
            const hashPassword = await bcrypt.hash(password, 10);
            const user = new User({name, password: hashPassword});
            const folderName = user.id;

            fs.mkdirs(path.join(__dirname, `/../uploads/${folderName}`));
            const src = path.join(__dirname, `/../${req.file.path}`);
            const dest = path.join(__dirname, `/../uploads/${folderName}/${req.file.filename}`);

            fs.move(src, dest, { overwrite: true }, (err)=>{ if (err) return console.error(err)});
            user.imgUrl = `${folderName}/${req.file.filename}`;

            await user.save(()=>{
                res.send(user);
            });
        }
    }catch (err){
        throw err
    }
});

module.exports = router;