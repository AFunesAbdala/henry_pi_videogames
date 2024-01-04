import {
    ADD_VIDEOGAMES,
    ORDER,
    FILTER,
    GENRES,
    PLATFORMS,
    SET_PAGE
} from './action_types'

const initialState = {
    home_videogames : [],
    original_videogames : [],
    genres: [],
    platforms : [],
    page : 1
};

const rootReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        default:
            return {...state};
        case ADD_VIDEOGAMES:
            return {...state, home_videogames : payload, original_videogames : payload}
        case ORDER:
            const orderVideogames = [...state.home_videogames]
            if (payload === 'AZ') {
                orderVideogames.sort((a, b) => (a.name > b.name ? 1 : -1));
            } else if (payload === 'ZA') {
                orderVideogames.sort((a, b) => (b.name > a.name ? 1 : -1));
            } else if (payload === '50') {
                orderVideogames.sort((a, b) => b.rating - a.rating);
            } else if (payload === '05') {
                orderVideogames.sort((a, b) => a.rating - b.rating);
            } 
            return {...state, home_videogames : orderVideogames}
        case FILTER:
            if (payload === 'Default') {
                return {...state, home_videogames : state.original_videogames}
            }
            const filterVideogames = state.original_videogames.filter((game) => game.genres.some(genre => genre.name === payload))
            return {...state, home_videogames : filterVideogames}
        case GENRES:
            return {...state, genres : payload}
        case PLATFORMS:
            return {...state, platforms : payload}
        case SET_PAGE:
            return {...state, page : payload}
    }
};

export default rootReducer;