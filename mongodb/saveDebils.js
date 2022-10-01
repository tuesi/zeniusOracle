const mongoose = require('mongoose');
const DebilsModel = require('../models/debilModel.js');
const topdebils = require('../lists/topdebils');

module.exports = async () => {
    if(!await DebilsModel.findOne()) {
        var debil = new DebilsModel({
            debils: topdebils
        });
    
        debil.save();
    } else {
        await DebilsModel.updateOne({},{debils:topdebils});
    }
}