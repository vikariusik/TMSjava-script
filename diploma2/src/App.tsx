import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Navigation from './components/Navigation';
import SearchPage from './pages/SearchPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import FavoritesPage from './pages/FavoritesPage';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="app">
          <Navigation />
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
