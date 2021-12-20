import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './FirstPage.css'
import insta from './images/logo.png';
import Meta from './images/Meta.png'
import { makeStyles } from '@material-ui/core';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';

import { Link } from 'react-router-dom'
export default function FirstPage() {
  const useStyle=makeStyles({
    text1:{
      marginBottom:"1rem",
      color:"grey",
      textAlign:"center"
    },
    Card2:{
     
      marginTop:'75%'
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
              <Card  style={{ border: "none", boxShadow: "none" }}>
                <div className='logoInsta'>
                    <img src={insta}/>
                </div>
                <CardContent>
                  
                <Typography  className={classes.text1} variant="Subtitle1" component="div" >
                   Find what inspires you
                  </Typography>
                   
                  <CardContent>
                  <Typography  className={classes.text1} variant="Subtitle1" component="div" >
                  <CardActions>
                  <Button color="primary" fullWidth={true} variant="contained" margin="dense" ><Link to="/Login" style={{textDecoration:'none',color:'white'}}>Log In</Link> </Button>
                </CardActions>
                 or <Link to="/Signup" style={{textDecoration:'none'}}>Sign Up</Link>
                  </Typography>
                </CardContent>
                </CardContent>
                
                
            </Card>
            <Card  style={{ border: "none", boxShadow: "none" }} className={classes.Card2}>
            <Typography  className={classes.text1} variant="Subtitle1" component="div" >
                  From
            </Typography>
            <div className='logometa'>
                    <img src={Meta} height="40" width="150" />
                </div>
            </Card>
          </div>
      </div>

  );
}