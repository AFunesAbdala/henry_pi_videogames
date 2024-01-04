const getVideogamesByName = require("../controllers/getVideogamesByName");


const handler_getVideogamesByName = async (req, res) => {
    
    const gameName = req.query.name.toLowerCase()

    if (!gameName) {
        res.status(400).json({ message : "Missing query"})
        return
    }

    try {
        
        const videogamesByName = await getVideogamesByName(gameName)

        if (videogamesByName.message) {
            res.status(400).json(videogamesByName)
            return
        }
        
        res.status(200).json(videogamesByName)

    } catch (error) {
        res.status(500).json(error)
    }

}

module.exports = handler_getVideogamesByName