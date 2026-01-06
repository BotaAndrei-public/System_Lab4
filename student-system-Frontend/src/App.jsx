import { useState } from 'react';
import Header from './components/Header';
import Menu from './components/Menu';
import Content from './components/Content';
import './App.css';

function App() {
  const [activeView, setActiveView] = useState('home');
  const [clientId, setClientId] = useState('client-001');

  return (
    <div className="app">
      <div className="container">
        <Header clientId={clientId} setClientId={setClientId} />
        <Menu setActiveView={setActiveView} />
        <Content activeView={activeView} clientId={clientId} />
      </div>
    </div>
  );
}

export default App;
