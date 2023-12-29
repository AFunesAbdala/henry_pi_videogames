const editVideogame = require("../controllers/editVideogames")

const handler_editVideogame = async (req, res) => {
    
    const { id } = req.params

    const { 
        name,
        description,
        image,
        platforms,
        released,
        rating,
        genres
    } = req.body;

    const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

    if (!regex.test(id)) {
        res.status(400).json({ error : "Params must be an UUID."})
        return
    }

    if(!name || !description || !image || !platforms || !released || !rating || !genres) {
        res.status(400).json({ error : "Missing data."})
        return
    }

    try {

        const updateVideogame = await editVideogame(id, name, rating, released, image, description, genres, platforms)
        
        if (updateVideogame[0] === 0) {    
            res.status(400).json({ message : "The video game with this UUID doesn't exist."})
            return
        }

        res.status(200).json({ message : "Your video game has been successfully updated."})

    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = handler_editVideogame