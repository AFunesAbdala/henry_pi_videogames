const getVideogames = require("../controllers/getVideogames");


const handler_getVideogames = async (req, res) => {

    const origin = req.query.origin.toLowerCase()

    if (!origin) {
        res.status(400).json({ message : "Missing query"})
        return
    }

    try {
        
        const all_Videogames = await getVideogames(origin)

        if (all_Videogames.error) {
            res.status(400).json(all_Videogames)
            return
        }

        res.status(200).json(all_Videogames)

    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = handler_getVideogames