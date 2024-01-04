import {
    ADD_VIDEOGAMES,
    FILTER,
    GENRES,
    PLATFORMS,
    ORDER,
    SET_PAGE
} from './action_types';
import { URL } from '../helpers/routesBack'
import axios from 'axios';

export const get_videogames = (origin) => {
    const endpoint = `${URL}/videogames?origin=${origin}`
    return async (dispatch) => {

        try {
            const response = await axios.get(endpoint)

            if (response.status === 200) {
                return dispatch({
                    type : ADD_VIDEOGAMES,
                    payload : response.data
                });
            }
        } catch (error) {
            window.alert(error.response.data.message)
        }
    }
}

export const get_videogamesByName = (name) => {
    const endpoint = `${URL}/videogamesByName?name=${name}`
    return async (dispatch) => {

        try {
            const response = await axios.get(endpoint)

            if (response.status === 200) {
                return dispatch({
                    type : ADD_VIDEOGAMES,
                    payload : response.data
                });
            }
        } catch (error) {
            throw error
        }
    }
}

export const get_genres = () => {
    const endpoint = `${URL}/genres`
    return async (dispatch) => {

        try {
            const response = await axios.get(endpoint)

            if (response.status === 200) {
                return dispatch({
                    type : GENRES,
                    payload : response.data
                });
            }
        } catch (error) {
            window.alert(error.response.data.message)
        }
    }
}

export const get_platforms = () => {
    const endpoint = `${URL}/platforms`
    return async (dispatch) => {

        try {
            const response = await axios.get(endpoint)

            if (response.status === 200) {
                return dispatch({
                    type : PLATFORMS,
                    payload : response.data
                });
            }
        } catch (error) {
            window.alert(error.message)
        }
    }
}

export const orderVideogames = (order) => {
    return {
      type : ORDER, payload : order
    }
}

export const filterVideogames = (genre) => {
    return {
      type : FILTER, payload : genre
    }
}

export const setPage = (page) => {
    return {
      type : SET_PAGE, payload : page
    }
}
