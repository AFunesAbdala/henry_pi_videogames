import style from "./modalError.module.css"

const ModalError = (props) => {
    const { messageError, activeModalError, handlerActiveModalError } = props

    return (
        activeModalError &&
        <div className={style.wrapper}>
            <div className={style.modalwrapper}>
                <h3 className={style.title}>Hey!</h3>
                <p className={style.error}>{messageError}</p>
                <button className={style.button} onClick={()=>{handlerActiveModalError(false)}}>Okay</button>
            </div>
        </div>
    )
}

export default ModalError