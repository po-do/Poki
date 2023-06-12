import React from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppHeader from './components/AppHeader/AppHeader';
import AppRoutes from './components/AppRoutes/AppRoutes';
import SideMenu from './components/SideMenu/SideMenu';
import PageContent from './components/PageContent/PageContent';

function App() {
  return <>
    <div className='container'>
      <div>
        <BrowserRouter>
          <SideMenu>
            <AppRoutes />
          </SideMenu>
        </BrowserRouter>
      </div>
      <div className='sideSection'>
        <AppHeader />
        <PageContent />
      </div>
    </div>
  </>
}

export default App;
