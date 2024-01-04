import { useLocation } from "react-router-dom"
import FormNewVideogame from "../components/formNewVideogame/formNewVideogame"
import style from "./views.module.css"
import ModalError from "../components/modalError/modalError"

const CreateVideogame = (props) => {

    const { platforms , genres, submitVideogame, editVideogame, messageError, activeModalError, handlerActiveModalError, setMessageError} = props

    const { pathname } = useLocation()
    const route = pathname.split('/')[2]

    return (
        <div className={style.create}>
            <h1 className={style.title}>{ route === "new" ? "New Videogame" : "Edit Videogame"}</h1>
            <FormNewVideogame setMessageError={setMessageError} handlerActiveModalError={handlerActiveModalError} platforms={platforms} genres={genres} submitVideogame={submitVideogame} editVideogame={editVideogame}></FormNewVideogame>
            <ModalError messageError={messageError} activeModalError={activeModalError} handlerActiveModalError={handlerActiveModalError}></ModalError>
        </div>
    )
}

export default CreateVideogame