import './App.css';
import Main from './views/Main';
import {BrowserRouter, Route, Routes, redirect} from 'react-router-dom'
import OneAlbum from './components/OneAlbum';
import Edit from './components/Edit';
import { useState } from 'react';
import LogReg from './views/LogReg';

function App() {
  const [userId, setUserId] = useState('')
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<LogReg userId={userId} setUserId={setUserId}/>} path='/'/> 
          <Route element={<Main userId={userId} setUserId={setUserId}/>} path='/home'/>
          <Route element={<OneAlbum/>} path='/album/:id'/>
          <Route element={<Edit/>} path='edit/:id' /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
