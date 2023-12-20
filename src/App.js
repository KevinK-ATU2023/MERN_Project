import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// my components
import Home from './components/home';
import Navigation from './components/navigation';

function App() {
  return (
      <BrowserRouter>
        {/* Navigation Bar */}
        <Navigation />
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
