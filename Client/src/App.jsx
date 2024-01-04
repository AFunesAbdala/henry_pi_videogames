import './App.css'
import Home from './views/Home';
import NavBar from './components/nav/NavBar';
import Detail from './views/Detail';
import Landing from './views/Landing';
import Helpers from './helpers/routesHelpers';
import CreateVideogame from './views/CreateVideogame';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { get_genres, get_platforms, get_videogames, get_videogamesByName } from './redux/actions';
import axios from 'axios';
import { URL } from './helpers/routesBack'


function App() {

  const { pathname } = useLocation();

  if (pathname === "/") {
    document.body.className = "landBack";
  }
  if (pathname === "/home") {
    document.body.className = "homeBack";
  }
  if (pathname.startsWith("/detail")) {
    document.body.className = "detailBack";
  }
  if (pathname.startsWith("/myvideogame")) {
    document.body.className = "createBack";
  }

  const platforms = useSelector(state => state.platforms)
  const genres = useSelector(state => state.genres)
  const videogames = useSelector(state => state.home_videogames)
  const dispatch = useDispatch()

  const [ searchTerm , setSearchTerm ] = useState('')

  const [ messageError , setMessageError] = useState("");
  const [ activeModalError, setActiveModalError] = useState(false)

  const handlerActiveModalError = (state) => {
    setActiveModalError(state)
  }

  useEffect(()=>{
    if (platforms.length === 0) dispatch(get_platforms())
    if (genres.length === 0) dispatch(get_genres())
    if (videogames.length === 0 || searchTerm === '') dispatch(get_videogames("api"))
    if (searchTerm != '') dispatch(get_videogamesByName(searchTerm)).catch(error => {
      setMessageError(error.response.data.message)
      handlerActiveModalError(true)
    })
  }, [searchTerm])

  const submitVideogame = (videogameData) => {
    axios
      .post(`${URL}/myvideogame`, videogameData)
      .then((response) => {
        setActiveModalError(true)
        setMessageError(response.data.message)
      })
      .catch((error) => {
        setActiveModalError(true)
        setMessageError(error.response.data.message)
      })
  }

  const navigate = useNavigate()

  const deleteVideogame = (uuid) => {
    axios
      .delete(`${URL}/myvideogame/${uuid}`)
      .then((response) => {
        if (response.status === 200) {
          setActiveModalError(true)
          setMessageError(response.data.message)
          navigate('/home')
        }
      })
      .catch((error) => {
        setActiveModalError(true)
        setMessageError(error.response.data.message)
      })
  }

  const editVideogame = (UUID, videogameData) => {
    axios
      .put(`${URL}/myvideogame/${UUID}`, videogameData)
      .then((response) => {
        setActiveModalError(true)
        setMessageError(response.data.message)
      })
      .catch((error) => {
        setActiveModalError(true)
        setMessageError(error.response.data.message)
      })
  }

  return (
    <div className='App'>
      {pathname != "/" && <NavBar genres={genres} searchTerm={searchTerm} setSearchTerm={setSearchTerm}></NavBar>}
      <Routes>
          <Route path={Helpers.Landing} element={<Landing/>}></Route>
          <Route path={Helpers.Home} element={<Home messageError={messageError} activeModalError={activeModalError} handlerActiveModalError={handlerActiveModalError}/>}></Route>
          <Route path={Helpers.Detail} element={<Detail deleteVideogame={deleteVideogame} />}></Route>
          <Route path={Helpers.Create} element={<CreateVideogame platforms={platforms} genres={genres} submitVideogame={submitVideogame} editVideogame={editVideogame} messageError={messageError} activeModalError={activeModalError} handlerActiveModalError={handlerActiveModalError} setMessageError={setMessageError}/>}></Route>
      </Routes>
    </div>  
  )
}

export default App
