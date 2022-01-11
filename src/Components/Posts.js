import React,{useState,useEffect} from 'react';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { database } from '../firebase';
import Posts from './Posts';
import Video from './Video';
import './Post.css'
import Like from './Like';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Addcomments from './Addcomments';
import Comments from './Comments';

export default function Post({userData}) {
    const [post,setpost]=useState(null);
    const [open, setOpen] = React.useState(null);
   
    const handleClickOpen = (id) => {setOpen(id); };
    const handleClose = () => {setOpen(null);};
    useEffect(()=>{
        let parr=[]
        let unsub=database.posts.orderBy("createdAT",'desc').onSnapshot((Qsnap)=>{
           Qsnap.forEach((doc)=>{
               let data={...doc.data(),postId:doc.id}
               parr.push(data);
           })
           setpost(parr);
        })
        setTimeout(()=>{
            unsub();
       }, 1000);
    },[post])
   
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
                            <ChatBubbleOutlineIcon className='chat-icon' onClick={()=>handleClickOpen(p.pid)}/>
                            <Dialog
                                open={open==p.pid}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                fullWidth="true"
                                maxWidth="md"
                            >
                                <div className='modal-cont'>
                                    <div className='modal-video'>
                                        <video src={p.pUrl} autoPlay={true} controls muted></video>
                                    </div>
                                    <div className='modal-comment'>
                                        <Card className="card1">
                                            <Comments postData={p} style={{overflow:"scroll"}}/>
                                        </Card>
                                        <Card className="card2">
                                            <div>
                                            <Typography variant="body2" color="text.secondary" style={{display:"flex",justifyContent:"end",alignItems:"center"}} >
                                                {p.Likes.length!=0 && p.Likes.length==1?`${p.Likes.length} Like` :`${p.Likes.length} Likes`}
                                            </Typography>
                                            <Addcomments userData={userData} postData={p} />
                    
                                            </div>
                                         
                                        </Card>
                                    </div>
                                </div>
                            </Dialog>
                           </div>
                        </React.Fragment>
                    ))
            }
           </div>
           }
        </div>
    )
}
