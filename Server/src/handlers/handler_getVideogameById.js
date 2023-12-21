const getVideogamesById = require("../controllers/getVideogameById");


const handler_getVideogamesById = async (req, res) => {
    
    const { id } = req.params;

    try {

        const videogamesById = await getVideogamesById(id)

        res.status(200).json(videogamesById)
        
    } catch (error) {
        res.status(500).json(error);
    };
}

module.exports = handler_getVideogamesById