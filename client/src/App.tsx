import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IndexPage from './components/pages/IndexPage';
import LocationPage from './components/pages/LocationPage';
import LoginPage from './components/pages/LoginPage';
import SettingsPage from './components/pages/SettingsPage';
import Navigation from './components/utilities/navigationbar';

function App() {
  return (
    <BrowserRouter>
      {/* Shared navigation appears on every page. */}
      <Navigation></Navigation>

      <main className="sm:ml-16 pb-16 sm:pb-0 p-4 sm:p-6 overflow-x-hidden">
        <h1 className="text-3xl font-bold mb-6">WeatherApp</h1>

        {/* Main page routes. */}
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/location/:id" element={<LocationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;