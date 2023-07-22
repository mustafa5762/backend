const express = require('express');
const LeadController = require('../Controllers/LeadController');

const leadRoutes = express.Router();

leadRoutes.get('/leads', LeadController.getleads)
leadRoutes.get('/leads/:category', LeadController.getleadscat)
leadRoutes.post('/leads', LeadController.postleads)


module.exports=leadRoutes;