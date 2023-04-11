const Product = require("../Models/ProductModel");




module.exports ={
    getproducts: async function(req, res){
      try {
        let options = {...req.query};
        const pros = await Product.find(options);
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
            image: req.body.image,
            images: req.body.images,
            price: req.body.price,
            short_description: req.body.short_description,
            description: req.body.description,
            additional_info: req.body.additional_info,
            onHomePage: req.body.onHomePage,
            inStock: req.body.inStock,
            tags: req.body.tags,
            category: req.body.category
          });
          const prods = await newpro.save();
          res.send(prods)
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