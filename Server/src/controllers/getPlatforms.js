require('dotenv').config();
const axios = require('axios');
const { platform } = require('../db');
const { API_KEY } = process.env


const getPlatforms = async () => {

    const URL = `https://api.rawg.io/api/platforms?key=${API_KEY}`;

    try {

        const db_platforms = await platform.findAll();

        if (db_platforms.length === 0) {
            
            const api_platforms = await axios.get(URL);

            const newPlatforms = api_platforms.data.results.map((p) => ({
                name: p.name
            }));

            await platform.bulkCreate(newPlatforms);
            
            return newPlatforms

        } else {
            return db_platforms
        };
        
    } catch (error) {
        return error
    };
};

module.exports = getPlatforms