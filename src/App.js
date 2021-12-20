
import './App.css';
import SignUp from './Components/SignUp';
import {BrowserRouter as Router,Routes,Route,BrowserRouter} from 'react-router-dom';
import Login from './Components/Login';
import FirstPage from './Components/FirstPage';

function App() {
  return (
    <div >
      <BrowserRouter>
      <Routes>
      <Route exact path="/"  element={<FirstPage/>}/>
    <Route exact path="/SignUp"  element={<SignUp/>}/>
    <Route path="/Login" element={<Login/>}/>
   </Routes>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
