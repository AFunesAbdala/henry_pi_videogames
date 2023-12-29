const { Router } = require('express');
const handler_getGenres = require('../handlers/handler_getGenres');
const handler_getVideogamesById = require('../handlers/handler_getVideogameById');
const handler_getVideogames = require('../handlers/handler_getVideogames');
const handler_getVideogamesByName = require('../handlers/handler_getVideogamesByName');
const handler_postVideogames = require('../handlers/handler_postVideogame');
const handler_getPlatforms = require('../handlers/handler_getPlatforms');
const handler_deleteVideogames = require('../handlers/handler_deleteVideogame');
const handler_editVideogame = require('../handlers/handler_editVideogames');

const router = Router();

router.get('/genres', handler_getGenres)
router.get('/platforms', handler_getPlatforms)
router.get('/videogames/:id', handler_getVideogamesById)
router.get('/videogames', handler_getVideogames)
router.get('/videogamesByName', handler_getVideogamesByName)
router.post('/myvideogame', handler_postVideogames)
router.delete('/myvideogame/:id', handler_deleteVideogames)
router.put('/myvideogame/:id', handler_editVideogame)


module.exports = router;
