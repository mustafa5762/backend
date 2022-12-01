const Comment = require("../Models/CommentModel");


module.exports ={
    getcomments: async function(req, res){
      try {
        const cots = await Comment.find({ blogID: req.params.id }).lean();
        res.send(cots)
      } catch (error) {
        res.send("An error Occured");
      }
    },
    postcomment: async function(req, res){
        try {
            const comment = new Comment({
                body: req.body.body,
                blogID: req.body.blogID,
                added_by: {username:req.body.added_by.username,email:req.body.added_by.email,image:req.body.added_by.image}
            })
            const save = await comment.save()
            res.send(save)
        } catch (error) {
            res.send(error)
        }
    },
    likecomment: async function(req, res){
      try {
        await Comment.findByIdAndUpdate(req.body.id, {$push: {likes: req.body.user}}, {new: true})
        res.send('Like Added');
      } catch (error) {
        res.send(error);
      }
    },
    unlikecomment: async function(req, res){
      try {
        await Comment.findByIdAndUpdate(req.body.id, {$pull: {likes: req.body.user}}, {new: true})
        res.send('Like Added');
      } catch (error) {
        res.send("error");
      }
    },
    reply: async function(req, res){
      try {
        var reply =  {body:req.body.body,added_by: {username:req.body.added_by.username,email:req.body.added_by.email,image:req.body.added_by.image}}
        const repl2 = await Comment.findByIdAndUpdate(req.body.id, {$push: {replies: reply}}, {new: true})
        res.send(repl2);
      } catch (error) {
        res.send("error");
      }
    },
};