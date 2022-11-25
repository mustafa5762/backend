const Blog = require("../Models/BlogModel");





module.exports ={
    getblogs: async function(req, res){
      try {
        const pros = await Blog.find({ });
        res.send(pros)
      } catch (error) {
        res.send("An error Occured");
      }
    },
    getlikes: async function(req, res){
      try {
        const pross = await Blog.findOne({ _id:req.params.id });
        res.send(pross.likes)
      } catch (error) {
        res.send("An error Occured");
      }
    },
    getblog: async function(req, res){
      try {
        await Blog.findOneAndUpdate({_id :req.params.id}, {$inc : {views : 1}});
        const pro = await Blog.findOne({ _id:req.params.id });
        res.send(pro)
      } catch (error) {
        res.send("An error Occured");
      }
    },
    postblogs: async function(req, res){
        try {
          const newpro = new Blog({
            title: req.body.title,
            meta_title: req.body.meta_title,
            meta_description: req.body.meta_description,
            description: req.body.description,
            short_description: req.body.short_description,
            category: req.body.category,
            onHomePage: req.body.onHomePage,
            likes: req.body.likes,
            meta_tags: req.body.meta_tags,
            tags: req.body.tags,
            added_by: req.body.added_by,
            views: 0,
            image: req.file.path,
          });
          const saves = await newpro.save();
          res.send(saves);
        } catch (error) {
          res.send(error);
        }
    },
    deleteblog: async function(req, res){
      try {
        const pro = await Blog.findOneAndDelete({ _id:req.params.id });
        res.send(pro)
      } catch (error) {
        res.send("An error Occured");
      }
    },
    likeblog: async function(req, res){
      try {
        await Blog.findByIdAndUpdate(req.params.id, {$push: {likes: req.params.user}})
        res.send('Like Added');
      } catch (error) {
        res.send("error");
      }
    },
    unlikeblog: async function(req, res){
      try {
        await Blog.findByIdAndUpdate(req.params.id, {$pull: {likes: req.params.user}})
        res.send('Like Removed');
      } catch (error) {
        res.send("error");
      }
    },
  };