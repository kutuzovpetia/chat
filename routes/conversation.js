const {Router} = require('express');
const router = Router();
const Conversation = require('../models/conversation');
const Message = require('../models/message');

router.get('/getOne/:id',  async (req, res)=>{
    try{
        const conversation = await Conversation.findById(req.params.id).populate('members');
        res.status(200).json(conversation)
    }catch (err){
        res.status(500).json(err)
    }
});

router.post('/add',  async (req, res)=>{

    const conversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    });

    try{
        const savedConversation = await conversation.save();
        const c = await savedConversation.populate('members');
        res.status(200).json(c)
    }catch (err){
        res.status(500).json(err)
    }
});

router.get('/:userId',  async (req, res)=>{
    try{
        const conversation = await Conversation.find({
            members: {$in: [req.params.userId]},
        }).populate('members')
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

//Remove conversation
router.delete('/remove', async (req, res)=>{

    try {
        const conversationDeleted = await Conversation.deleteMany({
            _id: {
                $in: req.body
            }
        })

        const messagesDeleted = await Message.deleteMany({
            conversationId: {
                $in: req.body
            }
        })

        res.status(200).json({conversationDeleted, messagesDeleted})

    }catch (err){
        res.status(500).json(err)
    }



})


module.exports = router;
