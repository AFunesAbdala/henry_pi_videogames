const { videogame } = require('../db')

const postVideogames = async (name, description, image, platforms, released, rating, genres) => {

    try {

        const [ game , created ] = await videogame.findOrCreate({
            where : { name : name },
            defaults : {
                description,
                image,
                platforms,
                released,
                rating
            }
        })

        await game.setGenres(genres);

        if (created) {
            return ({ message : "Videojuego creado con exito"})
        } else {
            return ({ message : "El videojuego ya existe"})
        }

    } catch (error) {
        return error
    }
}

module.exports = postVideogames