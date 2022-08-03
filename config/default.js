require("dotenv").config();
const MONGdbUser = process.env.MONGO_USER;
const MONGdbPass = process.env.MONGO_PASS;
const BASE_URL = process.env.BASE_URL;
const BUS_URL = process.env.BUS_URL;

module.exports = {
  BUS_URL: {
    url: `${BUS_URL}`,
  },
  BASE_URL: {
    url: `${BASE_URL}`,
  },
  database: {
    host: `mongodb+srv://${MONGdbUser}:${MONGdbPass}@cluster0.n1xgp.mongodb.net/?retryWrites=true&w=majority`,
  },
};
