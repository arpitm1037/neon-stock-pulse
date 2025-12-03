import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import DetailsPage from './pages/DetailsPage';
import HomePage from './pages/HomePage';
import WatchlistPage from './pages/WatchlistPage';

const App = () => (
  <BrowserRouter>
    <div className="app">
      <Navbar />
      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stock/:symbol" element={<DetailsPage />} />
          <Route path="/watchlist" element={<WatchlistPage />} />
        </Routes>
      </main>
    </div>
  </BrowserRouter>
);

export default App;

