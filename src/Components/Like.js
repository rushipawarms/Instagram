import React,{useState,useEffect} from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './Post.css';
import { database } from '../firebase';
export default function Like({userData,postData}) {
    const [like,setlike]=useState(null);
   const [call, setcall]=useState(null);
    useEffect(()=>{
        
         let check= postData.Likes.includes(userData.userId)?true:false
        setlike(check);
    },[postData,call])
    
    let handleLike=()=>{
        if(like==true)
        {
            console.log("like");
            let narr=postData.Likes.filter((el)=>el!=userData.userId)
            database.posts.doc(postData.postId).update({
                Likes:narr
            })
            setcall(call);
        }
        else{
            console.log("Unlike");
           let narr=[...postData.Likes,userData.userId];
           
           database.posts.doc(postData.postId).update({
            Likes:narr
        })
        setcall(call);
        }
    }
   
    return (
        
        <div>
           {
               like!=null?
               <>
               {
                   like==true?<FavoriteIcon className='icon-style like' onClick={handleLike} />:<FavoriteIcon className='icon-style unlike' onClick={handleLike}/>
               }
               </>:
               <></>
           }
        </div>
    )
}
