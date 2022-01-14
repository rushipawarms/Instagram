import {useContext} from 'react'
// import { Route,Navigate } from 'react-router-dom'

 import { context } from '../Context/AuthContext'

// function PrivateRoute({component:Component,...rest}) {
//     const {user}=useContext(context);
//     console.log(user);
//     return (
//         <Route {...rest} render={props=>{
//             return user?<Component {...props}/>:<Navigate to="/Login" />
//         }}/>
        
//     )
// }
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({component:Component,...rest}) => {
    const {user}=useContext(context);
   
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return user? <Outlet /> : <Navigate to="/Login" />;
}

// function Privateroutes({ children, ...rest }) {
//     let auth = useContext(context);
//     return (
//       <Route
//         {...rest}
//         render={() => auth
//           ? children
//           : <Navigate to="/login" />
//         }
//       />
//     );
//   }

export default PrivateRoute


