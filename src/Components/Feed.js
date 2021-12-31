import React,{useContext,useState,useEffect}from 'react'
import { context } from '../Context/AuthContext'
import { database } from '../firebase';
import UploadFile from './UploadFile';


function Feed() {
    const {user,logout}=useContext(context);     
    const [userData,setData]=useState('');
    useEffect(()=>{
        const unsub=database.users.doc(user.uid).onSnapshot((snap)=>{
            setData(snap.data());
            console.log(userData);
        })
    },[user])
    return (
       
        <div style={{display:"flex" , justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
            <div style={{width:"50%"}}>
                    <h1>welcome to feed page</h1>
                    <button onClick={logout} >
                        Log Out
                    </button>
            </div>
            <UploadFile user={userData}/>
        </div>
    )
}

export default Feed
