import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { FirebaseAppProvider } from 'reactfire';
import 'firebase/auth';


import { Home, Search, Saved, Auth } from './components'; 
import './index.css';
import { theme } from './Theme/themes';


import { firebaseConfig } from './firebaseConfig';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}> 
      <ThemeProvider theme={ theme }>
        <Router>
          <Routes>
            <Route path='/' element = {<Home title = {"WILD ANIMALS"}/>}/>
            <Route path='/auth' element = {<Auth title = {"WILD ANIMALS"}/>}/>
            <Route path='/search' element = {<Search />} />
            <Route path='/saved' element = {<Saved />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </FirebaseAppProvider>
  </React.StrictMode>,
)
