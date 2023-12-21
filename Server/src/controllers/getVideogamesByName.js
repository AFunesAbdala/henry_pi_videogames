require('dotenv').config();
const axios = require('axios')
const { Op } = require('sequelize');
const { videogame , genre } = require('../db')
const { API_KEY } = process.env

const getVideogamesByName = async (gameName) => {

    const URL = `https://api.rawg.io/api/games?search=${gameName}&page_size=20&key=${API_KEY}`;

    try {
        
        const dbVideogames = await videogame.findAll({
            where : {
                name: {
                    [Op.iLike]: `%${gameName}%`
                }
            },
            include : [
                {
                    model: genre,
                    attributes: ['name'],
                    through: { attributes: [] }
                },
            ],
            attributes : ['id', 'name', 'image', 'rating'],
            limit : 20
        })

        const apiResponse = await axios.get(URL)

        const apiVideogames = apiResponse.data.results.map((vj) => ({
            id : vj.id,
            name: vj.name,
            image: vj.background_image,
            rating: vj.rating,
            genres: vj.genres.map((p) => {
                return { name : p.name }
            })
        }));

        const db_api = [...dbVideogames,...apiVideogames];
        const db_api_limited = db_api.slice(0, 20);

        if (db_api.length === 0) {
            return ({ error: 'No se encontraron videojuegos con ese nombre.' });
          } else {
            return db_api_limited
          }

    } catch (error) {
        return error;
    }

}

module.exports = getVideogamesByName