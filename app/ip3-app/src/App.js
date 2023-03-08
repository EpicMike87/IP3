import './App.css';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Home from './Pages/Home';
import Player from './Pages/Player'; 

function App() {

  return(
    <div className='App'>
      <BrowserRouter>
      <Routes>
        <Route exact path="/home" element={<Home/>} />
        <Route exact path="/" element={ <Navigate to="/home"/> }/>
        <Route exact path="/player" element={<Player />} />
      </Routes>
      </BrowserRouter>
    </div>  )

}


export default App;
