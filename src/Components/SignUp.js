import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './SignUp.css'
import insta from './images/logo.png';
import { makeStyles } from '@material-ui/core';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import CloudUploadicon from '@material-ui/icons/CloudUpload';
import { Link , useNavigate} from 'react-router-dom';
import { context } from '../Context/AuthContext';
import { async } from '@firebase/util';
import { database, storage } from '../firebase';
export default function SignUp() {
  const useStyle=makeStyles({
    text1:{
      marginBottom:"1rem",
      color:"grey",
      textAlign:"center"
    },
    Card2:{
      height:"3rem",
      marginTop:'2%'
    }
  })
  const classes=useStyle();
  const [email,setemail]=useState('');
  const [password,setpassword]=useState('');
  const [fullname , setfullname]=useState('');
  const[file,setfile]=useState(null);
  const[error,seterror]=useState('');
  const [loading,setloading]=useState(false);
  const navigate = useNavigate();
  const {signup}=useContext(context);
  
  let signupHandle=async()=>{
    if(file==null )
    {
      seterror('please select profile picture');
      setTimeout(() => {
        seterror('');
      }, 3000);
      return;
    }
 
    try {
      seterror('');
      setloading(true);
      let userobj= await signup(email,password)
      let uid= userobj.user.uid
       console.log(uid);
      
       let uploadTask=storage.ref(`/data/${uid}/profileimage`).put(file);
       uploadTask.on('state_changed',f1,f2,f3);
       function f1(snapshot)
       {
           let progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
           console.log(progress);
       }
       function f2(erro){
        seterror(erro.message);
        setTimeout(() => {
          seterror('');
        }, 3000);
        setloading(false);
       }
       function f3(){
           uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
               console.log(url);
               database.users.doc('uid').set({
                 email:email,
                 userId:uid,
                 name:fullname,
                 profileurl:url,
                 createdAt:database.getTimeStamp()
               })
           })
           setloading(false);
           navigate('/Feed');
       }

    } catch (err) {
      seterror(err.message);
      setTimeout(() => {
        seterror('');
      }, 3000);
      setloading(false);
    }
  }
  return (
      <div className="SignUpWrapper">
          <div className='SignUpCard'>
              <Card variant="outlined">
                <div className='logoInsta'>
                    <img src={insta}/>
                </div>
                <CardContent>
                  <Typography  className={classes.text1} variant="Subtitle1" component="div" >
                    Sign up to see photos and videos from your friends
                  </Typography>
                 
                   {error!=='' && <Alert severity="error"  margin="dense">{error}</Alert>}
                   <TextField id="outlined-basic" label="Email" variant="outlined" margin="dense" size='small'  fullWidth={true} value={email} onChange={(e)=>setemail(e.target.value)}/>
                   <TextField id="outlined-basic" label="Password" variant="outlined" margin="dense" size='small'  fullWidth={true} value={password} onChange={(e)=>setpassword(e.target.value)} />
                   <TextField id="outlined-basic" label="Fullname" variant="outlined" margin="dense" size='small'  fullWidth={true} value={fullname} onChange={(e)=>setfullname(e.target.value)}/>
                   <Button color="secondary" fullWidth={true} variant="outlined" margin="dense" size="small" startIcon={<CloudUploadicon/>} component="label">
                Upload Profile
                <input type="file" accept='image/*' hidden onChange={(e)=>setfile(e.target.files[0])}/>
                </Button>
                </CardContent>
                <CardActions>
                  <Button color="primary" fullWidth={true} variant="contained" margin="dense" disabled={loading} onClick={signupHandle} > Sign up</Button>
                </CardActions>
                <CardContent>
                  <Typography  className={classes.text1} variant="Subtitle1" component="div" >
                    By signing up, you agree to our Terms, Conditions and Cookies policy. 
                  </Typography>
                </CardContent>
            </Card>
            <Card variant="outlined" className={classes.Card2}>
            <CardContent>
                  <Typography  className={classes.text1} variant="Subtitle1" component="div" >
                    Having an account?<Link to="/Login" style={{textDecoration:'none'}}>Login</Link>
                  </Typography>
                </CardContent>
            </Card>
          </div>
      </div>


   
  );
}