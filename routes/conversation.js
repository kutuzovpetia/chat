const {Router} = require('express');
const router = Router();
const Conversation = require('../models/conversation');


router.post('/add',  async (req, res)=>{
    const conversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    });

    try{
        const savedConversation = await conversation.save();
        res.status(200).json(savedConversation)

    }catch (err){
        res.status(500).json(err)
    }
});

router.get('/:userId',  async (req, res)=>{
    try{
        const conversation = await Conversation.find({
            members: {$in: [req.params.userId]},
        })
        res.status(200).json(conversation)

    }catch (err){
        res.status(500).json(err)
    }
});

module.exports = router;