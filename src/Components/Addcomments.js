import React,{useState,useEffect} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { database } from '../firebase';
function Addcomments({userData,postData}) {
    const [Ctext,settext]=useState('');
    let handlepost=()=>{
        let obj={
            text:Ctext,
            profileIMG:userData.profileurl,
            name:userData.name
        }
        database.comments.add(obj).then((doc)=>{
            database.posts.doc(postData.postId).update({
                Comment:[...postData.Comment,doc.id]
            })
        })
        settext('');
    }
    
    return (
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
            <TextField label="Add comments"  style={{width:"70%"}} value={Ctext} onChange={(e)=>settext(e.target.value)} />
         <Button onClick={handlepost} variant="text">Post</Button>
        </div>
    )
}

export default Addcomments
