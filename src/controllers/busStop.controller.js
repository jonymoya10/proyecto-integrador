const config = require("config");
const axios = require("axios").default;
const BASE_URL = config.get("BASE_URL.url");
const BUS_URL = config.get("BUS_URL.url");
const Stop = require("../models/busStop.model");
const { saveStop, deleteStop } = require("../services/busStop.services");

async function getAllStops(req, res) {
  await Stop.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400);
      console.error(err);
      res.json(err);
    });
}

async function getStopById(req, res) {
  const { id } = req.params;
  const stop = await Stop.findById(id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400);
      console.error(err);
      res.json(err);
    });
}

async function newStop(req, res) {
  try {
    const data = req.body;
    const linea = data.line;
    await saveStop(data);
    res.json({
      message: ` 💡 Guardando la nueva parada de la ${linea}`,
      data: data,
    });
  } catch (err) {
    res.status(400);
    console.error(err);
    res.json(err);
  }
}

async function newStopLine(req, res) {
  const { linea } = req.params;
  axios
    .get(`${BASE_URL}${linea}`)
    .then((response) => {
      const data = response.data.results.features;
      const busStops = [];
      data.forEach((data) => {
        const entry = new Stop();
        entry.company = data.properties.recorrido.linea.empresa;
        entry.stop = data.properties.poste.descripcion;
        entry.line = data.properties.recorrido.linea.nombre_publico;
        entry.master_line = data.properties.recorrido.linea.troncal;
        entry.coordinates.lat = data.geometry.coordinates[1];
        entry.coordinates.lon = data.geometry.coordinates[0];
        entry.direction = data.properties.recorrido.descripcion_larga;
        entry.img = BUS_URL;
        saveStop(entry);
        busStops.push(entry);
      });
      res.json({
        message: ` 💡 Guardando la nueva parada de la ${linea}`,
        data: busStops,
      });
    })
    .catch((err) => {
      res.json(err);
    });
}

async function deleteStopById(req, res) {
  try {
    const { id } = req.params;
    const result = await deleteStop(id);
    res.json({ message: "Eliminando el registro 🚀 " });
  } catch (err) {
    res.status(400);
    res.json(err);
  }
}

async function updateStopById(req, res) {
  const { id } = req.params;
  const data = req.body;
  await Stop.findById(id)
    .then((entry) => {
      entry.company = data.company;
      entry.stop = data.stop;
      entry.line = data.line;
      entry.master_line = data.master_line;
      entry.coordinates.lat = data.coordinates.lat;
      entry.coordinates.lon = data.coordinates.lon;
      entry.direction = data.direction;
      entry.save();
      res.json({
        operation: "Editar parada",
        message: "Ok",
        data: entry,
      });
    })
    .catch((err) => {
      res.status(400);
      console.error(err);
      res.json(err);
    });
}

module.exports = {
  getAllStops,
  getStopById,
  newStop,
  newStopLine,
  deleteStopById,
  updateStopById,
};
