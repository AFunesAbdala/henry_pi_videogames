require('dotenv').config();
const axios = require('axios')
const { API_KEY } = process.env

const getVideogames = async () => {

    const URL = `https://api.rawg.io/api/games?page_size=40&key=${API_KEY}`;

    try {
        
        const getVideogames = await axios.get(URL)

        const responseData = getVideogames.data.results;

        const videogames = responseData.map((vj) => ({
            id : vj.id,
            name: vj.name,
            rating: vj.rating,
            image: vj.background_image,
            genres: vj.genres.map((g) => {
                return { name : g.name }
            }),
        }));

        return videogames

    } catch (error) {
        return error
    }
}

module.exports = getVideogames