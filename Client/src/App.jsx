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


function App() {

  const { pathname } = useLocation();

  const platforms = useSelector(state => state.platforms)
  const genres = useSelector(state => state.genres)
  const videogames = useSelector(state => state.home_videogames)
  const dispatch = useDispatch()

  const [ searchTerm , setSearchTerm ] = useState('')

  useEffect(()=>{
    if (platforms.length === 0) dispatch(get_platforms())
    if (genres.length === 0) dispatch(get_genres())
    if (videogames.length === 0 || searchTerm === '') dispatch(get_videogames())
    if (searchTerm != '') dispatch(get_videogamesByName(searchTerm))

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
  }, [searchTerm, pathname])


  const submitVideogame = (videogameData) => {
    axios
      .post('http://localhost:3001/myvideogame', videogameData)
      .then((response) => {
        window.alert(response.data.message)
      })
      .catch((error) => {
        window.alert(error.response.data.map(e => e.message))
      })
  }

  const navigate = useNavigate()

  const deleteVideogame = (uuid) => {
    axios
      .delete(`http://localhost:3001/myvideogame/${uuid}`)
      .then((response) => {
        if (response.status === 200) {
          window.alert(response.data.message)
          navigate('/home')
        }
      })
      .catch((error) => {
        window.alert(error.response.data.message)
      })
  }

  const editVideogame = (UUID, videogameData) => {
    axios
      .put(`http://localhost:3001/myvideogame/${UUID}`, videogameData)
      .then((response) => {
        window.alert(response.data.message)
      })
      .catch((error) => {
        window.alert(error.response.data.map(e => e.message))
      })
  }

  return (
    <div className='App'>
      {pathname != "/" && <NavBar genres={genres} searchTerm={searchTerm} setSearchTerm={setSearchTerm}></NavBar>}
      <Routes>
          <Route path={Helpers.Landing} element={<Landing/>}></Route>
          <Route path={Helpers.Home} element={<Home/>}></Route>
          <Route path={Helpers.Detail} element={<Detail deleteVideogame={deleteVideogame} />}></Route>
          <Route path={Helpers.Create} element={<CreateVideogame platforms={platforms} genres={genres} submitVideogame={submitVideogame} editVideogame={editVideogame}/>}></Route>
      </Routes>
    </div>  
  )
}

export default App
