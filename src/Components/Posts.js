import React,{useState,useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';

import { database } from '../firebase';
import Posts from './Posts';
import Video from './Video';
import './Post.css'
import Like from './Like';

export default function Post({userData}) {
    const [post,setpost]=useState(null);
    useEffect(()=>{
        let parr=[]
        let unsub=database.posts.orderBy("createdAT",'desc').onSnapshot((Qsnap)=>{
           Qsnap.forEach((doc)=>{
               let data={...doc.data(),postId:doc.id}
               parr.push(data);
           })
           setpost(parr);
        })
        return ()=>{unsub()}
    })
   
    return (
        <div>
           {
           post==null || userData==null?<CircularProgress disableShrink />:
           <div className='video-cont'>
            {
                post.map((p,index)=>(
                   
                    
                        <React.Fragment key={index}>
                           <div className='video-ele'>
                            <Video src={p.pUrl}/>
                            <div className='fa'style={{display:"flex"}}>
                            <Avatar sx={{ width: 50, height: 50 }} src={p.Purl} />
                            <h4 style={{color:"white",marginTop:"15%",marginLeft:"10%"}}>{p.Uname}</h4>
                            </div>
                            <Like userData={userData} postData={p}/>
                           </div>
                        </React.Fragment>
                    ))
            }
           </div>
           }
        </div>
    )
}
