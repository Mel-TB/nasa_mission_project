const launchesDB = require("./launches.mongo");
const planets = require("./planets.mongo");

const DEFAULT_FLIGHT_NUMBER = 100;
const launches = new Map();

const launch = {
  flightNumber: 100,
  mission: " Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-442 b",
  customer: ["NASA", "Mel"],
  upcoming: true,
  success: true,
};

saveLaunch(launch);

async function existsLaunchWithId(launchId) {
  return await launchesDB.findOne({
    flightNumber: launchId,
  });
}

/**
 * Retrieves the latest flight number from the launches database.
 *
 * @return {number} The latest flight number, or the default flight number if no launches exist.
 */
async function getLatestFlightNumber() {
  const latestLaunch = await launchesDB.findOne().sort("-flightNumber");

  if (!latestLaunch) {
    return DEFAULT_FLIGHT_NUMBER;
  }

  return latestLaunch.flightNumber;
}

/**
 * Retrieves all launches from the launchesDB collection.
 *
 * @return {Promise} Returns a Promise that resolves to an array of launch objects.
 */
async function getAllLaunches() {
  return await launchesDB.find(
    {},
    {
      _id: 0,
      __v: 0,
    }
  );
}

/**
 * Saves a launch in the database.
 *
 * @param {Object} launch - The launch object to be saved.
 * @return {Promise} - A promise that resolves when the launch is saved.
 * @throws {Error} - If no matching planet is found.
 */
async function saveLaunch(launch) {
  const planet = await planets.findOne({
    keplerName: launch.target,
  });

  if (!planet) {
    throw new Error("No matching planet found!");
  }

  await launchesDB.findOneAndUpdate(
    {
      flightNumber: launch.flightNumber,
    },
    launch,
    {
      upsert: true,
    }
  );
}

/**
 * Schedule a new launch.
 *
 * @param {Object} launch - The launch object to be scheduled.
 * @return {Promise<void>} A promise that resolves when the launch is scheduled.
 */
async function scheduleNewLaunch(launch) {
  const newFlightNumber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    success: true,
    upcoming: true,
    customer: ["Mel", "NASA"],
    flightNumber: newFlightNumber,
  });

  await saveLaunch(newLaunch);
}

/**
 * Aborts a launch by its ID.
 *
 * @param {number} launchId - The ID of the launch to be aborted.
 * @return {boolean} Returns true if the launch was successfully aborted, otherwise false.
 */
async function abortLaunchById(launchId) {
  const aborted = await launchesDB.updateOne(
    {
      flightNumber: launchId,
    },
    {
      upcoming: false,
      success: false,
    }
  );

  return aborted.modifiedCount === 1;
}

module.exports = {
  launches,
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
};
