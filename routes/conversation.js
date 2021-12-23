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

//Add to Favorites
router.get('/favorite/add/:userId/:conversationId', async (req, res)=>{

    const {userId, conversationId} = req.params;
    try{
        const conversation = await Conversation.findById(conversationId);
        conversation.favorite.push(userId);
        await conversation.save();
        res.status(200).json(conversation);
    }catch (err){
        res.status(500).json(err)
    }
})

//Remove from Favorites
router.get('/favorite/remove/:userId/:conversationId', async (req, res)=>{

    const {userId, conversationId} = req.params;
    try{
        let conversation = await Conversation.findById(conversationId);
        conversation.favorite = conversation.favorite.filter(item => item !== userId);
        await conversation.save();
        res.status(200).json(conversation);
    }catch (err){
        res.status(500).json(err)
    }
})

module.exports = router;
