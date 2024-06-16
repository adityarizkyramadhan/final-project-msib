const SECONDS = 1000;
jest.setTimeout(90 * SECONDS);
const supertest = require('supertest');
const app = require('../app');
const request = supertest(app);
const jwt = require('jsonwebtoken');

const payload = {
  id: '2ac90127-c637-4b16-9e93-409bf27a02b9',
};

const token = () => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10m' });
}

describe("Test register user", () => {
  it("Failed register user because empty body", async () => {
    const response = await request.post("/auth/register").send({}).set("Accept", "application/json");
    expect(response.status).toBe(422);
  });

  it("Success register user", async () => {
    const response = await request.post("/auth/register").send({
      email: "adityarizky1020@gmail.com",
      password: "password123",
      complete_name: "Aditya Rizky"
    }).set("Accept", "application/json");
    console.log(response.body);
    expect(response.status).toBe(201);
  });
});

describe("Test login user", () => {
  it("Failed login user because empty body", async () => {
    const response = await request.post("/auth/login").send({}).set("Accept", "application/json");
    expect(response.status).toBe(422);
  });

  it("Failed login user because wrong email", async () => {
    const response = await request.post("/auth/login").send({
      email: "adityarizky1030@gmail.com",
      password: "password123",
    }).set("Accept", "application/json");
    expect(response.status).toBe(404);
  });

  it("Success login user", async () => {
    const response = await request.post("/auth/login").send({
      email: "adityarizky1020@gmail.com",
      password: "password123",
    }).set("Accept", "application/json");
    console.log(response.body);
    expect(response.status).toBe(200);
  });
});

