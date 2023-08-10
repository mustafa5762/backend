const Category = require("../Models/CategoryModel");
const Product = require("../Models/ProductModel");

module.exports ={
    getcategories: async function(req, res){
      try {
        const category = await Category.findOne({ category_name:req.query.name });
        const products = await Product.find({category: req.query.name })
        res.send({category, products})
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
