import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import style from './BtnFilter.module.css'
import { filterVideogames } from '../../../redux/actions'

const BtnFilter = (props) => {

    const { genres, visibility , setVisibilityOrder , setVisibilityFilter , setVisibilitySearch, setVisibilityOrigin } = props

    const dispatch = useDispatch()

    const handleActivation = () => {
        setVisibilityFilter(!visibility)
        setVisibilityOrder(false)
        setVisibilitySearch(false)
        setVisibilityOrigin(false)
    }

    const [ optionSelected , setOptionSelected ] = useState("Default")

    const handleFilter = (genre) => {
        dispatch(filterVideogames(genre))
        setOptionSelected(genre)
    }

    const [ expanded , setExpanded ] = useState(false)

    useEffect(()=>{
        const timeOutId = setTimeout(()=>{
            setExpanded(true)
        }, 1000)

        return () => {
            clearTimeout(timeOutId)
        }
    }, [])

    return (
        <div className={style.wrapper}>
            <div className={ expanded ? style.filterBtn : style.filterBtnHide } onClick={()=>{handleActivation()}} data-tooltip="Filter"></div>
            <div className={ visibility ? style.optionsActive : style.optionsDeactive}>
                <div className={ optionSelected == "Default" ? style.optionSelected : style.option } onClick={()=>{handleFilter("Default")}}>
                    <p>Show All</p>
                </div>
                {
                    genres && genres.map((e, index) => {
                        return (
                            <div className={ optionSelected == e.name ? style.optionSelected : style.option } key={index} onClick={()=>{handleFilter(e.name)}}>
                                <p>{e.name}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )

}

export default BtnFilter