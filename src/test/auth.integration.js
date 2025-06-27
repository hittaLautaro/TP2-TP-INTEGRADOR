import supertest from "supertest";
import { expect } from "chai";

const url = supertest("http://localhost:8080");

describe("Auth integration tests", () => {
  it("should create a new user", async () => {
    const response = await url.post("/auth/signup").send({
      name: "Test User",
      email: "testtesttest@gmail.com",
      password: "test123123",
    });
    console.log("Response:", response.body);
    expect(response.status).to.equal(201);
  });

  it("Should give error", async () => {
    const response = await url.post("/auth/signup").send({
      name: "Te",
      email: "tes",
      password: "te",
    });
    console.log("Response:", response.body);
    expect(response.status).to.equal(400);
  });
});
