import { useEffect, useState } from 'react'
import style from './Search.module.css'

const Search = (props) => {

    const { visibility , setVisibilityOrder , setVisibilityFilter , setVisibilitySearch, setVisibilityOrigin , searchTerm , setSearchTerm } = props

    const [ expanded , setExpanded ] = useState(false)

    useEffect(()=>{
        const timeOutId = setTimeout(()=>{
            setExpanded(true)
        }, 800)

        return () => {
            clearTimeout(timeOutId)
        }
    }, [])

    const handleActivation = () => {
        setVisibilitySearch(!visibility)
        setVisibilityOrder(false)
        setVisibilityFilter(false)
        setVisibilityOrigin(false)

    }

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value)
    }

    return (
        <div>
            <div className={ expanded ? style.searchBtn : style.searchBtnHide} onClick={()=>{handleActivation()}} data-tooltip="Search"></div>
            <div className={ visibility ? style.inputActive : style.inputDeactive}>
                <input 
                    type='text' 
                    value={searchTerm} 
                    onChange={handleInputChange}
                    className={style.searchBar} 
                    placeholder="Enter the name of a video game"
                />    
            </div>
        </div>
    )
}

export default Search