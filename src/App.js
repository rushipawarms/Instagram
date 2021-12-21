
import './App.css';
import SignUp from './Components/SignUp';
import {BrowserRouter as Router,Routes,Route,BrowserRouter} from 'react-router-dom';
import Login from './Components/Login';
import FirstPage from './Components/FirstPage';
import {AuthProvider} from './Context/AuthContext'

function App() {
  return (
    <div >
      <BrowserRouter>
      <AuthProvider>
      <Routes>
          <Route exact path="/"  element={<FirstPage/>}/>
        <Route exact path="/SignUp"  element={<SignUp/>}/>
        <Route path="/Login" element={<Login/>}/>
      </Routes>
      </AuthProvider>
      
      </BrowserRouter>
     
    </div>
  );
}

export default App;
