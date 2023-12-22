// react bootstrap import
import 'bootstrap/dist/css/bootstrap.min.css';

// router imports
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// my components imports 
import Home from './components/home';
import WatchList from './components/watch_list';
import Account from './components/account';
import './App.css';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          
          {/* Home Page - search movies/tv and add to watchlist */}
          <Route path="/" element={<Home />} />
          
          {/* WatchList Page - view all watchlisted movies/tv */}
          <Route path="/watchlist" element={<WatchList />} />
          
          {/* Account Page - Sign into an account which corresponds to a mongodb document storing watchlist items */}
          <Route path="/account" element={<Account />} />

        </Routes>
      </BrowserRouter>
  );
}

export default App;
