import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import favicon from '../../assets/favicon.png';
import ConnectCdm from './ConnectCdm';
import './App.css';

function setHeader() {
  const date = new Date();
  const hours = date.getHours();
  if (hours > 5 && hours < 12) {
    return '☕️ Morning. Grab a cup of coffee!';
  }
  if (hours >= 12 && hours < 17) {
    return '☀️ Good afternoon. Had a nice lunch?';
  }
  if (hours >= 17 && hours < 20) {
    return '✨ Good evening. How was your day?';
  }
  if (hours >= 20 || hours <= 5) {
    return '🦉 Nighty owl! Working late?';
  }
  return '👋 Hello!';
}

function Hello() {
  return (
    <div className="min-h-full">
      <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-lg space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-12"
              alt="cdm-preflight"
              src={favicon}
            />
            <h1 className="mt-3 text-center text-3xl font-bold tracking-tight text-gray-900">
              Welcome to CDM Preflight
            </h1>
            <h2 className="text-center text-l mt-3 tracking-tight text-gray-600">
              {setHeader()}
            </h2>
          </div>
          <ConnectCdm />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
