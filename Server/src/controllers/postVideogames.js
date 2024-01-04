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
            return ({ message : "Your video game has been created successfully."})
        } else {
            return ({ message : "The video game already exists." })
        }

    } catch (error) {
        return error
    }
}

module.exports = postVideogames