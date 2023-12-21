require('dotenv').config();
const axios = require('axios');
const { genre } = require('../db');
const { API_KEY } = process.env


const getGenres = async () => {

    const URL = `https://api.rawg.io/api/genres?key=${API_KEY}`;

    try {

        const db_genres = await genre.findAll();

        if (db_genres.length === 0) {
            
            const api_genres = await axios.get(URL);

            const newGenres = api_genres.data.results.map((g, index) => ({
                id: index,
                name: g.name,
            }));

            await genre.bulkCreate(newGenres);
            
            return newGenres

        } else {
            return db_genres
        };
        
    } catch (error) {
        return error
    };
};

module.exports = getGenres