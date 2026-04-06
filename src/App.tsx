import { HashRouter, Routes, Route } from 'react-router-dom';
import { MapView } from './pages/MapView';
import { ListView } from './pages/ListView';
import { Detail } from './pages/Detail';
import { Favorites } from './pages/Favorites';
import { Guide } from './pages/Guide';
import { Airport } from './pages/Airport';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<MapView />} />
        <Route path="/list" element={<ListView />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/airport" element={<Airport />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
