const postVideogames = require("../controllers/postVidegogame");

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
        res.status(400).json({ error : "Faltan datos"})
        return
    }

    try {

        const newVideogame = await postVideogames(name, description, image, platforms, released, rating, genres)

        res.status(200).json(newVideogame)

    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = handler_postVideogames