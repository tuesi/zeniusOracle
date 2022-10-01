const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const debilsObject = require('../models/debilsObject.js');

const DebilsSchema = new Schema ({
    debils: [debilsObject]
});

const DebilsModel = mongoose.model('debils', DebilsSchema);

module.exports = DebilsModel;