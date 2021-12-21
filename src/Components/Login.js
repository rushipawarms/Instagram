import * as React from 'react';
import { useContext } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './Login.css'
import insta from './images/logo.png';
import { makeStyles } from '@material-ui/core';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import CloudUploadicon from '@material-ui/icons/CloudUpload'
import { Link } from 'react-router-dom'
import { context } from '../Context/AuthContext';
export default function Login() {
    const store=useContext(context);
    console.log(store);
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
  return (
      <div className="LogInWrapper">
          <div className='LogInCard'>
              <Card variant="outlined">
                <div className='logoInsta'>
                    <img src={insta}/>
                </div>
                <CardContent>
                  
                 
                   {true && <Alert severity="error"  margin="dense">This is an error alert — check it out!</Alert>}
                   <TextField id="outlined-basic" label="Email" variant="outlined" margin="dense" size='small'  fullWidth={true}/>
                   <TextField id="outlined-basic" label="Password" variant="outlined" margin="dense" size='small'  fullWidth={true} />
                   <Typography color="primary" className={classes.text2} variant="Subtitle1"  >
                       Forget Password?
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button color="primary" fullWidth={true} variant="contained" margin="dense" > Log In</Button>
                </CardActions>
                
            </Card>
            <Card variant="outlined" className={classes.Card2}>
            <CardContent>
                  <Typography  className={classes.text1} variant="Subtitle1" component="div" >
                    Dont have an account?<Link to="/Signup" style={{textDecoration:'none'}}>Sign Up</Link>
                  </Typography>
                </CardContent>
            </Card>
          </div>
      </div>

  );
}