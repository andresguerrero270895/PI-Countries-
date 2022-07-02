/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');

const agent = session(app);
const country = {
  id: "ARG",
  name: "Argentina",
  flag: "https://flagcdn.com/ar.svg",
  capital: ["Buenos Aires"],
  continent: "South America",
  area: 2780400,
  population: 45376763,
};

describe('Country routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Country.sync({ force: true })
    .then(() => Country.create(pokemon)));
  describe('GET /countries', () => {
    it('should get 200', () =>
      agent.get('/countries').expect(200)
    );
  });
  describe("GET /countries?name=Pais", () => {
    it("should get 200", () => agent.get("/countries?name=ArgEntina").expect(200));
  });

  describe("GET /countries?name=Pais Fallido", () => {
    it("should get 404", () => agent.get("/countries?name=fsffddf").expect(404));
  })
  
  describe("GET /countries/:id", () => {
    it("should get 200", () => agent.get("/countries/Arg").expect(200));
  })
});
