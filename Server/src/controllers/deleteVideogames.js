const { videogame } = require('../db')

const deleteVideogame = async (id) => {

    try {

        const destroy = await videogame.destroy({
            where : {
                id : id
            }
        })

        return destroy

    } catch (error) {
        return error
    }
}

module.exports = deleteVideogame