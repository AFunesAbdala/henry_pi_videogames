const getVideogamesByName = require("../controllers/getVideogamesByName");


const handler_getVideogamesByName = async (req, res) => {
    
    const gameName = req.query.name.toLowerCase();

    if (!gameName) {
        res.status(400).json({ error : "Ingrese datos en su busqueda"})
        return
    }

    try {
        
        const videogamesByName = await getVideogamesByName(gameName)
        
        res.status(200).json(videogamesByName)

    } catch (error) {
        res.status(500).json(error)
    }

}

module.exports = handler_getVideogamesByName