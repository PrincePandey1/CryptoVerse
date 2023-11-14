import './App.css';
import {Routes,Route} from "react-router-dom"
import ExchangesCoin from './components/ExchangesCoin';
import Coins from './components/Coins';
import CoinDetails from './components/CoinDetails';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/"  element={<ExchangesCoin/>} />
        <Route path="/coins"  element={<Coins/>} />
        <Route path="/coins/:id"  element={<CoinDetails/>} />
      </Routes>
    </div>
  );
}

export default App;
