import { useState } from "react";
import style from "./formNewVideogame.module.css"
import { useSelector } from "react-redux";

const FormNewVideogame = (props) => {

    const { platforms , genres, submitVideogame } = props

    const [ selectedGenres, setSelectedGenres ] = useState([])
    const handleOptionsGenre = (id_genre) => {
        if (selectedGenres.includes(id_genre)) {
            setSelectedGenres(selectedGenres.filter((selectedGenre) => selectedGenre !== id_genre));
        } else {
            setSelectedGenres([...selectedGenres, id_genre]);
        }
    }

    const [ selectedPlatforms, setSelectedPlatforms ] = useState([])
    const handleOptionsPlatform = (platform) => {
        if (selectedPlatforms.includes(platform)) {
            setSelectedPlatforms(selectedPlatforms.filter((selectedPlatforms) => selectedPlatforms !== platform));
        } else {
            setSelectedPlatforms([...selectedPlatforms, platform]);
        }
    }

    const [ videogameData , setVideogameData ] = useState({
        name : "",
        image : "",
        rating : 0,
        description : "",
        released: ""
    })

    const handleChange = (event) => {
        const property = event.target.name
        const value = event.target.value

        setVideogameData({...videogameData, [property] : value})
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        submitVideogame({...videogameData, genres : selectedGenres, platforms : selectedPlatforms})
    }


    return (
        <div className={style.wrapper}>
            <form className={style.formwrap} onSubmit={handleSubmit}>
                <div className={style.formLabels}>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={videogameData.name} onChange={handleChange} className={style.inputName}/>
                </div>
                <div className={style.formLabels}>
                    <label htmlFor="rating">Rating</label>
                    <input type="range" name="rating" min="0" max="5" step="0.1" value={videogameData.rating} onChange={handleChange} className={style.inputRating}/>
                    <output htmlFor="rating" className={style.outputRating} >{videogameData.rating}</output>
                </div>
                <div className={style.formLabels}>
                    <label htmlFor="image">Image</label>
                    <input type="text" name="image" value={videogameData.image} onChange={handleChange} className={style.inputName}/>
                </div>
                <div className={style.formLabels}>
                    <label htmlFor="released">Released</label>
                    <input type="date" name="released" value={videogameData.released} onChange={handleChange} className={style.inputReleased}/>
                </div>  
                <div className={style.formLabels}>
                    <label htmlFor="description">Description</label>
                    <textarea name="description" value={videogameData.description} onChange={handleChange} className={style.inputDescription}></textarea>
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
                </div>
                <button className={style.btnSubmit} type="submit"></button>
            </form>
        </div>
    )
}

export default FormNewVideogame