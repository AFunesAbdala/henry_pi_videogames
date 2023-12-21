import style from "./DetailVideogame.module.css"

const DetailVideogame = (props) => {

    const { videogame } = props

    return (
        <div className={style.wrapper}>
            <div className={style.header_wrap}>
                <div className={style.videogame_wrap}>
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