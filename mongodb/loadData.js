const topdebils = require('../lists/topdebils.js');
const DebilsModel = require('../models/debilModel.js');

module.exports = async () => {
    let newDebils = [];
    newDebils = await DebilsModel.findOne();
    if (newDebils != null) {
        newDebils.debils.forEach(debil => {
            topdebils.push(debil);
        });
    }
}