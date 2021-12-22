import React,{useState,useEffect} from 'react'
import { auth } from '../firebase';
export const context=React.createContext();

export function AuthProvider({children}){

   
    const [user,setuser]=useState('');
    const [loading,setloading]=useState(true);
    
    function signup(email,password){
        return auth.createUserWithEmailAndPassword(email,password)
       
        
    }
    function login(email,password){
        return auth.signInWithEmailAndPassword(email,password);
    }
    function logout(){
        return auth.signOut();
    }
    function forgetPassword(email){
        return auth.sendPasswordResetEmail(email);
    }

    useEffect(()=>{
        let unsub=auth.onAuthStateChanged((user)=>
            setuser(user));
            setloading(false);
            return()=>{
                unsub();
            }
        },[])
    const store={
        signup,
        login,
        logout,
        user,
        forgetPassword
    }
    return(
        <context.Provider value={store}>
            { children}
        </context.Provider>
    )
}

