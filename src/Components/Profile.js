import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { database } from '../firebase';
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography';
import Navbar from './Navbar';
import './Profile.css';
import Avatar from '@mui/material/Avatar';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
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
import { CardActionArea } from '@mui/material';
import Addcomments from './Addcomments';
import CloseIcon from '@mui/icons-material/Close';
import Comments from './Comments';
import { Link ,useNavigate} from 'react-router-dom'
function Profile() {
    const {id}=useParams();
    const [userData,setuser]=useState(null);
    const [userpost,setpost]=useState(null);
    const navigate = useNavigate();
    const [open, setOpen] = useState(null);
   
    const handleClickOpen = (id) => {setOpen(id); };
    const handleClose = () => {
        console.log(userData.userId);
        setOpen(null);
        navigate('/Feed');
       
    };
    useEffect(()=>{
        database.users.doc(id).onSnapshot((snap)=>{
            setuser(snap.data());
        })
    },[id])
    useEffect(async()=>{
        if(userData!=null)
        {
            let arr=[];
            for(let i=0;i<userData.postIds.length;i++)
            {
                let pdata=await database.posts.doc(userData.postIds[i]).get()
                arr.push({...pdata.data(),postId:pdata.id});
            }
            setpost(arr);
        }
        
        
    })
   
    return (
        <div>
         {
             userData==null|| userpost==null?<CircularProgress />:
             <>
                <Navbar userData={userData}/>
                 <div className='spacer'></div>
                 <div className='profile-container'>
                 <div className='upper-part'>
                     <div className='profile-img'>
                         <img src={userData.profileurl}/>
                     </div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     <div className='info'>
                            <Typography variant='h6'>
                            Name:{userData.name}
                            </Typography>
                            <Typography variant='h6'>
                            Posts:{userData.postIds.length}
                            </Typography>
                     </div>
                 </div>
                 <hr style={{marginTop:"1rem", marginBottom:"1rem" }}/>
                 <div className='profile-videos'>
                 {
                userpost.map((p,index)=>(
                        <React.Fragment key={index}>
                           <div className='video-ele' onClick={()=>handleClickOpen(p.pid)}>
                            <Video src={p.pUrl} />
                           
                            <Dialog
                                open={open==p.pid}
                                onClose={handleClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                                fullWidth="true"
                                maxWidth="md"
                            >
                                <div className='modal-cont'>
                                    <CloseIcon onClick={handleClose}/>
                                    <div className='modal-video'>
                                        <video src={p.pUrl}></video>
                                    </div>
                                    <div className='modal-comment'>
                                        <Card className="card1">
                                            <Comments postData={p} style={{overflow:"scroll",marginTop:"1rem"}}/>
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
                </div>
             </>
         }
        </div>
    )
}

export default Profile
