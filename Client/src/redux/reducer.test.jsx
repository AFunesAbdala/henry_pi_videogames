import { describe, it, expect } from 'vitest';
import reducer from './reducer';
import {
    ADD_VIDEOGAMES,
    ORDER,
    FILTER,
    GENRES,
    PLATFORMS
} from './action_types'

describe('Reducer', () => {

    it ('Should return the initial state', () => {
        const initialState = { test : "test"}
        const action = { type : "DEFAULT" }
        const newState = reducer(initialState, action)
        expect(newState).toEqual(initialState)
    })

    it ('Should Add a videogame into the global state "home_videogames" and the "copy_videogames"', () => {
        const initialState = { home_videogames: [], copy_videogames: [] };
        const newVideogame = [
            {
                id: 1,
                name: "Destiny",
                rating: "5",
                image: "image.com",
                genres: [{ name: "Action" }, { name: "Adventure" }]
            }
        ];
        const action = { type: ADD_VIDEOGAMES, payload: newVideogame };
        const newState = reducer(initialState, action);

        const expectedState = { home_videogames: newVideogame, copy_videogames: newVideogame };

        expect(newState).toEqual(expectedState);
    })

    it('Should order home_videogames by name A to Z and mantain the copy_videogames with default values', () => {
        const initialState = {
            home_videogames: [
                { id: 1, name: "Destiny 2" },
                { id: 2, name: "Assassin's Creed" },
                { id: 3, name: "Call of Duty" },
            ],
            copy_videogames: [
                { id: 1, name: "Destiny 2" },
                { id: 2, name: "Assassin's Creed" },
                { id: 3, name: "Call of Duty" },
            ]
        };

        const action = { type: ORDER, payload: "AZ" };

        const newState = reducer(initialState, action);

        const sortedNames = newState.home_videogames.map(game => game.name);
        
        expect(sortedNames).toEqual(['Assassin\'s Creed', 'Call of Duty', 'Destiny 2']);
        expect(newState.copy_videogames).toEqual(initialState.copy_videogames);
    })

    it('Should order by name Z to A and mantain the copy_videogames with default values', () => {
        const initialState = {
            home_videogames: [
                { id: 1, name: "Destiny 2" },
                { id: 2, name: "Assassin's Creed" },
                { id: 3, name: "Call of Duty" },
            ],
            copy_videogames: [
                { id: 1, name: "Destiny 2" },
                { id: 2, name: "Assassin's Creed" },
                { id: 3, name: "Call of Duty" },
            ]
        };

        const action = { type: ORDER, payload: "ZA" };

        const newState = reducer(initialState, action);

        const sortedNames = newState.home_videogames.map(game => game.name);
        
        expect(sortedNames).toEqual([ 'Destiny 2', 'Call of Duty', 'Assassin\'s Creed' ]);
        expect(newState.copy_videogames).toEqual(initialState.copy_videogames);
    })

    it('Should order by rating 0 to 5 and mantain the copy_videogames with default values', () => {
        const initialState = {
            home_videogames: [
                { id: 1, rating: "2" },
                { id: 2, rating: "3" },
                { id: 3, rating: "0" },
            ],
            copy_videogames: [
                { id: 1, rating: "2" },
                { id: 2, rating: "3" },
                { id: 3, rating: "0" },
            ]
        };

        const action = { type: ORDER, payload: "05" };

        const newState = reducer(initialState, action);

        const sortedRating = newState.home_videogames.map(game => game.rating);
        
        expect(sortedRating).toEqual(["0","2","3"]);
        expect(newState.copy_videogames).toEqual(initialState.copy_videogames);
    })

    it('Should order by rating 5 to 0 and mantain the copy_videogames with default values', () => {
        const initialState = {
            home_videogames: [
                { id: 1, rating: "2" },
                { id: 2, rating: "3" },
                { id: 3, rating: "0" },
            ],
            copy_videogames: [
                { id: 1, rating: "2" },
                { id: 2, rating: "3" },
                { id: 3, rating: "0" },
            ]
        };

        const action = { type: ORDER, payload: "50" };

        const newState = reducer(initialState, action);

        const sortedNames = newState.home_videogames.map(game => game.rating);
        
        expect(sortedNames).toEqual(["3","2","0"]);
        expect(newState.copy_videogames).toEqual(initialState.copy_videogames);
    })

    it('Should filter "home_videogame" and mantain the "copy_videogames" with default values', () => {
        const initialState = {
            home_videogames: [
                { id: 1, name: "Destiny 2" , genres : [{ name : "Action"} , { name : "Adventure" }]},
                { id: 2, name: "Call of Duty" , genres : [{ name : "Shooter"} , { name : "Multiplayer" }]},
                { id: 3, name: "Portal 2" , genres : [{ name : "Puzzle"}]},
            ],
            copy_videogames: [
                { id: 1, name: "Destiny 2" , genres : [{ name : "Action"} , { name : "Adventure" }]},
                { id: 2, name: "Call of Duty" , genres : [{ name : "Shooter"} , { name : "Multiplayer" }]},
                { id: 3, name: "Portal 2" , genres : [{ name : "Puzzle"}]},
            ]
        };

        const action = { type: FILTER, payload: "Action" };

        const newState = reducer(initialState, action);

        const filterVideogames = initialState.home_videogames.filter(videogame =>
            videogame.genres.some(genre => genre.name === "Action")
        );
        expect(newState.home_videogames).toEqual(filterVideogames);
        expect(newState.copy_videogames).toEqual(initialState.copy_videogames);
    })

    it ('Should Add genres into the global state "genres"', () => {
        const initialState = { genres: [] };
        const newGenres = [
            {
                id: 1,
                name: "Action"
            },
            {
                id: 2,
                name: "Adventure"
            }
        ];
        const action = { type: GENRES, payload: newGenres };
        const newState = reducer(initialState, action);

        expect(newState.genres).toEqual(newGenres);
    })

    it ('Should Add platforms into the global state "platforms"', () => {
        const initialState = { platforms: [] };
        const newPlatforms = [
            {
                id: 1,
                name: "PC"
            },
            {
                id: 2,
                name: "XBox"
            }
        ];
        const action = { type: PLATFORMS, payload: newPlatforms };
        const newState = reducer(initialState, action);

        expect(newState.platforms).toEqual(newPlatforms);
    })

})