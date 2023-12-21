import { useEffect, useState } from "react"
import FormNewVideogame from "../components/formNewVideogame/formNewVideogame"
import style from "./views.module.css"
import axios from "axios"

const CreateVideogame = (props) => {

    const { platforms , genres, submitVideogame } = props

    return (
        <div className={style.create}>
            <h1 className={style.title}>My Videogame</h1>
            <FormNewVideogame platforms={platforms} genres={genres} submitVideogame={submitVideogame}></FormNewVideogame>
        </div>
    )
}

export default CreateVideogame