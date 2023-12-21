import { Link } from "react-router-dom"
import style from "./views.module.css"
import Helpers from "../helpers/routesHelpers"

const Landing = () => {
    return (
        <div className={style.landing}>
            <div className={style.titleWrap}>
                <h1 className={style.titleLand}>Videogames</h1>
                <p className={style.info}>Henry Individual Project - Funes Abdala Alejo</p>
            </div>
            <Link to={Helpers.Home}>
                <div className={style.btnHome}></div>
            </Link>
        </div>
    )
}

export default Landing