
import './App.css';
import React from 'react';
import SignUp from './Components/SignUp';
import {BrowserRouter as Router,Routes,Route,BrowserRouter} from 'react-router-dom';
import Login from './Components/Login';
import FirstPage from './Components/FirstPage';
import {AuthProvider} from './Context/AuthContext'
import Feed from './Components/Feed';
import PrivateRoute from './Components/PrivateRoute';

function App() {
  return (
    <div >
      <Router>
      <React.Fragment>
      <AuthProvider>
      <Routes>
     
        <Route  path="/"  element={<FirstPage/>}/>
        <Route  path="/SignUp"  element={<SignUp/>}/>
        <Route path="/Login" element={<Login/>}/>
        {/* <PrivateRoute  path="/Feed" element={<Feed/>}/> */}
        <Route  path='/Feed' element={<PrivateRoute/>}>
        <Route  path='/Feed' element={<Feed/>}/>
        </Route>
      </Routes>
      </AuthProvider>
      </React.Fragment>
      </Router>
     
    </div>
  );
}

export default App;
