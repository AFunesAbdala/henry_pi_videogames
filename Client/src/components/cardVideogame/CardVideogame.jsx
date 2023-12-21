import { Link } from "react-router-dom";
import hoverSound from "../../assets/sound/Hover.mp3"
import style from "./CardVideogame.module.css"
import { useState } from "react";

const CardVideogame = (props) => {

    const { id , name , image , genres , rating } = props;

    const [isHovered, setIsHovered] = useState(false);
  
    const handleHover = () => {
        setIsHovered(true);
    };
    
    const handleMouseLeave = () => {
        setIsHovered(false);
        setIsPlaying(false);
    };

    const [isPlaying, setIsPlaying] = useState(false);

    const playSound = () => {
        const audio = new Audio(hoverSound);
        audio.play();
        setIsPlaying(true);
    };

    if (isHovered && !isPlaying) {
        playSound();
    }

    return (
        <div className={style.wrapper} onMouseEnter={handleHover} onMouseLeave={handleMouseLeave}>
            <Link to={`/detail/${id}`}>
                <img src={image} className={style.image} alt={name}></img>
            </Link>
            <div className={style.rating}>
                <p data-testid="rating">{rating}</p>
            </div>
            <div className={style.infowrapper}>
                <h3 className={style.name} data-testid="name">{name}</h3>
                <div className={style.genres}>
                    {genres && genres.map((genres, index) => (
                        <span key={index} data-testid="genre">{genres.name}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CardVideogame
