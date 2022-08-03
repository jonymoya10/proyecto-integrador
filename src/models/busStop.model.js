const {Schema, model} = require('mongoose');

const stopSchema = new Schema ({
    company: {type: String},
    stop: {type: String},
    line: {type: String},
    master_line: {type: String},
    coordinates: {
        lat: {type: Number},
        lon: {type: Number}
    },
    direction:{type: String},
    img: {type: String}
});

const Stop = new model('Stop', stopSchema);

module.exports = Stop;