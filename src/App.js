import logo from './logo.svg';
import './App.css';
import Home from './pages/Home/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import DijkstraCanva from './pages/Dijkstra/DijkstraCanva'

import MinHeap from './pages/MinHeap/MinHeap';
function App() {
  return (
    <div className="App">
       <Router>
        <Routes>
            <Route  exact path="/" element = {<Home/>} />
            <Route  exact path="/dijkstra" element = {<DijkstraCanva/>} />
            <Route  exact path="/minheap" element = {<MinHeap/>} />
            
            
          </Routes>
      </Router>
    </div>
  );
}

export default App;
