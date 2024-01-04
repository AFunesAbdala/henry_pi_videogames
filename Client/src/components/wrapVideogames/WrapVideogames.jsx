import CardVideogame from "../cardVideogame/CardVideogame"
import style from "./WrapVideogames.module.css"

const WrapVideogames = (props) => {

    const { videogames } = props

    return (
        <div className={style.wrapper}>
            {
                videogames.length != 0 ? videogames.map((e) => {
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
                }) : <div className={style.message}>There aren't any video games to display.</div>
            }
            
        </div>
    )
}

export default WrapVideogames
