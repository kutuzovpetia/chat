const {Router} = require('express');
const router = Router();
const Message = require('../models/message');


router.post('/add',  async (req, res)=>{

    const message = new Message(req.body)
    try{
        const savedMessage = await message.save();
        res.status(200).json(savedMessage)

    }catch (err){
        res.status(500).json(err)
    }
});

router.get('/:conversationId',  async (req, res)=>{

    try{
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        })
        res.status(200).json(messages);

    }catch (err){
        res.status(500).json(err)
    }
});

module.exports = router;