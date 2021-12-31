import React ,{useState,useEffect}from 'react';
import Button from '@mui/material/Button';
import MovieIcon from '@material-ui/icons/Movie' ;
import Alert from '@mui/material/Alert';
import LinearProgress from '@mui/material/LinearProgress';
import { async } from '@firebase/util';
import {v4 as uuidv4} from 'uuid';
import { database, storage } from '../firebase';
function UploadFile(props) {
    const [error,seterror]=useState('');
    const [loading,setloading]=useState(false);
    let handlepost=async(file)=>{
        console.log(file);
        if(file==null)
        {
            seterror("Please select file");
            setTimeout(()=>{
                seterror('');
            },3000)
            return;
        }
        if(file.size/(1024*1024)>100)
        {
            seterror("File size greater than 100 mb");
            setTimeout(()=>{
                seterror('');
            },3000)
            file=null;
            return;
        }
        setloading(true);
        let uid=uuidv4();
        let uploadTask=storage.ref(`/Post/${uid}/${file.name}`).put(file);
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
               let obj={
                   Likes:[],
                   Comment:[],
                   pid:uid,
                   pUrl:url,
                   Uname:props.user.name ,
                   Purl:props.user.profileurl,
                   userId:props.user.userId,
                   createdAT:database.getTimeStamp()
               }
               database.posts.add(obj).then(async(ref)=>{
                let res=await database.users.doc(props.user.userId).update({
                    postIds:props.user.postIds!=null?[...props.user.postIds,ref.id]:[]
                })
               }).then(()=>{
                   setloading(false);
               }).catch((er)=>{
                   seterror(er.message);
                   setTimeout(()=>{
                       seterror('');
                   },3000)
               })
           })
           setloading(false);
           
       }
    }
    return (
        <div>{
            error!=''? <Alert severity="error">{error}</Alert>:
            <>
                <input type="file" id="upload-input" accept='video/*' style={{display:"none"}} onChange={(e)=>{handlepost(e.target.files[0])}}/>
                <label htmlFor='upload-input'>
                    <Button variant="outlined" color="secondary" component="span" >
                <MovieIcon/>&nbsp;Upload Video
                    </Button>
                </label>
                {loading && <LinearProgress color="secondary" /> }
            </>
            }
        </div>
    )
}

export default UploadFile
