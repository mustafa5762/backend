const Lead = require("../Models/LeadModel");


module.exports ={
    getleads: async function(req, res){
      try {
        const leads = await Lead.find({ });
        res.send(leads)
      } catch (error) {
        res.send("An error Occured");
      }
    },
    getleadscat: async function(req, res){
      try {
        const leads = await Lead.find({ company_category: req.params.category });
        res.send(leads)
      } catch (error) {
        res.send("An error Occured");
      }
    },
    postleads: async function(req, res){
        try {
          const newlead = new Lead({
            company_name: req.body.company_name,
            company_info: req.body.company_info,
            company_email: req.body.company_email,
            company_phone: req.body.company_phone,
            company_category: req.body.company_category,
            company_more_info: req.body.company_more_info,
            ref: String
          });
          const saves = await newlead.save();
          res.send(saves);
        } catch (error) {
          res.send(error);
        }
    },
  };
