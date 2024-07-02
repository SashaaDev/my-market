import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import NavBar from "./components/NavBar";

const App: React.FC = () => {
  return (
      <Router>
        <AppRouter />
        <NavBar />
      </Router>
  );
};

export default App;
