const request = require("supertest");
const app = require("../../app");
const { mongoConnect, mongoDisconnect } = require("../../services/mongo");

describe("Launches API", () => {
  beforeAll(async () => {
    await mongoConnect();
  });

  afterAll(async () => {
    await mongoDisconnect();
  });

  describe("Test GET /launches", () => {
    test("It should respond with 200 success", async () => {
      const response = await request(app)
<<<<<<< HEAD
        .get("/v1/launches")
=======
      
>>>>>>> 5963d3787cda7b7f2dbccacbe2b1fc462d72e634
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("Test POST /launch", () => {
    const completeLaunchData = {
      mission: "USS Enterprise",
      rocket: "NCC 1701",
      target: "Kepler-62 f",
      launchDate: "January 4, 2028",
    };

    const launchDataWithoutDate = {
      mission: "USS Enterprise",
      rocket: "NCC 1701",
      target: "Kepler-62 f",
    };

    const launchDataWithInvalidDate = {
      mission: "USS Enterprise",
      rocket: "NCC 1701",
      target: "Kepler-62 f",
      launchDate: "zoot",
    };

    test("It should respond with 201 success", async () => {
      const response = await request(app)
<<<<<<< HEAD
        .post("/v1/launches")
=======
        
>>>>>>> 5963d3787cda7b7f2dbccacbe2b1fc462d72e634
        .send(completeLaunchData)
        .expect("Content-Type", /json/)
        .expect(201);

      const requestDate = new Date(completeLaunchData.launchDate).valueOf();
      const responseDate = new Date(response.body.launchDate).valueOf();
      expect(responseDate).toBe(requestDate);

      expect(response.body).toMatchObject(launchDataWithoutDate);
    });

    test("It should catch missing required properties", async () => {
      const response = await request(app)
        .post("/v1/launches")
        .send(launchDataWithoutDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Missing required launch property",
      });
    });
    test("It should catch invalid dates", async () => {
      const response = await request(app)
<<<<<<< HEAD
        .post("/v1/launches")
=======
        
>>>>>>> 5963d3787cda7b7f2dbccacbe2b1fc462d72e634
        .send(launchDataWithInvalidDate)
        .expect("Content-Type", /json/)
        .expect(400);

      expect(response.body).toStrictEqual({
        error: "Invalid launch date",
      });
    });
  });
});
