import React,{useContext}from 'react'
import { context } from '../Context/AuthContext'


function Feed() {
    const {logout}=useContext(context);
    let handleLogOut=async()=>{
            await logout();
            console.log("logout");
    }
    return (
       
        <div>
            <h1>welcome to feed page</h1>
            <button onClick={handleLogOut} >
                Log Out
            </button>
        </div>
    )
}

export default Feed
