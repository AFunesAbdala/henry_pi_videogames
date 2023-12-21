import './App.css'
import Home from './views/Home';
import NavBar from './components/nav/NavBar';
import Detail from './views/Detail';
import Landing from './views/Landing';
import Helpers from './helpers/routesHelpers';
import CreateVideogame from './views/CreateVideogame';
import { Route, Routes, useLocation } from 'react-router-dom';
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
    if (pathname === "/createvideogame") {
      document.body.className = "createBack";
    }
  }, [searchTerm, pathname])


  const submitVideogame = (videogameData) => {
    axios
      .post('http://localhost:3001/newvideogame', videogameData)
      .then((response) => {
        if (response.status === 200) {
          window.alert("Subido con Exito")
        }
      })
      .catch((error) => {
        window.alert(error.response.data.error)
      })
  }

  return (
    <div className='App'>
      {pathname != "/" && <NavBar genres={genres} searchTerm={searchTerm} setSearchTerm={setSearchTerm}></NavBar>}
      <Routes>
          <Route path={Helpers.Landing} element={<Landing/>}></Route>
          <Route path={Helpers.Home} element={<Home/>}></Route>
          <Route path={Helpers.Detail} element={<Detail/>}></Route>
          <Route path={Helpers.Create} element={<CreateVideogame platforms={platforms} genres={genres} submitVideogame={submitVideogame}/>}></Route>
      </Routes>
    </div>  
  )
}

export default App
