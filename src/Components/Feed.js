import React,{useContext,useState,useEffect}from 'react'
import { context } from '../Context/AuthContext'
import { database } from '../firebase';
import Navbar from './Navbar';
import Post from './Posts';
import UploadFile from './UploadFile';


function Feed() {
    const {user,logout}=useContext(context);     
    const [userData,setData]=useState('');
    useEffect(()=>{
        const unsub=database.users.doc(user.uid).onSnapshot((snap)=>{
            setData(snap.data());
            
        })
        return ()=>{unsub()}
    },[user])
    
    return (
       <>
       <Navbar userData={userData}/>
         <div style={{display:"flex" , justifyContent:"center", alignItems:"center", flexDirection:"column",marginTop:"9rem"}}>
         
            <UploadFile user={userData}/>
            <Post userData={userData} style={{topMargin:"3rem"}}/>
        </div>
       </>
      
    )
}

export default Feed
