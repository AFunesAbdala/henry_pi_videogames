import { useEffect , useState } from "react"
import { useParams } from "react-router-dom"
import style from "./views.module.css"
import axios from "axios"
import DetailVideogame from "../components/detail/DetailVideogame"

const Detail = () => {

    const { id } = useParams();
    const [ videogame , setVideogame ] = useState(null);

    useEffect(()=>{
        axios(`http://localhost:3001/videogames/${id}`)
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
                <DetailVideogame videogame={videogame}></DetailVideogame>
            }
        </div>
    )
}

export default Detail