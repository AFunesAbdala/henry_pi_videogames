const getVideogames = require("../controllers/getVideogames");


const handler_getVideogames = async (req, res) => {

    try {
        
        const all_Videogames = await getVideogames()

        res.status(200).json(all_Videogames)

    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = handler_getVideogames