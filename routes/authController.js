const User = require('../models/user');
const bcrypt = require("bcryptjs");
const fs = require('fs-extra');
const path = require("path");
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const generateAccessToken = (id, phoneOrEmail) =>{
    const payload = { id, phoneOrEmail }
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: "10h"})
}

class authController{

    async registration(req, res){

        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                fs.remove(path.join(__dirname, `/../uploads/${req.files[0].filename}`))
                return res.status(400).json({message: 'Registration error', errors})
            }
            const {firstName, secondName, details, password, phoneOrEmail} = req.body;
            const candidate = await User.findOne({phoneOrEmail});

            if(candidate){
                fs.remove(path.join(__dirname, `/../uploads/${req.files[0].filename}`))
                res.status(400).json({message: 'User with this email or phone exists'});
            }else {
                const hashPassword = await bcrypt.hash(password, 10);
                const user = new User({firstName, secondName, details, phoneOrEmail, password: hashPassword});
                const folderName = user.id;

                fs.mkdirs(path.join(__dirname, `/../uploads/${folderName}`));
                const src = path.join(__dirname, `/../${req.files[0].path}`);
                const dest = path.join(__dirname, `/../uploads/${folderName}/${req.files[0].filename}`);

                fs.move(src, dest, { overwrite: true }, (err)=>{ if (err) return console.error(err)});
                user.imgUrl = `${folderName}/${req.files[0].filename}`;

                await user.save(()=>{
                    res.send(user.data);
                });
            }

        }catch (err){
            console.log(err);
            fs.remove(path.join(__dirname, `/../uploads/${req.files[0].filename}`))
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res){
        try{
            const {password, phoneOrEmail} = req.body;
            const user = await User.findOne({phoneOrEmail});
            if(!user){
                res.status(400).json({message: 'User not found'})
            }

            const validPassword = bcrypt.compareSync(password, user.password);
            if(!validPassword){
                res.status(400).json({message: 'Invalid password'})
            }

            const token = generateAccessToken(user._id, user.phoneOrEmail)
            res.json({token, user})

        }catch (err){
            console.log(err);
            res.status(400).json({message: 'Login error'})
        }
    }

    async auth(req, res){

        try {
            const user = await User.findOne({_id: req.user.id})
            const token = jwt.sign({id: user.id}, process.env.JWT_ACCESS_SECRET, {expiresIn: "1h"})
            return res.json({
                token,
                user
            })
        } catch (e) {
            console.log(e)
            res.send({message: "Server error"})
        }
    }

    async getUser(req, res){
        try{
            const user = await User.findById(req.params.id);
            res.json(user)
        }   catch (err){
            throw err
        }
    }
}

module.exports = new authController();