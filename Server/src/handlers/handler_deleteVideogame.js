const deleteVideogame = require("../controllers/deleteVideogames");

const handler_deleteVideogames = async (req, res) => {
    
    const { id } = req.params

    const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

    if (!regex.test(id)) {
        res.status(400).json({ message : "Params must be an UUID."})
        return
    }

    try {

        const deletedVideogame = await deleteVideogame(id)
        
        if (deletedVideogame === 0) {    
            res.status(400).json({ message : "The video game with this UUID doesn't exist."})
            return
        }

        res.status(200).json({ message : "Your video game has been successfully eliminated."})

    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = handler_deleteVideogames