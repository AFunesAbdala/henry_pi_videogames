require('dotenv').config();
const { Sequelize } = require('sequelize');
const {  DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const ModelVideogame = require('./models/Videogame');
const ModelGenre = require('./models/Genre')
const ModelPlatform = require('./models/Platform')


const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/videogames`,
  { logging: false, native: false }
);

ModelVideogame(sequelize)
ModelGenre(sequelize)
ModelPlatform(sequelize)

const { videogame, genre, platform } = sequelize.models;

videogame.belongsToMany(genre, { through: "Videogame_Genre" });
genre.belongsToMany(videogame, { through: "Videogame_Genre" });


module.exports = {
  videogame,
  genre,
  platform,
  conn: sequelize,
};
