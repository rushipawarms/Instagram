import * as React from 'react';
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
import CloudUploadicon from '@material-ui/icons/CloudUpload'
import { Link } from 'react-router-dom'
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
                 
                   {true && <Alert severity="error"  margin="dense">This is an error alert — check it out!</Alert>}
                   <TextField id="outlined-basic" label="Email" variant="outlined" margin="dense" size='small'  fullWidth={true}/>
                   <TextField id="outlined-basic" label="Password" variant="outlined" margin="dense" size='small'  fullWidth={true} />
                   <TextField id="outlined-basic" label="Fullname" variant="outlined" margin="dense" size='small'  fullWidth={true}/>
                   <Button color="secondary" fullWidth={true} variant="outlined" margin="dense" size="small" statrtIcon={<CloudUploadicon/>} component="label">
                Upload Profile
                <input type="file" accept='image/*' hidden/>
                </Button>
                </CardContent>
                <CardActions>
                  <Button color="primary" fullWidth={true} variant="contained" margin="dense" > Sign up</Button>
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