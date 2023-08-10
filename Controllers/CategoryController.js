const Category = require("../Models/CategoryModel");

module.exports ={
    getcategories: async function(req, res){
      try {
        const cats = await Category.findOne({ category_name:req.query.name });
        res.send(cats)
      } catch (error) {
        res.send("An error Occured");
      }
    },
    postcategory: async function(req, res){
      try {
        const newcat = new Category({
          category_name:  req.body.category_name,
          category_description: req.body.category_description
        });
        const cats = await newcat.save();
        res.send(cats)
      } catch (error) {
        res.send(error);
      }
  },
  };
