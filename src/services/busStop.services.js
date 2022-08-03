const Stop = require("../models/busStop.model");


async function saveStop(data){
    const stop = new Stop(data);
    return stop.save();
}

async function deleteStop(id){
    const result = await Stop.deleteOne({_id: id});
    return result;
}


module.exports = { saveStop, deleteStop}