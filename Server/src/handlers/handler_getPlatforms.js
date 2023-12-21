const getPlatforms = require('../controllers/getPlatforms');

const handler_getPlatforms = async (req, res) => {

    try {

        const get_Platforms = await getPlatforms();

        res.status(200).json(get_Platforms);
        
    } catch (error) {

        res.status(500).json(error)
        
    };
};

module.exports = handler_getPlatforms