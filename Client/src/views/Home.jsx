import { useSelector } from "react-redux"
import WrapVideogames from "../components/wrapVideogames/WrapVideogames"
import style from "./views.module.css"
import { useState } from "react"

const Home = () => {

    const videogames = useSelector(state => state.home_videogames)

    const [ page, setPage ] = useState(1);
    const videogamesPerPage = 10;
    const totalPages = Math.ceil(videogames.length / videogamesPerPage)

    const indexLastVideogame = page * videogamesPerPage;
    const indexFirstVideogame = indexLastVideogame - videogamesPerPage;
    
    const visible_videogames = videogames 
        ? videogames.slice(indexFirstVideogame, indexLastVideogame) 
        : videogames 

    const handlePageChange = (page) => {
        setPage(page);
    }

    const pageNumbers = Array.from({ length : totalPages }, ( _ , index) => index + 1)

    return (
        <div className={style.home}>
            <WrapVideogames videogames={visible_videogames} ></WrapVideogames>
            <div className={style.paginationwrap}>
                {
                    pageNumbers.map((pageNumber, index) => {
                        return (
                            <button
                                key={index}
                                onClick={()=> handlePageChange(pageNumber)}
                                className={ pageNumber === page ? style.btnPagesActive : style.btnPages}
                            >
                                {pageNumber}
                            </button>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home