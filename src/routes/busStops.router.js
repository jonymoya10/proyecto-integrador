const express = require('express');
const router = express.Router();
const { getAllStops, getStopById, newStop, newStopLine, deleteStopById, updateStopById } = require('../controllers/busStop.controller');

router.get('/', getAllStops);
router.get('/:id', getStopById);
router.post('/', newStop);
router.post('/:linea', newStopLine);
router.delete('/:id', deleteStopById);
router.patch('/:id', updateStopById);

module.exports = router;
