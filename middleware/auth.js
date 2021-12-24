const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){

    if(req.method === 'OPTIONS'){
        next()
    }

    try{
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            return res.status(400).json({message: 'User not logged in'})
        }
        const decodedData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        req.user = decodedData;
        next();
    }catch (err){
        console.log(err);
        return res.status(400).json({message: 'User not logged in'})
    }
}