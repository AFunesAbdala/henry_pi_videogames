import { useLocation } from "react-router-dom"
import FormNewVideogame from "../components/formNewVideogame/formNewVideogame"
import style from "./views.module.css"

const CreateVideogame = (props) => {

    const { platforms , genres, submitVideogame, editVideogame } = props

    const { pathname } = useLocation()
    const route = pathname.split('/')[2]

    return (
        <div className={style.create}>
            <h1 className={style.title}>{ route === "new" ? "New Videogame" : "Edit Videogame"}</h1>
            <FormNewVideogame platforms={platforms} genres={genres} submitVideogame={submitVideogame} editVideogame={editVideogame}></FormNewVideogame>
        </div>
    )
}

export default CreateVideogame