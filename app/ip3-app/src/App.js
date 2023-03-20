import './App.css';
//import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Player from './Pages/Player'; 
import Teams from './Pages/Teams'; 
import Rankings from './Pages/Rankings'; 
import Managers from './Pages/Managers'; 
import Navbar from "./Component/Navbar";
import Footer from './Component/Footer';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PlayerCompare from './Pages/PlayerCompare';

function App() {

  return(
      <>
      <DndProvider backend={HTML5Backend}>
        <Navbar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/player" element={<Player />} />
              <Route path="/home" element={<Home />} />
              <Route path="/team" element={<Teams />} />
              <Route path="/ranking" element={<Rankings />} />
              <Route path="/manager" element={<Managers />} />
              <Route path='/PlayerComparison' element={<PlayerCompare />} />
            </Routes>
          </div>
        <Footer />
      </DndProvider>
    </>
)

}


export default App;
