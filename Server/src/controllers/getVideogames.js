require('dotenv').config();
const axios = require('axios')
const { API_KEY } = process.env
const { videogame, genre } = require('../db')

const getVideogames = async (origin) => {

    const URL = `https://api.rawg.io/api/games?page_size=40&key=${API_KEY}`;

    try {

        if (origin === "db") {

            const dbVideogames = await videogame.findAll({
                include : [
                    {
                        model: genre,
                        attributes: ['name'],
                        through: { attributes: [] }
                    },
                ],
                attributes : ['id', 'name', 'image', 'rating'],
                limit : 40
            })

            return dbVideogames
        }
        
        if (origin === "api") {
            const getVideogames = await axios.get(URL)

            const responseData = getVideogames.data.results;

            const apiVideogames = responseData.map((vj) => ({
                id : vj.id,
                name: vj.name,
                rating: vj.rating,
                image: vj.background_image,
                genres: vj.genres.map((g) => {
                    return { name : g.name }
                }),
            }));

            return apiVideogames
        }

    } catch (error) {
        return error
    }
}

module.exports = getVideogames