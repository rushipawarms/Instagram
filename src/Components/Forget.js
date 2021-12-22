import * as React from 'react';
import { useContext,useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Login.css'
import lock from './images/lock.png'
import insta from './images/logo.png';
import { makeStyles } from '@material-ui/core';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import CloudUploadicon from '@material-ui/icons/CloudUpload'
import { Link ,useNavigate} from 'react-router-dom'
import { context } from '../Context/AuthContext';
import { async } from '@firebase/util';

export default function Forget() {
    const [email,setemail]=useState('');
  const [password,setpassword]=useState('');
  const [fullname , setfullname]=useState('');
  const[file,setfile]=useState(null);
  const[error,seterror]=useState('');
  const [loading,setloading]=useState(false);
  const navigate = useNavigate();
    const {login}=useContext(context);
    const {forgetPassword}=useContext(context)
  const useStyle=makeStyles({
    text1:{
      marginBottom:"1rem",
      color:"grey",
      textAlign:"center"
    },
    Card2:{
      height:"3rem",
      marginTop:'2%'
    },
    text2:{
        textAlign:'center',
        display: "flex",
        justifyContent:'center'
        
    }
  })
  const classes=useStyle();
  let HandleLink=async()=>{
      try{
        setloading(true);
       forgetPassword(email).then((obj)=>{
        setloading(false);
        navigate('/Login');
       }).catch((err)=>{
        seterror(err);
        setTimeout(() => {
          seterror('');
        }, 3000);
       })
        setloading(false);
        navigate('/Login');
      }
      catch(err){
        seterror(err);
        setTimeout(() => {
          seterror('');
        }, 3000);
        setloading(false);
      }
  }
  return (
      <div className="LogInWrapper">
          <div className='LogInCard'>
              <Card variant="outlined">
                <div className='logoLock'>
                    <img src={lock}/>
                </div>
                <CardContent>
                  
                 
                   {error!=='' && <Alert severity="error"  margin="dense">{error}</Alert>}
                   <Typography  className={classes.text1} variant="Subtitle1" component="div" >
                   Enter your mail and we will send you link to reset your password
                  </Typography>
                   <TextField id="outlined-basic" label="Email" variant="outlined" margin="dense" size='small'  fullWidth={true}value={email} onChange={(e)=>setemail(e.target.value)} />
                 
                </CardContent>
                <CardActions>
                  <Button color="primary" fullWidth={true} variant="contained" margin="dense" disabled={loading} onClick={HandleLink}  > Send Link</Button>
                </CardActions>
                
            </Card>
            <Card variant="outlined" className={classes.Card2}>
            <CardContent>
                  <Typography  className={classes.text1} variant="Subtitle1" component="div" >
                    Or <Link to="/Signup" style={{textDecoration:'none'}}>create new account</Link>
                  </Typography>
                </CardContent>
            </Card>
          </div>
      </div>

  );
}