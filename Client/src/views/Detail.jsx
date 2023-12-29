import { useEffect , useState } from "react"
import { useParams } from "react-router-dom"
import style from "./views.module.css"
import axios from "axios"
import DetailVideogame from "../components/detail/DetailVideogame"
import { URL } from '../helpers/routesBack'

const Detail = (props) => {

    const { deleteVideogame } = props
    const { id } = useParams();
    const [ videogame , setVideogame ] = useState(null);

    useEffect(()=>{
        axios(`${URL}/videogames/${id}`)
        .then((response) => {
            setVideogame(response.data)
        })
        .catch((error) => {
            window.alert(error.message)
        })

        return (
            setVideogame(null)
        )
    }, [])

    return (
        <div className={style.detail}>
            { !videogame ? 
                <div></div> : 
                <DetailVideogame videogame={videogame} deleteVideogame={deleteVideogame} ></DetailVideogame>
            }
        </div>
    )
}

export default Detail