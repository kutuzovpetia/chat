const {Router} = require('express');
const router = Router();
const Conversation = require('../models/conversation');
const User = require('../models/user');


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

//Add to Favorites
router.post('/favorite/add/:userId/:conversationId', async (req, res)=>{

    const {userId, conversationId} = req.params;
    try{
        const conversation = await Conversation.find({_id: conversationId});
        conversation[0].favorite.push(userId);
        await conversation[0].save();
        res.status(200).json(conversation);
    }catch (err){
        res.status(500).json(err)
    }
})

//Remove from Favorites
router.post('/favorite/remove/:userId/:conversationId', async (req, res)=>{

    const {userId, conversationId} = req.params;
    try{
        let conversation = await Conversation.find({_id: conversationId});
        conversation[0].favorite = conversation[0].favorite.filter(item => item !== userId);
        await conversation[0].save();
        res.status(200).json(conversation);
    }catch (err){
        res.status(500).json(err)
    }
})

module.exports = router;
