import { Link } from "react-router-dom"
import style from "./DetailVideogame.module.css"

const DetailVideogame = (props) => {

    const { videogame , deleteVideogame} = props

    const regex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/

    const handleEliminate = (uuid) => {
        deleteVideogame(uuid)
    }

    return (
        <div className={style.wrapper}>
            <div className={style.header_wrap}>
                <div className={style.title_box}>
                    <div className={style.genre_wrap}>
                        {videogame.genres.map((genres, index) => (
                            <span key={index} data-testid="genre">{genres.name}</span>
                        ))}
                    </div>
                    <h1 className={style.name_videogame} data-testid="name">{videogame.name}</h1>
                </div>
                <div className={style.rating_box}>
                    <div className={style.star}></div>
                    <h1 className={style.rating} data-testid="rating">{videogame.rating}</h1>
                </div>
                {
                    regex.test(videogame.id) && <div className={style.btn_box}>
                        <button onClick={()=>{handleEliminate(videogame.id)}} className={style.deleteBtn} data-tooltip="Delete"></button>
                        <Link to={`/myvideogame/edit/${videogame.id}`}>
                            <div className={style.editBtn} data-tooltip="Edit"></div>
                        </Link>
                    </div>
                }
            </div>
            <div className={style.info_wrap}>
                <img src={videogame.image} className={style.img_wrap} alt={videogame.name} data-testid="image"></img>
                <div className={style.text_wrap}>
                    <p className={style.platforms}>Platforms:</p>
                    <div className={style.platforms_wrap}>
                        {videogame.platforms.map((platforms, index) => (
                            <div key={index} className={
                                platforms.includes("Xbox") ? style.Xbox :
                                    platforms === "PC" ? style.Pc : 
                                        platforms === "macOS" ? style.MacOs : 
                                            platforms === "Nintendo Switch" ? style.Nintendo : 
                                                platforms === "Linux" ? style.Linux : 
                                                    platforms === "Web" ? style.Web : style.Ps4 
                            } data-tooltip={platforms} data-testid="platform"></div>
                        ))}
                    </div>
                    <div className={style.description_wrap}>
                        <p className={style.textdescription} data-testid="description" >{videogame.description.slice(0, 600).replace(/<[^>]*>/g, '')}</p>
                        <p className={style.textreleased} data-testid="released" >Released at: {videogame.released}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailVideogame