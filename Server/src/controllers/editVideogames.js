const { videogame } = require("../db")

const editVideogame = async (id, name, rating, released, image, description, genres, platforms) => {
    
    try {
        const update = await videogame.update(
            { 
                name : name,
                rating : rating,
                released : released,
                image : image,
                description : description,
                genres : genres,
                platforms : platforms
            }, 
            {
                where: {
                    id: id
                }
        });
        return update
        
    } catch (error) {
        return error
    }
    
}

module.exports = editVideogame