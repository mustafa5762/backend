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
          const cr1 = JSON.parse(req.body.color1)
          const cr2 = JSON.parse(req.body.color2)
          const cr3 = JSON.parse(req.body.color3)
          const sz1 = JSON.parse(req.body.size1)
          const sz2 = JSON.parse(req.body.size2)
          const sz3 = JSON.parse(req.body.size3)
          const sz4 = JSON.parse(req.body.size4)
          const sz5 = JSON.parse(req.body.size5)
          const sz6 = JSON.parse(req.body.size6)


          const newpro = new Product({
            name: req.body.name,
            price: req.body.price,
            inStock: req.body.inStock,
            description: req.body.description,
            short_description: req.body.short_description,
            additional_info: req.body.additional_info,
            category: req.body.category,
            onHomePage: req.body.onHomePage,
            colors: [{name: cr1.name, class: cr1.class, selectedClass: cr1.selectedClass},{name: cr2.name, class: cr2.class, selectedClass: cr2.selectedClass},{name: cr3.name, class: cr3.class, selectedClass: cr3.selectedClass}],
            sizes: [{ name: sz1.name, inStock: sz1.inStock },{ name: sz2.name, inStock: sz2.inStock },{ name: sz3.name, inStock: sz3.inStock },{ name: sz4.name, inStock: sz4.inStock },{ name: sz5.name, inStock: sz5.inStock },{ name: sz6.name, inStock: sz6.inStock }],
            tags: req.body.tags,
            added_by: req.body.added_by,
            views: 0,
            image: req.file.path,
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