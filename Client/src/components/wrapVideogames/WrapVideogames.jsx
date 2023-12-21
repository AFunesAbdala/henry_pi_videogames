import CardVideogame from "../cardVideogame/CardVideogame"
import style from "./WrapVideogames.module.css"

const WrapVideogames = (props) => {

    const { videogames } = props

    return (
        <div className={style.wrapper}>
            {
                videogames ? videogames.map((e) => {
                    return (
                        <CardVideogame
                            key={e.id}
                            id={e.id}
                            name={e.name}
                            image={e.image}
                            genres={e.genres}
                            rating={e.rating}
                        ></CardVideogame>
                    )
                }) :
                <div>Loading</div>
            }
            
        </div>
    )
}

export default WrapVideogames
