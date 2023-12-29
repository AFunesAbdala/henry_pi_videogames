import { Link, useLocation } from "react-router-dom"
import Helpers from "../../helpers/routesHelpers"
import style from "./NavBar.module.css"
import BtnOrder from "./order/BtnOrder"
import BtnFilter from "./filter/BtnFilter"
import { useEffect, useState } from "react"
import Search from "./search/Search"

const NavBar = (props) => {

    const { genres, searchTerm , setSearchTerm } = props

    const { pathname } = useLocation()

    const [ search , setSearch ] = useState(false)
    const [ btnFilter , setBtnFilter ] = useState(false)
    const [ btnOrder , setBtnOrder ] = useState(false)

    const [ expanded , setExpanded ] = useState(false)
    const [ expandedBtn , setExpandedBtn ] = useState(false)

    useEffect(()=>{
        const timeOutId = setTimeout(()=>{
            setExpanded(true)
        }, 400)

        const timeOutId2 = setTimeout(()=>{
            setExpandedBtn(true)
        }, 1200)

        return () => {
            clearTimeout(timeOutId)
            clearTimeout(timeOutId2)
        }
    }, [])

    return(
        <div className={style.nav}>
            { pathname === Helpers.Home ? 
            <div className={ style.container }>
                <Link to={Helpers.Home} data-test-id="HomeBtn">
                    <div className={ expandedBtn ? style.homeBtn :style.homeBtnHide} data-tooltip="Home"></div>
                </Link>
                <div className={ expanded ? style.navcontainer : style.navcontainerHide}>
                    <Search visibility={search} setVisibilityOrder={setBtnOrder} setVisibilityFilter={setBtnFilter} setVisibilitySearch={setSearch} searchTerm={searchTerm} setSearchTerm={setSearchTerm}></Search>
                    <BtnOrder visibility={btnOrder} setVisibilityOrder={setBtnOrder} setVisibilityFilter={setBtnFilter} setVisibilitySearch={setSearch}></BtnOrder>
                    <BtnFilter genres={genres}visibility={btnFilter} setVisibilityFilter={setBtnFilter} setVisibilityOrder={setBtnOrder} setVisibilitySearch={setSearch}></BtnFilter>
                    <div className={style.filterBtn}></div>
                    <Link to={Helpers.Landing} className={style.linkBtn}>
                        <div className={ expandedBtn ? style.logOutBtn : style.logOutBtnHide} data-tooltip="Log Out" ></div>
                    </Link>
                </div>
                <Link to={`/myvideogame/new/0`}>
                    <div className={ expandedBtn ? style.createBtn : style.createBtnHide} data-tooltip="Create"></div>
                </Link>
            </div>
            :
            <div className={style.container}>
                <Link to={Helpers.Home}>
                    <div className={style.homeBtn} data-tooltip="Home"></div>
                </Link>
                <div className={style.navcontainer}>
                    <Link to={Helpers.Landing} className={style.linkBtn}>
                        <div className={style.logOutBtn} data-tooltip="Log Out" ></div>
                    </Link>
                </div>
            </div>
            }
            
        </div>
    )
}

export default NavBar
