
import './App.css';
import React, { Profiler } from 'react';
import SignUp from './Components/SignUp';
import {BrowserRouter as Router,Routes,Route,BrowserRouter} from 'react-router-dom';
import Login from './Components/Login';
import FirstPage from './Components/FirstPage';
import {AuthProvider} from './Context/AuthContext'
import Feed from './Components/Feed';
import PrivateRoute from './Components/PrivateRoute';
import Forget from './Components/Forget';
import Profile from './Components/Profile';

function App() {
  return (
    <div >
      <Router>
      <React.Fragment>
      <AuthProvider>
      <Routes>
     
        <Route  path="/"  element={<FirstPage/>}/>
        <Route  path='/Feed' element={<PrivateRoute/>}>
        <Route  path='/Feed' element={<Feed/>}/>
        </Route>
        <Route  path="/SignUp"  element={<SignUp/>}/>
        <Route path="/Login" element={<Login/>}/>
        {/* <PrivateRoute  path="/Feed" element={<Feed/>}/> */}
        <Route  path='/Profile/:id' element={<PrivateRoute/>}>
        <Route path='/Profile/:id' element={<Profile/>}/>
        </Route>
        
        
        <Route path="/Forget" element={<Forget/>}/>
      </Routes>
      </AuthProvider>
      </React.Fragment>
      </Router>
     
    </div>
  );
}

export default App;
//Comment added