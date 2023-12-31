import { useState } from "react";
import style from "./formNewVideogame.module.css"
import { Validate } from "./validations/validate";
import { useLocation } from "react-router-dom";

const FormNewVideogame = (props) => {

    const { platforms , genres, submitVideogame, editVideogame, handlerActiveModalError, setMessageError } = props

    const { pathname } = useLocation()
    const UUID = pathname.split('/')[3]

    const [ videogameData , setVideogameData ] = useState({
        name : "",
        image : "",
        rating : 0,
        description : "",
        released: ""
    })

    const [ errors, setErrors ] = useState({
        name : "Enter the title of your video game",
        image : "Enter the URL of your video game's image",
        description : "Enter the description of your video game",
        released : "Enter the date of your video game's release",
        genres : "Select at least one genre",
        platforms : "Select at least one platform"
    })

    const handleChange = (event) => {
        const property = event.target.name
        const value = event.target.value

        setVideogameData({...videogameData, [property] : value})

        Validate(property, errors, setErrors, {...videogameData, [property] : value})
    }

    const [ selectedGenres, setSelectedGenres ] = useState([])
    const handleOptionsGenre = (id_genre) => {
        setSelectedGenres((prevGenres) => {
            const updatedGenres = prevGenres.includes(id_genre)
                ? prevGenres.filter((selectedGenre) => selectedGenre !== id_genre)
                : [...prevGenres, id_genre]
            Validate("genres", errors, setErrors, updatedGenres)
            return updatedGenres
        });
    }

    const [ selectedPlatforms, setSelectedPlatforms ] = useState([])
    const handleOptionsPlatform = (platform) => {
        setSelectedPlatforms((prevPlatforms) => {
            const updatedPlatforms = prevPlatforms.includes(platform)
                ? prevPlatforms.filter((selectedPlatform) => selectedPlatform !== platform)
                : [...prevPlatforms, platform]
            Validate("platforms", errors, setErrors, updatedPlatforms)
            return updatedPlatforms
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (pathname.endsWith(0)) {
            if (Object.values(errors).every(error => error === '')){
                submitVideogame({...videogameData, genres : selectedGenres, platforms : selectedPlatforms})
                setVideogameData({
                    name : "",
                    image : "",
                    rating : 0,
                    description : "",
                    released: ""
                })
                setSelectedGenres([])
                setSelectedPlatforms([])
                setErrors({
                    name : "Enter the title of your video game",
                    image : "Enter the URL of your video game's image",
                    description : "Enter the description of your video game",
                    released : "Enter the date of your video game's release",
                    genres : "Select at least one genre",
                    platforms : "Select at least one platform"
                })
            } else {
                setMessageError("Complete the form without errors")
                handlerActiveModalError(true)
            }
        } else {
            if (Object.values(errors).every(error => error === '')){
                editVideogame( UUID , {...videogameData, genres : selectedGenres, platforms : selectedPlatforms})
                setVideogameData({
                    name : "",
                    image : "",
                    rating : 0,
                    description : "",
                    released: ""
                })
                setSelectedGenres([])
                setSelectedPlatforms([])
                setErrors({
                    name : "Enter the title of your video game",
                    image : "Enter the URL of your video game's image",
                    description : "Enter the description of your video game",
                    released : "Enter the date of your video game's release",
                    genres : "Select at least one genre",
                    platforms : "Select at least one platform"
                })
            } else {
                setMessageError("Complete the form without errors")
                handlerActiveModalError(true)
                
            }
        }
        
        
    }


    return (
        <div className={style.wrapper}>
            <form className={style.formwrap} onSubmit={handleSubmit}>
                <div className={style.formLabels}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={videogameData.name} onChange={handleChange} className={style.inputName}/>
                    <p className={errors.name ? style.errorActive : style.errorDeactive}>{errors.name ? errors.name : "Well done"}</p>
                </div>
                <div className={style.formLabels}>
                    <label htmlFor="rating">Rating</label>
                    <input type="range" name="rating" min="0" max="5" step="0.1" value={videogameData.rating} onChange={handleChange} className={style.inputRating}/>
                    <output htmlFor="rating" className={style.outputRating} >{videogameData.rating}</output>
                </div>
                <div className={style.formLabels}>
                    <label htmlFor="image">Image</label>
                    <input type="text" name="image" value={videogameData.image} onChange={handleChange} className={style.inputName}/>
                    <p className={errors.image ? style.errorActive : style.errorDeactive}>{errors.image ? errors.image : "Well done"}</p>
                </div>
                <div className={style.formLabels}>
                    <label htmlFor="released">Released</label>
                    <input type="date" name="released" value={videogameData.released} onChange={handleChange} className={style.inputReleased}/>
                    <p className={errors.released ? style.errorActive : style.errorDeactive}>{errors.released ? errors.released : "Well done"}</p>
                </div>  
                <div className={style.formLabels}>
                    <label htmlFor="description">Description</label>
                    <textarea name="description" value={videogameData.description} onChange={handleChange} className={style.inputDescription}></textarea>
                    <p className={errors.description ? style.errorActive : style.errorDeactive}>{errors.description ? errors.description : "Well done"}</p>
                </div>
                <div className={style.selectorGenre}>
                    <div className={style.selectorTitleG}>Genres</div>
                    <div className={style.optionsWrapper}> 
                        {
                            genres && genres.map((genre, index) => {
                                return (
                                    <div 
                                        key={index}
                                        className={selectedGenres.includes(genre.id) ? style.optionActive : style.optionDeactive} 
                                        onClick={()=>{handleOptionsGenre(genre.id)}} 
                                    >
                                        {genre.name}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <p className={errors.genres ? style.errorActive : style.errorDeactive}>{errors.genres ? errors.genres : "Well done"}</p>
                </div>
                <div className={style.selectorPlatform}>
                    <div className={style.selectorTitleP} onClick={()=>{handleVisibility()}}>Platforms</div>
                    <div className={style.optionsPWrapper}>
                        {
                            platforms && platforms.map((platforms, index) => {
                                return (
                                    <div 
                                        key={index}
                                        className={selectedPlatforms.includes(platforms.name) ? style.optionPActive : style.optionPDeactive} 
                                        onClick={()=>{handleOptionsPlatform(platforms.name)}} 
                                    >
                                        {platforms.name}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <p className={ errors.platforms ? style.errorActive : style.errorDeactive }>{errors.platforms ? errors.platforms : "Well done"}</p>
                </div>
                <button className={style.btnSubmit} type="submit">Upload</button>
            </form>
        </div>
    )
}

export default FormNewVideogame