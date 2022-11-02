const Product = require("../Models/ProductModel");




module.exports ={
    getproducts: async function(req, res){
      try {
        const pros = await Product.find({ });
        res.send(pros)
      } catch (error) {
        res.send("An error Occured");
      }
    },
    getproduct: async function(req, res){
      try {
        await Product.findOneAndUpdate({_id :req.params.id}, {$inc : {views : 1}});
        const pro = await Product.findOne({ _id:req.params.id });
        res.send(pro)
      } catch (error) {
        res.send("An error Occured");
      }
    },
    postproducts: async function(req, res){
        try {
          const newpro = new Product({
            name: req.body.name,
            price: req.body.price,
            inStock: req.body.inStock,
            description: req.body.description,
            short_description: req.body.short_description,
            additional_info: req.body.additional_info,
            category: req.body.category,
            onHomePage: req.body.onHomePage,
            colors: req.body.colors,
            sizes: req.body.sizes,
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
    deleteproduct: async function(req, res){
      try {
        const pro = await Product.findOneAndDelete({ _id:req.params.id });
        res.send(pro)
      } catch (error) {
        res.send("An error Occured");
      }
    },
  };