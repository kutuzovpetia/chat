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

// Liked
router.get('/liked/add/:userId/:messageId',  async (req, res)=>{

    const {userId, messageId} = req.params;
    try{
        let message = await Message.findById(messageId);
        message.liked.push(userId);
        await message.save();
        res.status(200).json(message);
    }catch (err){
        res.status(500).json(err)
    }
});

// Remove Like
router.get('/liked/remove/:userId/:messageId',  async (req, res)=>{

    const {userId, messageId} = req.params;
    try{
        let message = await Message.findById(messageId);
        message.liked = message.liked.find(item => item !== userId);
        await message.save();
        res.status(200).json(message);
    }catch (err){
        res.status(500).json(err)
    }
});


module.exports = router;