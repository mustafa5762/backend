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
            price: req.body.price,
            inStock: req.body.inStock,
            description: req.body.description,
            features: req.body.features,
            additional_info: req.body.additional_info,
            category: req.body.category,
            onHomePage: req.body.onHomePage,
            sizes: req.body.sizes,
            tags: req.body.tags,
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
    addcolor: async function(req, res){
      try {
        const proc = await Product.findOneAndUpdate({ _id:req.body._id }, { $push: { colors: req.body.color } });
        res.send(proc)
      } catch (error) {
        res.send("An error Occured");
      }
    },
  };