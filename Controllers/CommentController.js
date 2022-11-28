const Comment = require("../Models/CommentModel");


module.exports ={
    getcomments: async function(req, res){
      try {
        const cots = await Comment.find({ blogID: req.params.id });
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
};