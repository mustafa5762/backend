const Category = require("../Models/CategoryModel");

module.exports ={
    getcategories: async function(req, res){
      try {
        const cats = await Category.find({ });
        res.send(cats)
      } catch (error) {
        res.send("An error Occured");
      }
    },
  };
