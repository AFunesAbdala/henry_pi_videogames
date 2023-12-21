require('dotenv').config();
const axios = require('axios')
const { API_KEY } = process.env
const { videogame , genre } = require('../db')

const getVideogamesById = async (id) => {

    const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

    const URL = `https://api.rawg.io/api/games/${id}?key=${API_KEY}`;

    try {

        if (regex.test(id)) {
            const db_videogame = await videogame.findOne({
                where : {
                    id : id
                },
                include : [
                    {
                        model: genre,
                        attributes: ['name'],
                        through: { attributes: [] }
                    },
                ]
            })

            if (db_videogame) {
                return db_videogame
            } else {
                return { error : "El Videojuego no existe" }
            }
            
        } else {

            const response = await axios.get(URL);
            const data = response.data

            const videogame = {
                id : data.id,
                name : data.name,
                image : data.background_image,
                platforms : data.platforms.map((p) => p.platform.name),
                description : data.description,
                released : data.released,
                rating : data.rating,
                genres : data.genres.map((p) => {
                    return { name : p.name }
                })
            };

            return videogame
        }
        
    } catch (error) {
        return error
    };
}

module.exports = getVideogamesById