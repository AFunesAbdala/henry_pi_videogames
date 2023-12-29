const postVideogames = require("../controllers/postVideogames");

const handler_postVideogames = async (req, res) => {
    
    const { 
        name,
        description,
        image,
        platforms,
        released,
        rating,
        genres
    } = req.body;

    if(!name || !description || !image || !platforms || !released || !rating || !genres) {
        res.status(400).json({ error : "Missing Data"})
        return
    }

    try {

        const newVideogame = await postVideogames(name, description, image, platforms, released, rating, genres)
        
        if (newVideogame.errors) {    
            res.status(400).json(newVideogame.errors)
            return
        }

        res.status(200).json(newVideogame)

    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = handler_postVideogames