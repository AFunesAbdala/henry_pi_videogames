const getGenres = require('../controllers/getGenres');

const handler_getGenres = async (req, res) => {

    try {

        const get_Genres = await getGenres();

        res.status(200).json(get_Genres);
        
    } catch (error) {

        res.status(500).json(error)
        
    };
};

module.exports = handler_getGenres