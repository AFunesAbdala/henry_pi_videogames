const { Router } = require('express');
const handler_getGenres = require('../handlers/handler_getGenres');
const handler_getVideogamesById = require('../handlers/handler_getVideogameById');
const handler_getVideogames = require('../handlers/handler_getVideogames');
const handler_getVideogamesByName = require('../handlers/handler_getVideogamesByName');
const handler_postVideogames = require('../handlers/handler_postVideogame');
const handler_getPlatforms = require('../handlers/handler_getPlatforms');

const router = Router();

router.get('/genres', handler_getGenres)
router.get('/platforms', handler_getPlatforms)
router.get('/videogames/:id', handler_getVideogamesById)
router.get('/videogames', handler_getVideogames)
router.get('/videogamesByName', handler_getVideogamesByName)
router.post('/newvideogame', handler_postVideogames)


module.exports = router;
