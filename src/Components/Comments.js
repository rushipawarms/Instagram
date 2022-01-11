import React,{useState,useEffect} from 'react'
import { database } from '../firebase';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
function Comments({postData}) {
    const [comments,setcomments]=useState(null);
    useEffect(async()=>{
        let arr=[];
        for(let i=0;i<postData.Comment.length;i++)
        {
           let data= await database.comments.doc(postData.Comment[i]).get()
           arr.push(data.data());
        }
        setcomments(arr);
    },[postData])
   
    return (
       <div>
            {
              
                    comments==null?<CircularProgress disableShrink />:
                   <>
                       {
                           comments.map((comment,index)=>(
                              
                               
                                <div style={{display:"flex"}}>
                                <Avatar sx={{ width: 30, height: 30 }} src={comment.profileIMG} />
                                <p><span style={{ fontweight:'bold'}}>{comment.name}</span>&nbsp;&nbsp;{comment.text}
                                </p>
                                </div>
                                
                              
                               
                           ))
                       }
                   </>
               
            }
            
          
            
          
        </div>
    )
}

export default Comments
