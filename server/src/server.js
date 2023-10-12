const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");

const MONGO_URL =
  "mongodb+srv://nasa-api:v0YanP369rC8hMab@nasacluster.pe54ibp.mongodb.net/?retryWrites=true&w=majority";

const { loadPlanetsData } = require("./models/planets.models");

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

async function startServer() {
  await mongoose.connect(MONGO_URL);
  await loadPlanetsData();

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

startServer();
