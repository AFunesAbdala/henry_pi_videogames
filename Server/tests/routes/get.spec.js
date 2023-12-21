const request = require('supertest');
const { expect } = require('chai');
const app = require('../../src/app');

describe('GET /videogames', function ()  {

  this.timeout(5000);

  it('Should return an array of objects with properties : "id", "name", "rating", "image", "genres" (Array)', (done) => {

    request(app)
      .get('/videogames')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {

        if (err) return done(err);

        expect(res.body).to.be.an('array');

        res.body.forEach((videojuego) => {
          expect(videojuego).to.be.an('object');
          expect(videojuego).to.have.property('id');
          expect(videojuego).to.have.property('name');
          expect(videojuego).to.have.property('rating');
          expect(videojuego).to.have.property('image');
          expect(videojuego).to.have.property('genres');
          expect(videojuego.genres).to.be.an('array');
        });

        done();
      });

  });
});

describe('GET /videogamesById', function () {

  this.timeout(5000);

  it('Should return an object with properties : "name", "rating", "image", "genres" (Array), "description", "released", "platforms" (Array)', (done) => {

    request(app)
      .get('/videogames/1')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {

        if (err) return done(err);

        const videogame = res.body

        expect(videogame).to.be.an('object');
        expect(videogame).to.have.property('name');
        expect(videogame).to.have.property('rating');
        expect(videogame).to.have.property('image');
        expect(videogame).to.have.property('platforms');
        expect(videogame.platforms).to.be.an('array');
        expect(videogame).to.have.property('description');
        expect(videogame).to.have.property('released');
        expect(videogame).to.have.property('genres');
        expect(videogame.genres).to.be.an('array');

        done();

      });

  });
});

describe('GET /videogamesByName', function ()  {

  this.timeout(5000);

  it('Should return an array of objects with properties : "id", "name", "rating", "image", "genres" (Array)', (done) => {

    request(app)
      .get('/videogamesByName?name=Destiny')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {

        if (err) return done(err);

        expect(res.body).to.be.an('array');

        res.body.forEach((videojuego) => {
          expect(videojuego).to.be.an('object');
          expect(videojuego).to.have.property('id');
          expect(videojuego).to.have.property('name');
          expect(videojuego).to.have.property('rating');
          expect(videojuego).to.have.property('image');
          expect(videojuego).to.have.property('genres');
          expect(videojuego.genres).to.be.an('array');
        });

        done();
      });

  });
});

describe('GET /platforms', function ()  {

  this.timeout(5000);

  it('Should return an array of objects with properties : "name"', (done) => {

    request(app)
      .get('/platforms')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {

        if (err) return done(err);

        expect(res.body).to.be.an('array');

        res.body.forEach((videojuego) => {
          expect(videojuego).to.be.an('object');
          expect(videojuego).to.have.property('name');
        });

        done();
      });

  });
});

describe('GET /genres', function ()  {

  this.timeout(5000);

  it('Should return an array of objects with properties : "id", "name"', (done) => {

    request(app)
      .get('/genres')
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {

        if (err) return done(err);

        expect(res.body).to.be.an('array');

        res.body.forEach((videojuego) => {
          expect(videojuego).to.be.an('object');
          expect(videojuego).to.have.property('id');
          expect(videojuego).to.have.property('name');
        });

        done();
      });

  });
});
