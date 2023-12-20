import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// my components
import Home from './components/home';

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
