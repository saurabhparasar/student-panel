import React, {Component} from "react";
import { Card,Button,Container,Row,Col } from 'react-bootstrap';
import ReactCrop from 'react-image-crop';
import Style from './doubt.module.css';
import 'react-image-crop/dist/ReactCrop.css';
import Config from '../../config.json';


class studentdoubt extends Component{
 constructor(){
     super();
     let data=localStorage.getItem("userdetail");
     data= JSON.parse(data);
     this.handleClick = this.handleClick.bind(this);
    this.state={
      crop: {
        unit: "%",
        width: 80,
        height:50,
        x: 10,
        y: 20,
    },
       isUpload:false,
       isCrop:false,
       isNotfound:false,
       ques_text:'',
       ques_image:null,
       ques_url:null,
       cropques_url:null,
       img:null,
       token:data.token,
       student:data.username,
    }}
    onTextClick=()=>{
      this.setState({isCamera:true})
    }

    onUploadClick=(event)=>{
      const file=event.target.files[0];
      const url=URL.createObjectURL(file);
      console.log(url);
     this.setState({ques_image:file,
      ques_url:url,
      isUpload:true});

    }

    onCropChange = (crop) => {
      this.setState({ crop });

  }
  onImageLoaded = image => {
    this.setState({img:image});
}

  getCroppedImg=()=> {

    const canvas = document.createElement('canvas');
    const scaleX = this.state.img.naturalWidth / this.state.img.width;
    const scaleY = this.state.img.naturalHeight / this.state.img.height;
    canvas.width = this.state.crop.width;
    canvas.height = this.state.crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      this.state.img,
      this.state.crop.x * scaleX,
      this.state.crop.y * scaleY,
      this.state.crop.width * scaleX,
      this.state.crop.height * scaleY,
      0,
      0,
      this.state.crop.width,
      this.state.crop.height,
    );
    const base64Image = canvas.toDataURL('image/jpeg');

         this.setState({cropques_url:base64Image,
                        isCrop:true,
                        isUpload:false});


                        let arr = base64Image.split(','),
                            mime = arr[0].match(/:(.*?);/)[1],
                            bstr = atob(arr[1]),
                            n = bstr.length,
                            u8arr = new Uint8Array(n);

                        while(n--){
                            u8arr[n] = bstr.charCodeAt(n);
                        }
                        let croppedImage = new File([u8arr], "default", {type:mime});
                        console.log(croppedImage);
                        var formdata = new FormData();
                        formdata.append("student_username", this.state.student);
                          formdata.append("query_image", croppedImage);
                          var requestOptions = {
                            method: 'POST',
                            body: formdata,
                            redirect: 'follow',
                            headers:{
                                'Authorization': 'Token '+ this.state.token
                            },
                          };
                          fetch(Config.SERVER_URL+'student/get-solution/', requestOptions)
                          .then(response => response.json())
                          .then(data => {console.log(data)
                            if(data.Success){
                              this.setState({
                                isNotfound:true,
                                isCrop:false,
                                isUpload:false,
                              });
                            }
                            else{
                              this.props.history.push(
                                {  pathname:'/student/doubtsolutions',
                                   state:{ question:croppedImage,
                                            solutions:data,
                                            search_type:"image",

                                   },
                              }
                              )

                            }
                          })
                          .catch(error => {alert("Try Searching SomeOther Image");
                          window.location.reload();
                        });
}
backupload=()=>{
  this.setState({isUpload:false,
                  isCrop:false,
                  isNotfound:false,
                });
}
backcrop=()=>{
  this.setState({isUpload:true,
                  isCrop:false,
                  isNotfound:false,
                });
}
// dataURLtoFile=()=> {
//   let arr = this.state.cropques_url.split(','),
//       mime = arr[0].match(/:(.*?);/)[1],
//       bstr = atob(arr[1]),
//       n = bstr.length,
//       u8arr = new Uint8Array(n);
//
//   while(n--){
//       u8arr[n] = bstr.charCodeAt(n);
//   }
//   let croppedImage = new File([u8arr], "default", {type:mime});
//   console.log(croppedImage);
//   var formdata = new FormData();
//   formdata.append("student_username", this.state.student);
//     formdata.append("query_image", croppedImage);
//     var requestOptions = {
//       method: 'POST',
//       body: formdata,
//       redirect: 'follow',
//       headers:{
//           'Authorization': 'Token '+ this.state.token
//       },
//     };
//     fetch(Config.SERVER_URL+'student/get-solution/', requestOptions)
//     .then(response => response.json())
//     .then(data => {console.log(data)
//       if(data.Success){
//         alert('We will contact you in 5-6 hours with a solution');
//       }
//       else{
//         this.props.history.push(
//           {  pathname:'/student/doubtsolutions',
//              state:{ question:croppedImage,
//                       solutions:data,
//                       search_type:"image",
//
//              },
//         }
//         )
//
//       }
//     })
//     .catch(error => alert("try Selecting someother Image"));
//
// }

searchedtext=(event)=>{
  let variable = event.target.value;
  this.setState({
    ques_text:variable,
  });
}
onSubmitHandler=(e)=>{
  e.preventDefault();
  this.setState({
                    isUpload:false,
                    isCrop:true,
                    isNotfound:false,
  });
  var formdata = new FormData();
  formdata.append("student_username", this.state.student);
    formdata.append("question_text", this.state.ques_text);
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
      headers:{
          'Authorization': 'Token '+ this.state.token
      },
    };
    fetch(Config.SERVER_URL+'student/student-queries-text/', requestOptions)
    .then(response => response.json())
    .then(data => {console.log(data)
      if(data.Success){
        this.setState({
          isNotfound:true,
          isCrop:false,
          isUpload:false,
        });
      }
      else{
        this.props.history.push(
          {  pathname:'/student/doubtsolutions',
             state:{ question:this.state.ques_text,
                      solutions:data,
                      search_type:"text",
             },
        }
        )

      }
    })
    .catch(error => {alert("Try Searching SomeOther Image");
    window.location.reload();
  });

}
handleClick=(e)=> {
  this.refs.fileUploader.click();
}
   render(){
     var text1={
       fontFamily:'Montserrat',
fontStyle: 'normal',
fontWeight: 'bold',
fontSize: '40px',
marginLeft:'20px',
marginTop:'20px',
color: '#272C49',
lineHeight: '90.2%',
     }
     var text2={
       fontFamily:'Montserrat',
fontStyle: 'normal',
fontWeight: 'bold',
fontSize: '25px',
marginLeft:'20px',
color: '#272C49',
     }
     var box1={
       padding:'20px',
       background:'linear-gradient(90.18deg, #FEB683 2.43%, #FF8993 99.83%)',
       borderRadius:'5px',
       margin:'20px',
       cursor:'pointer'
     }
     var box2={
       padding:'20px',
       background:'linear-gradient(246.8deg, #C4C4C4 -5.42%, #293E80 -5.41%, #09AEE5 96.08%)',
       borderRadius:'5px',
       margin:'20px',
        cursor:'pointer'
     }
     var btn1={
       background: '#1C3687',
       border: 'none',
       marginTop: '10px',
       padding: '10px',
       borderRadius: '5px',
       fontWeight: 'bold',
       width:'200px',
       color:'white',
       borderRadius:'34px',
     }
     var btn2={
       background: '#EB7926',
       border: 'none',
       marginTop: '10px',
       padding: '10px',
       borderRadius: '5px',
       fontWeight: 'bold',
       width:'200px',
       color:'white',
       borderRadius:'34px',
       
     }
     var searchContainer={
       background:'#1C3687',
   display: 'inline-flex',
   flex: '1 1 300px',
   position: 'relative',
   borderRadius: '9px',
   overflow: 'hidden',
   width:'100%',
   outline:'none',
   padding:'7.3px',
 }

 var searchIcon={
   padding: '0.5rem 0.5rem 0 0.5rem',
   color:'white',
   fontSize:'18px'
 }

 var searchBox={
   background:'#1C3687',
   border: '0',
   padding: '0rem 0.5rem 0.5rem 1rem',
   flex: '1',
   boxShadow:'none',
 }

 var searchButton={
   background: 'none',
   border: '0',
   color: 'white',
   padding: '0.5rem',
   borderRadius: '39px',
   margin:'-5px 0 0 30px',
   fontWeight:'bold',
   fontSize:'16px',


 }
    if(this.state.isUpload){
      return(
        <div>
        <div class="container" style={{marginTop:'50px'}}>
        <p className={Style.quesheading}> Crop Image</p>
          <div className="row" style={{marginTop:'10px'}}>
          <div class="col-sm-12">

          </div>

          </div>
          <div class="row" style={{marginTop:'50px'}}>
          <div class="col-sm-6">
          <ReactCrop id={Style.img2} style={{height:'100%auto', width:'350px'}} onImageLoaded={this.onImageLoaded} src={this.state.ques_url} crop={this.state.crop} onChange={this.onCropChange}
          minHeight={100}
          minWidth={200}/>

          </div>
          <div class="col-sm-3">
            <div className={Style.cropbtn}>
          <Button style={btn1} variant="outline-info" onClick={this.getCroppedImg}>Submit</Button>
          </div>
          </div>
          <div class="col-sm-3">
          <div className={Style.cropbtn}>
          <Button style={btn2} variant="outline-danger" onClick={this.backupload}>Back</Button>
        {/*  <p>Crop the image such that only one question is selected
        in the cropped image.</p>
          */}
          </div>
          </div>
         </div>
         </div>
         </div>

      );
    }
    if(this.state.isCrop){
     return(<div>
       <div class="container">
       <center>
       <div class="box" style={{marginTop:'100px', borderRadius:'17px', boxShadow: '0px -2px 15px rgba(0, 0, 0, 0.15)', width:'50%', padding:'10px'}}>
       <svg width="auto" height="150" viewBox="0 0 214 214" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
     <rect width="214" height="214" fill="url(#pattern0)"/>
     <defs>
     <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
     <use xlinkHref="#image0" transform="scale(0.0015625)"/>
     </pattern>
     <image id="image0" width="640" height="640" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAoAAAAKACAYAAAAMzckjAAAgAElEQVR4Xu3deZRmdXkn8Kequrqru3qvgiAOxhGMoFFQ6AbSuEDSSMKEg0AIQreJHIcsTmIMGkMSMxFjEpMY0WwnJsEFGgm2hoMhYZmwuKRZ7EaFiIgaM0xcoKt676peqmrOrbENMCD1u/3et96q53P/6T+8z/3d5/P8Dufrfet9b9fExMREOAgQIECAAAECBNIIdAmAaWatUQIECBAgQIDApIAAaCMQIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJBq5dAgQIECBAgIAAaA8QIECAAAECBJIJCIDJ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EphVAjs+9bYYuf+vZ1VPmZupfgZm8GerN7nU+z3BzHZ6JzBbBATA2TJJfRBoUGDy3b8fPbnBFVy6nQILV70zFhz3xnYuaS0CBDpMQADssIG4HQKdKrD7vvfHzn/5nU69Pfc1RYHew1bEstf8Q0R37xQrnEaAwGwUEABn41T1RKAhgdEH18WOz7w9JvZubWgFl21SYM7gi2LZOf8UXb0Lm1zGtQkQmAECAuAMGJJbJNBJAhOjQzHy4LrY8/UbY9+37+2kW3MvTyXQ0xdzlh8d84++IOa/cG3EnPmcCBAgEAKgTUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAgKgPUCAAAECBAgQSCYgACYbuHYJECBAgAABAv8XQj1lgFfRS+IAAAAASUVORK5CYII="/>
     </defs>
     </svg>
     <p style={{color:'#6F6F6F', fontSize:'18px',fontFamily: 'Montserrat'}}>Finding your Solution</p>
       </div>

     </center>

     </div>
</div>

      )
    }
    if(this.state.isNotfound){
     return(<div>
       <div class="container">

       <center>
       <div class="box" style={{marginTop:'100px', borderRadius:'17px', boxShadow: '0px -2px 15px rgba(0, 0, 0, 0.15)', width:'70%', padding:'10px'}}>
       <svg width="126" height="116" viewBox="0 0 126 116" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
       <rect width="126" height="116" fill="url(#pattern0)"/>
       <defs>
       <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
       <use xlinkHref="#image0" transform="translate(0 -0.0431034) scale(0.0025 0.00271552)"/>
       </pattern>
       <image id="image0" width="400" height="400" xlinkHref="data:image/png;base64,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"/>
       </defs>
       </svg>

       <p style={{color:'#6F6F6F', fontSize:'18px',fontFamily: 'Montserrat'}}>We currently do not have any matching solution to this question. Don't worry! Our teachers are working on your doubt and will send you the solution within 6 hours</p>
       </div>
       <div className={Style.cropbtn}>
       <Button style={btn2} variant="outline-danger" onClick={this.backupload}>Search Another Question</Button>
       </div>
       </center>



     </div>
</div>

      )
    }
    return(
      <div id={Style.doubtform}>




        <div className="container" style={{marginTop:'10vh', background:'#FFF1E8', borderRadius:'23px', paddingBottom:'20px'}}>











        <p style={text1}>Have a Doubt? </p>
        <p style={text2}>Post it Here! </p>

          <div className="row" style={{marginTop:'50px'}}>
          <div class="col-md-4">
          <input type="file" accept="image/*" ref="fileUploader" style={{display: "none"}} onChange={this.onUploadClick}/>
          <div onClick={this.handleClick}>


<button id={Style.button1}>
<svg style={{display:'inline-block', margin:'-1px 0px 0 10px'}} width="30" height="30" viewBox="0 0 48 39" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M46.403 6.84052C45.4449 5.83672 44.1217 5.24356 42.616 5.24356H35.0418V5.15231C35.0418 4.01162 34.5856 2.91657 33.8099 2.18653C33.0342 1.41086 31.9848 0.95459 30.8441 0.95459H17.1559C15.9696 0.95459 14.9202 1.41086 14.1445 2.18653C13.3688 2.96219 12.9125 4.01162 12.9125 5.15231V5.24356H5.38403C3.87833 5.24356 2.55513 5.83672 1.59696 6.84052C0.638783 7.7987 0 9.16752 0 10.6276V33.35C0 34.8557 0.593156 36.1789 1.59696 37.1371C2.55513 38.0953 3.92395 38.7341 5.38403 38.7341H42.616C44.1217 38.7341 45.4449 38.1409 46.403 37.1371C47.3612 36.1789 48 34.8101 48 33.35V10.6276C48 9.12189 47.4068 7.7987 46.403 6.84052ZM45.6274 33.35H45.5817C45.5817 34.1713 45.2624 34.9014 44.7148 35.4489C44.1673 35.9964 43.4373 36.3158 42.616 36.3158H5.38403C4.56274 36.3158 3.8327 35.9964 3.28517 35.4489C2.73764 34.9014 2.41825 34.1713 2.41825 33.35V10.6276C2.41825 9.8063 2.73764 9.07626 3.28517 8.52873C3.8327 7.9812 4.56274 7.66181 5.38403 7.66181H14.1901C14.8745 7.66181 15.4221 7.11429 15.4221 6.42988V5.10668C15.4221 4.60478 15.6046 4.14851 15.924 3.82911C16.2433 3.50972 16.6996 3.32721 17.2015 3.32721H30.8441C31.346 3.32721 31.8023 3.50972 32.1217 3.82911C32.4411 4.14851 32.6236 4.60478 32.6236 5.10668V6.42988C32.6236 7.11429 33.1711 7.66181 33.8555 7.66181H42.6616C43.4829 7.66181 44.2129 7.9812 44.7605 8.52873C45.308 9.07626 45.6274 9.8063 45.6274 10.6276V33.35Z" fill="white"/>
<path d="M23.9997 10.7646C20.8971 10.7646 18.0682 12.0422 16.0606 14.0498C14.0073 16.1031 12.7754 18.8863 12.7754 21.989C12.7754 25.0917 14.053 27.9205 16.0606 29.9282C18.1138 31.9814 20.8971 33.2133 23.9997 33.2133C27.1024 33.2133 29.9313 31.9358 31.9389 29.9282C33.9921 27.8749 35.2241 25.0917 35.2241 21.989C35.2241 18.8863 33.9465 16.0574 31.9389 14.0498C29.9313 12.0422 27.1024 10.7646 23.9997 10.7646ZM30.205 28.2399C28.6081 29.7913 26.418 30.7951 23.9997 30.7951C21.5815 30.7951 19.3914 29.7913 17.7944 28.2399C16.1974 26.643 15.2393 24.4529 15.2393 22.0346C15.2393 19.6164 16.2431 17.4262 17.7944 15.8293C19.3914 14.2323 21.5815 13.2742 23.9997 13.2742C26.418 13.2742 28.6081 14.278 30.205 15.8293C31.802 17.4262 32.7602 19.6164 32.7602 22.0346C32.8058 24.4529 31.802 26.643 30.205 28.2399Z" fill="white"/>
<path d="M40.2436 15.1905C41.4783 15.1905 42.4793 14.1895 42.4793 12.9547C42.4793 11.72 41.4783 10.719 40.2436 10.719C39.0088 10.719 38.0078 11.72 38.0078 12.9547C38.0078 14.1895 39.0088 15.1905 40.2436 15.1905Z" fill="white"/>
</svg>
<p>Upload Your Doubt Here</p>
</button>
            </div>
          </div>
          <div class="col-md-4">
          <form onSubmit={this.onSubmitHandler}>
          <div style={searchContainer}>

          <input style={searchBox} id={Style.searchbox} class="form-control" onChange={this.searchedtext} type="text" name="search" placeholder="Type Your Question Here"/>
          <button type="submit" style={searchButton}><i class="fa fa-search" style={searchIcon}></i></button>
          </div>
          </form>
          </div>
          <div class="col-md-4">
          <svg id={Style.img1} style={{margin:'-130px 0px 0px 15px'}} width="100%auto" height="300" viewBox="0 0 265 407" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M44.6559 26.9586C43.5181 28.9847 44.7567 31.4135 46.9558 32.1645C49.1606 32.9173 51.5618 31.6137 53.3596 30.1318C54.8291 28.9206 57.0532 28.0913 60.2564 29.159C63.8465 30.3234 64.9139 33.3313 65.1079 35.466C65.302 37.8918 64.1376 40.2205 62.294 41.676C62.0045 41.9128 61.6865 42.1354 61.3406 42.3365C56.6853 45.0425 49.9163 46.3219 48.1559 51.4107L46.6713 55.7022C45.9215 57.8695 47.071 60.2342 49.2384 60.9834C51.4097 61.734 53.7778 60.5785 54.5224 58.4051L55.1958 56.4395C56.1179 53.7479 58.7916 52.0415 61.5542 51.361C65.3926 50.4154 70.5258 47.8035 72.9674 40.7057C76.9457 29.062 67.5337 22.7549 63.0703 21.2025C59.9403 20.0722 50.0328 17.3839 44.6559 26.9586Z" fill="#EB7926"/>
<path d="M48.1856 64.7791L47.6353 64.589C45.5839 63.8802 43.3463 64.9685 42.6374 67.0199C41.9286 69.0714 43.017 71.309 45.0684 72.0178L45.6187 72.208C47.6701 72.9168 49.9077 71.8284 50.6165 69.777C51.3254 67.7256 50.237 65.488 48.1856 64.7791Z" fill="#EB7926"/>
<path d="M0.0461635 136.429C0.174632 137.755 1.55649 138.49 2.83621 138.117C4.12788 137.74 4.82178 136.315 5.18166 135.019C5.47144 133.975 6.24178 132.863 8.09118 132.29C10.2259 131.611 11.6813 132.678 12.4576 133.649C13.3309 134.716 13.622 136.171 13.2338 137.53C13.1762 137.76 13.095 137.993 12.9881 138.223C11.6941 141.011 8.95652 143.797 9.80448 146.751L10.5328 149.288C10.8981 150.561 12.2316 151.291 13.5006 150.913C14.7506 150.541 15.4683 149.232 15.1099 147.977L14.7763 146.81C14.325 145.23 15.0244 143.538 16.0927 142.29C17.5636 140.572 19.079 137.64 17.8913 133.455C15.9507 126.662 9.35259 126.856 6.73275 127.633C4.99406 128.154 -0.561179 130.156 0.0461635 136.429Z" fill="#EB7926"/>
<path d="M14.199 153.013L13.9194 153.094C12.7097 153.444 12.0127 154.708 12.3627 155.918C12.7126 157.128 13.977 157.825 15.1867 157.475L15.4664 157.394C16.6761 157.044 17.373 155.78 17.0231 154.57C16.6731 153.36 15.4087 152.663 14.199 153.013Z" fill="#EB7926"/>
<path d="M208.237 129.556C208.65 127.561 206.978 125.856 204.941 125.802C202.895 125.748 201.219 127.468 200.107 129.186C199.19 130.604 197.534 131.915 194.547 131.915C191.151 131.915 189.501 129.586 188.822 127.937C188.046 125.996 188.337 123.764 189.501 121.921C189.693 121.633 189.913 121.35 190.164 121.078C193.377 117.601 198.749 114.739 198.887 110.006L199 106.116C199.059 104.075 197.45 102.374 195.409 102.32C193.377 102.267 191.684 103.867 191.624 105.899L191.57 107.732C191.494 110.257 189.675 112.407 187.517 113.72C184.543 115.53 180.938 119.082 180.769 125.705C180.478 136.572 190.181 139.386 194.256 139.483C197.215 139.483 206.265 139.093 208.237 129.556Z" fill="#EB7926"/>
<path d="M195.259 98.7874L195.744 98.8008C197.672 98.854 199.279 97.3339 199.332 95.4055C199.385 93.4771 197.865 91.8706 195.936 91.8173L195.452 91.804C193.523 91.7507 191.917 93.2708 191.863 95.1992C191.81 97.1277 193.33 98.7341 195.259 98.7874Z" fill="#EB7926"/>
<path d="M270.798 106.081C270.517 106.237 270.17 106.099 270.101 105.785C266.813 90.6685 251.705 45.2049 189.21 47.7889C157.772 49.1473 140.404 63.9931 131.38 76.219C121.903 89.0738 119.322 101.838 119.162 102.754C119.156 102.789 119.149 102.823 119.141 102.858C119.091 103.055 118.914 103.194 118.711 103.194H84.4168C84.1488 103.194 83.9316 102.976 83.9316 102.708C83.9316 102.614 83.9316 88.9553 85.386 81.6408C85.4388 81.3757 85.6969 81.2101 85.9619 81.2631C86.2328 81.3173 86.407 81.5804 86.3537 81.8514C85.821 84.558 85.4963 88.1518 85.2917 91.5871C84.9493 97.3351 89.6908 102.126 95.449 102.126H103.574C112.084 102.126 119.358 96.0665 122.938 88.3454C124.764 84.4075 127.224 79.9865 130.507 75.5398C139.627 63.1198 157.287 47.983 189.113 46.6245C215.118 45.5572 235.882 52.6405 250.825 67.6803C264.135 81.0857 269.224 97.0424 271.034 105.573C271.077 105.777 270.98 105.979 270.798 106.081Z" fill="#EB7926"/>
<path d="M212.012 331.216H182.519C169.816 331.216 159.519 320.919 159.519 308.216V182.282C159.519 181.973 159.796 181.738 160.101 181.789C209.684 190.521 231.225 168.592 239.666 154.717C249.563 138.319 251.31 118.524 244.324 101.835C239.957 91.5498 226.373 67.5832 193.188 68.1654C176.984 68.4565 155.152 73.5991 143.314 96.4014C136.231 110.083 136.134 123.861 136.134 123.958C136.134 124.226 135.917 124.443 135.649 124.443H70.7353C70.4674 124.443 70.2502 124.226 70.2502 123.958C70.1531 118.427 70.2502 99.6034 70.2502 99.4093C70.2502 99.0984 70.5198 98.856 70.829 98.8892L74.7596 99.3103C76.8304 99.5322 78.4008 101.28 78.4008 103.362V105.389C78.4008 108.89 81.2429 111.726 84.7442 111.719L107.13 111.674C118.076 111.651 127.237 103.739 131.896 93.8341C133.412 90.6096 135.285 87.1914 137.59 83.7873C146.225 71.0763 162.624 55.9395 192.218 55.9395C192.509 55.9395 192.897 55.9395 193.188 55.9395C214.826 56.1335 232.68 63.799 244.809 77.9655C257.369 92.5719 261.543 111.728 260.155 124.913C260.038 126.027 259.93 127.125 259.827 128.24C259.213 134.881 255.608 159.976 235.882 177.519C224.816 187.371 210.559 193.234 193.373 195.076C180.385 196.468 169.125 206.399 169.125 219.461V236.854C169.125 239.56 171.319 241.754 174.025 241.754C176.731 241.754 178.925 239.56 178.925 236.854V205.173C178.925 204.905 179.142 204.688 179.41 204.688C179.507 204.688 191.345 205.658 205.802 202.65C219.096 199.933 237.532 193.141 249.466 176.646C270.813 146.955 271.104 130.168 271.298 117.845C271.298 116.875 271.298 115.905 271.395 114.934C271.342 113.611 272.401 112.509 273.726 112.509H285.368C285.636 112.509 285.853 112.726 285.853 112.994C285.853 113.285 288.182 143.558 262.954 177.616C247.378 198.576 229.135 212.105 211.623 215.843C211.355 215.9 211.096 215.726 211.042 215.458C210.988 215.19 211.16 214.93 211.427 214.874C228.746 211.231 246.795 197.8 262.177 177.034C280.313 152.653 284.092 130.197 284.829 119.579C285.061 116.24 282.311 113.576 278.963 113.576H273.824C273.035 113.576 272.41 114.244 272.463 115.031C272.463 116.002 272.463 116.972 272.366 117.942C272.172 130.362 271.978 147.343 250.437 177.228C238.308 194.015 219.678 200.807 206.191 203.621C203.768 204.112 201.421 204.498 199.189 204.799C188.901 206.187 179.992 214.522 179.992 224.903V236.854C179.992 240.096 177.364 242.724 174.122 242.724C170.88 242.724 168.251 240.096 168.251 236.854V194.694C168.251 194.426 168.469 194.209 168.737 194.209C197.07 196.731 219.387 190.813 235.203 176.84C257.714 156.852 258.975 126.869 258.975 126.578C260.819 113.576 256.938 93.6845 244.033 78.6447C232.001 64.7693 214.438 57.2009 193.091 57.0068C163.303 56.7157 146.905 71.6585 138.366 84.3695C129.46 97.5428 127.029 110.893 126.748 112.126C126.732 112.192 126.713 112.253 126.697 112.319C126.655 112.488 126.504 112.606 126.33 112.606L83.7857 112.69C80.2242 112.697 77.3334 109.812 77.3334 106.25V103.261C77.3334 101.676 76.1408 100.346 74.566 100.174C72.7285 99.973 71.1199 101.412 71.1126 103.26C71.103 105.709 71.0895 108.997 71.0834 112.283C71.0722 118.387 76.0151 123.279 82.1197 123.279H112.903C125.274 123.279 135.143 113.219 139.614 101.684C140.362 99.7548 141.233 97.787 142.247 95.8192C148.845 83.0111 163.012 67.5832 192.897 67.001C193.285 67.001 193.674 67.001 194.062 67.001C226.955 67.001 240.54 90.9677 244.906 101.35C252.086 118.33 250.243 138.513 240.151 155.105C232.971 166.943 216.282 184.7 181.254 184.7C170.211 184.7 160.198 192.889 160.198 203.931V307.149C160.198 319.852 170.495 330.149 183.198 330.149H211.188C211.482 330.149 211.721 330.388 211.721 330.683V330.925C211.721 331.086 211.852 331.216 212.012 331.216Z" fill="#EB7926"/>
<path d="M225.597 330.731C225.061 330.731 224.627 330.297 224.627 329.761V243.754C224.627 243.548 224.767 243.368 224.967 243.318C224.999 243.31 225.014 243.306 225.046 243.296C226.009 242.995 248.406 236.874 270.522 218.952C291.287 202.165 315.933 171.309 315.933 119.495C315.933 78.8389 299.438 46.1395 268.388 24.9867C242.674 7.52113 211.819 1.31115 193.189 1.31115C166.092 1.31115 101.109 8.11371 78.4175 70.6646C77.8146 72.3265 77.271 74.0716 76.8025 75.7763C75.9114 79.0187 74.4187 84.891 73.6121 90.7899C73.5764 91.0511 73.3408 91.238 73.0785 91.2118C72.805 91.1844 72.608 90.9368 72.6449 90.6644C73.4626 84.6335 74.9803 78.6341 75.8659 75.3885C76.3129 73.7503 76.8337 72.0695 77.4109 70.4726C100.262 7.24919 165.787 0.437866 193.189 0.437866C212.013 0.437866 243.063 6.64785 268.97 24.3075C300.408 45.6543 317 78.6449 317 119.592C317 171.795 292.063 202.942 271.202 219.825C260.772 228.284 250.272 234.124 241.952 237.97C232.599 242.294 225.694 251.299 225.694 261.603V330.634C225.694 330.688 225.651 330.731 225.597 330.731Z" fill="#EB7926"/>
<path d="M218.415 274.065C218.416 274.333 218.199 274.55 217.931 274.55C217.664 274.55 217.447 274.333 217.448 274.065L217.542 235.889C217.543 235.686 217.681 235.509 217.878 235.46C217.914 235.451 217.946 235.446 217.982 235.44C218.803 235.316 229.398 233.429 243.062 226.035C256.065 218.952 274.598 205.367 288.861 180.43C305.407 151.515 306.086 128.037 305.705 120.076C305.612 118.137 305.395 116.184 305.224 114.25C302.252 80.5238 288.558 54.154 264.409 35.8541C238.405 16.1568 208.519 11.9845 192.994 11.2082C180.866 10.626 159.713 12.6637 140.21 20.3291C113.879 30.6493 96.2724 48.1598 88.0574 72.2889C87.9756 72.5293 87.7147 72.6608 87.4738 72.5805C87.2324 72.5001 87.1025 72.2376 87.1845 71.9967C95.4965 47.5784 113.297 29.9695 139.919 19.4559C159.616 11.6934 180.866 9.65573 193.092 10.2379C208.714 11.0142 238.89 15.1865 264.991 35.0779C290.123 54.0959 303.998 81.6527 306.424 117.069C306.424 117.263 310.208 145.014 289.637 180.915C275.277 206.046 256.55 219.825 243.354 226.908C240.354 228.534 237.496 229.894 234.85 231.03C225.601 235 218.338 243.647 218.364 253.712L218.415 274.065Z" fill="#EB7926"/>
<path d="M218.319 306.813C218.319 315.414 211.347 322.387 202.746 322.387H179.798C179.53 322.387 179.313 322.169 179.313 321.902C179.313 321.634 179.53 321.416 179.798 321.416H202.261C210.594 321.416 217.349 314.661 217.349 306.328V291.725C217.349 291.457 217.566 291.24 217.834 291.24C218.102 291.24 218.319 291.457 218.319 291.725V306.813Z" fill="#EB7926"/>
<path d="M179.313 321.902C179.313 322.17 179.096 322.387 178.828 322.387H174.122C171.255 322.387 168.931 320.063 168.931 317.196V259.22C168.931 256.219 171.364 253.786 174.365 253.786C177.366 253.786 179.799 256.219 179.799 259.22V313.266C179.799 313.534 179.581 313.751 179.313 313.751C179.046 313.751 178.828 313.534 178.828 313.266V259.22C178.828 256.755 176.83 254.756 174.365 254.756C171.9 254.756 169.901 256.755 169.901 259.22V316.711C169.901 319.31 172.008 321.417 174.607 321.417H178.828C179.096 321.417 179.313 321.634 179.313 321.902Z" fill="#EB7926"/>
<path d="M111.974 91.5986C111.974 91.6254 111.952 91.6471 111.925 91.6471H95.0901C94.8222 91.6471 94.605 91.4299 94.605 91.1619C95.1872 72.9201 102.659 60.8883 108.869 54.0961C111.266 51.4922 113.61 49.4341 115.662 47.8543C118.408 45.7394 118.881 41.4111 116.257 39.1462L112.949 36.2909C112.732 36.1037 112.709 35.7758 112.898 35.5602C113.085 35.3469 113.408 35.324 113.623 35.5087L123.057 43.6201C123.315 43.8424 123.251 44.2587 122.938 44.393C122.674 44.481 101.509 54.5407 96.623 81.7332C95.7537 86.5712 99.7567 90.6768 104.672 90.6768C108.717 90.6768 112.198 87.8748 113.495 84.0434C116.018 76.5854 121.164 65.0485 130.199 58.9344C132.415 57.4351 133.138 54.1931 131.296 52.2529C130.334 51.2388 128.884 50.8331 127.622 51.4358C123.053 53.6188 112.916 60.6052 106.69 80.7735C106.608 81.0403 106.323 81.1998 106.056 81.1196C105.787 81.0391 105.638 80.7469 105.721 80.4792C114.096 53.3727 129.055 49.7285 129.73 49.5356C129.908 49.4764 130.104 49.5248 130.234 49.66L136.399 56.0857C136.646 56.3435 136.56 56.7692 136.231 56.91C118.684 63.0134 112.759 90.0183 112.561 91.1278C112.555 91.1634 112.551 91.1797 112.542 91.2148L112.51 91.3437C112.48 91.465 112.371 91.5501 112.246 91.5501H112.022C111.995 91.5501 111.974 91.5718 111.974 91.5986Z" fill="#EB7926"/>
<path d="M141.568 50.4089C141.351 50.6255 141.002 50.632 140.778 50.4236L119.907 31.0502C119.708 30.8653 119.702 30.5518 119.894 30.3595C120.077 30.177 120.371 30.1717 120.56 30.3476L133.361 42.2592C137.787 46.3779 144.741 46.4998 150.107 43.7137C155.832 40.8028 165.341 37.2126 178.731 36.3394C199.828 34.8547 216.018 37.7748 225.829 41.5019C229.245 42.7993 233.313 41.7518 235.174 38.6078C237.201 35.1841 235.788 30.7838 232.039 29.4534C215.631 23.6322 175.066 12.7875 140.751 32.3963C140.508 32.5349 140.195 32.4518 140.06 32.2075C139.927 31.9696 140.014 31.6672 140.25 31.5322C184.711 6.13017 239.377 31.1976 239.957 31.4878C240.212 31.5897 240.316 31.8951 240.176 32.131L232.443 45.1403C232.31 45.363 232.014 45.4217 231.807 45.2662C223.85 40.3176 205.22 35.272 178.828 37.1156C153.697 38.9592 141.665 50.3118 141.568 50.4089Z" fill="#EB7926"/>
<path d="M208.722 309.005C208.717 309.27 208.501 309.482 208.237 309.482C207.966 309.482 207.747 309.259 207.752 308.988L209.19 227.296C209.195 227.027 209.414 226.811 209.684 226.811C237.532 226.617 276.344 186.834 287.503 155.687C303.028 112.121 290.414 81.6528 277.12 63.7991C267.951 51.3942 257.143 43.1583 250.456 38.7659C247.248 36.6588 243.013 37.8959 241.156 41.2545C239.164 44.8563 240.718 49.405 244.288 51.4545C255.156 57.6952 274.579 72.2327 278.042 97.9011C278.608 102.098 281.978 105.544 286.213 105.571L293.425 105.616C293.691 105.618 293.907 105.835 293.907 106.102C293.907 106.371 293.688 106.588 293.419 106.587L278.091 106.496C277.822 106.494 277.605 106.276 277.605 106.008C277.605 64.8665 236.949 48.7593 236.561 48.6623C236.304 48.5593 236.195 48.2538 236.329 48.011L243.92 34.2933C244.037 34.081 244.301 33.9992 244.518 34.1076C244.712 34.2047 263.245 43.5196 277.897 63.1199C291.384 81.1677 304.192 112.024 288.473 155.979C282.166 173.541 269.164 191.88 252.766 206.144C245.46 212.559 237.974 217.731 230.886 221.41C220.019 227.049 209.998 237.384 209.78 249.625L208.722 309.005Z" fill="#EB7926"/>
<path d="M200.563 309.481C200.563 309.749 200.346 309.967 200.078 309.967H187.852C187.584 309.967 187.367 309.749 187.367 309.481L188.919 224.094C188.866 220.948 191.401 218.369 194.548 218.369H194.889C198.183 218.369 200.854 221.04 200.854 224.334V298.711C200.854 298.979 200.637 299.196 200.369 299.196C200.101 299.196 199.884 298.979 199.884 298.711V224.334C199.884 221.576 197.648 219.34 194.89 219.34H194.548C191.937 219.34 189.836 221.484 189.89 224.094L188.45 302.829C188.388 306.216 191.117 308.996 194.506 308.996H200.078C200.346 308.996 200.563 309.214 200.563 309.481Z" fill="#EB7926"/>
<path d="M253.838 17.176L248.49 23.9568C248.324 24.1672 248.36 24.4723 248.571 24.6382C248.781 24.8041 249.086 24.768 249.252 24.5576L254.6 17.7768C254.765 17.5664 254.729 17.2614 254.519 17.0955C254.309 16.9296 254.004 16.9656 253.838 17.176Z" fill="#EB7926"/>
<path d="M251.019 119.98C250.437 119.98 249.855 119.98 249.354 119.98C249.095 119.98 248.884 119.77 248.884 119.51C248.884 119.239 249.113 119.024 249.384 119.034C250.843 119.087 252.58 119.01 254.318 119.01C256.075 119.01 257.911 118.93 259.394 118.987C259.65 118.997 259.849 119.209 259.849 119.465C259.849 119.744 259.613 119.965 259.334 119.955C257.878 119.903 256.147 119.98 254.415 119.98C253.251 119.98 252.086 119.98 251.019 119.98Z" fill="#EB7926"/>
<path d="M100.815 122.891V112.8C100.815 112.532 100.598 112.315 100.33 112.315C100.062 112.315 99.8447 112.532 99.8447 112.8V122.891C99.8447 123.159 100.062 123.376 100.33 123.376C100.598 123.376 100.815 123.159 100.815 122.891Z" fill="#EB7926"/>
<path d="M190.666 66.322V57.7833C190.666 57.5153 190.448 57.2981 190.18 57.2981C189.913 57.2981 189.695 57.5153 189.695 57.7833V66.322C189.695 66.5899 189.913 66.8071 190.18 66.8071C190.448 66.8071 190.666 66.5899 190.666 66.322Z" fill="#EB7926"/>
<path d="M238.639 202.133L232.159 193.652C231.996 193.439 231.692 193.398 231.479 193.561C231.266 193.723 231.225 194.028 231.388 194.241L237.868 202.722C238.03 202.935 238.335 202.975 238.548 202.813C238.761 202.65 238.801 202.346 238.639 202.133Z" fill="#EB7926"/>
<path d="M226.374 383.901C226.374 396.603 216.076 406.901 203.374 406.901H182.325C169.623 406.901 159.325 396.603 159.325 383.901V356.348C159.325 356.08 159.542 355.862 159.81 355.862C160.078 355.862 160.296 356.08 160.296 356.348V382.93C160.296 395.633 170.593 405.93 183.296 405.93H202.403C215.106 405.93 225.403 395.633 225.403 382.93V368.189C225.403 355.486 215.106 345.189 202.403 345.189H160.296C160.028 345.189 159.81 344.972 159.81 344.704C159.81 344.436 160.028 344.219 160.296 344.219H203.374C216.076 344.219 226.374 354.516 226.374 367.219V383.901Z" fill="#EB7926"/>
<path d="M218.32 376.045C218.32 387.245 209.24 396.324 198.04 396.324H183.971C175.665 396.324 168.931 389.591 168.931 381.285C168.931 372.978 175.665 366.245 183.971 366.245H199.738C204.695 366.245 208.714 370.263 208.714 375.22C208.714 380.177 204.695 384.195 199.738 384.195H183.631C181.246 384.195 179.313 382.262 179.313 379.878C179.313 377.493 181.246 375.56 183.631 375.56H198.137C198.405 375.56 198.622 375.777 198.622 376.045C198.622 376.313 198.405 376.53 198.137 376.53H183.631C181.782 376.53 180.284 378.029 180.284 379.878C180.284 381.726 181.782 383.225 183.631 383.225H199.738C204.159 383.225 207.743 379.641 207.743 375.22C207.743 370.799 204.159 367.215 199.738 367.215H183.971C176.2 367.215 169.901 373.514 169.901 381.285C169.901 389.055 176.2 395.354 183.971 395.354H198.04C208.704 395.354 217.349 386.709 217.349 376.045C217.349 365.381 208.704 356.736 198.04 356.736H160.295C160.027 356.736 159.81 356.518 159.81 356.251C159.81 355.983 160.027 355.765 160.295 355.765H198.04C209.24 355.765 218.32 364.845 218.32 376.045Z" fill="#EB7926"/>
<path d="M181.351 405.931V396.325C181.351 396.057 181.134 395.839 180.866 395.839C180.598 395.839 180.381 396.057 180.381 396.325V405.931C180.381 406.199 180.598 406.416 180.866 406.416C181.134 406.416 181.351 406.199 181.351 405.931Z" fill="#EB7926"/>
<path d="M225.403 372.552H218.32C218.052 372.552 217.835 372.769 217.835 373.037C217.835 373.305 218.052 373.522 218.32 373.522H225.403C225.671 373.522 225.889 373.305 225.889 373.037C225.889 372.769 225.671 372.552 225.403 372.552Z" fill="#EB7926"/>
<path d="M188.337 375.074V367.215C188.337 366.947 188.12 366.73 187.852 366.73C187.584 366.73 187.367 366.947 187.367 367.215V375.074C187.367 375.342 187.584 375.56 187.852 375.56C188.12 375.56 188.337 375.342 188.337 375.074Z" fill="#EB7926"/>
<path d="M168.931 381.091H160.295C160.027 381.091 159.81 381.308 159.81 381.576C159.81 381.844 160.027 382.061 160.295 382.061H168.931C169.199 382.061 169.416 381.844 169.416 381.576C169.416 381.308 169.199 381.091 168.931 381.091Z" fill="#EB7926"/>
<path d="M289.055 110.374C287.988 109.307 286.339 108.822 284.398 109.016L272.366 108.822C270.425 108.919 268.582 108.433 267.029 107.366C265.477 106.396 264.312 104.843 263.73 103.097L263.245 101.544C262.275 98.4393 261.207 95.1402 260.043 92.0352C259.267 90.0946 258.491 88.348 257.617 86.7956C257.132 85.9223 256.647 85.146 256.162 84.3698C255.677 83.4965 255.095 82.7203 254.609 81.944C246.459 69.9122 234.524 60.5972 221.037 55.7456C209.296 51.4763 196.197 50.1178 183.001 51.7674C177.276 52.4466 171.648 53.805 166.117 55.6486L162.236 57.007C161.46 57.2981 160.586 57.6863 159.81 57.9773C159.422 58.1714 158.937 58.3655 158.549 58.5595C156.22 59.5298 153.891 60.7912 151.66 62.1497C147.487 64.6725 143.8 67.7775 140.598 71.2706C139.142 72.9201 137.784 74.6667 136.523 76.4132C135.455 77.9657 134.485 79.6153 133.321 81.6529C131.865 84.2727 130.604 86.6985 129.342 89.1243C128.954 89.9005 128.566 90.6768 128.178 91.356C127.887 91.8412 127.596 92.4233 127.305 92.9085C126.043 95.2372 124.976 97.3719 123.618 99.2155C119.833 104.552 115.758 106.299 114.206 106.784C113.858 106.923 113.56 107.012 113.241 107.087C112.98 107.149 112.727 107.269 112.459 107.269C112.265 107.269 112.071 107.366 111.877 107.366C111.586 107.366 111.392 107.463 111.101 107.463C110.703 107.463 110.432 107.489 110.263 107.514C110.109 107.536 109.934 107.542 109.816 107.644C109.646 107.791 109.721 108.099 109.894 108.243C109.962 108.3 110.046 108.336 110.13 108.336C110.13 108.336 110.13 108.336 110.13 108.336C110.13 108.336 110.518 108.336 111.198 108.336C111.489 108.336 111.683 108.239 112.071 108.239C112.265 108.239 112.459 108.142 112.653 108.142C112.92 108.142 113.172 108.013 113.432 107.952C113.741 107.879 114.096 107.791 114.497 107.657C116.146 107.172 120.416 105.328 124.394 99.7977C125.752 97.9541 126.917 95.7224 128.178 93.3937C128.469 92.9085 128.76 92.3263 129.051 91.8412C129.439 91.0649 129.828 90.2887 130.216 89.5124C131.477 87.1837 132.738 84.7579 134.097 82.1381C135.261 80.1004 136.232 78.4509 137.202 76.9954C138.366 75.2489 139.725 73.5023 141.18 71.9498C144.285 68.5537 147.875 65.5458 152.048 63.023C154.182 61.6645 156.511 60.5001 158.84 59.5298C159.228 59.3358 159.713 59.1417 160.101 58.9477C160.877 58.6566 161.654 58.2684 162.43 57.9773L166.214 56.6189C171.648 54.8724 177.179 53.5139 182.806 52.8347C195.809 51.1852 208.714 52.5436 220.26 56.813C233.554 61.6645 245.294 70.8825 253.251 82.6232C253.736 83.3024 254.318 84.1757 254.803 84.952C255.289 85.7282 255.774 86.5045 256.259 87.3777C257.132 88.9302 257.811 90.5798 258.588 92.5204C259.752 95.5283 260.722 98.6333 261.79 101.932L262.275 103.485C262.954 105.426 264.312 107.172 266.059 108.336C267.709 109.501 269.843 110.083 272.075 109.986L284.204 110.18C285.077 110.083 286.824 110.18 287.891 111.247C288.958 112.218 289.055 113.77 289.055 114.935C289.055 115.002 289.055 115.068 289.055 115.133C289.053 116.102 288.958 117.071 288.91 118.04C288.861 119.008 288.767 119.977 288.764 120.946C288.764 121.011 288.764 121.077 288.764 121.145C288.667 122.115 288.57 123.085 288.473 124.055C287.794 130.071 286.63 136.184 284.883 142.2C281.487 154.329 276.15 166.07 269.164 177.034C264.895 183.827 260.237 189.745 255.386 194.888C253.057 197.314 250.534 199.74 247.235 202.359C244.518 204.494 241.51 206.629 238.211 208.569C232.389 211.966 225.985 214.779 218.514 217.302L217.155 217.787C215.991 218.176 214.73 218.564 213.468 218.952L210.945 219.728C209.975 220.019 209.102 220.407 208.423 220.892C206.87 221.863 205.512 223.415 204.832 225.162C204.444 226.035 204.25 226.908 204.153 227.879C204.153 228.558 204.153 229.14 204.153 229.722C204.153 230.013 204.153 230.207 204.153 230.498C204.153 250.293 203.668 269.02 203.28 287.165C203.086 294.248 202.892 301.234 202.795 308.026C202.795 309.676 202.892 311.131 203.28 312.587C203.668 314.042 204.153 315.595 205.512 316.662C206.773 317.632 208.617 317.826 210.169 317.05C210.945 316.662 211.528 316.177 212.013 315.595C212.498 315.012 212.789 314.43 213.08 313.557C213.953 311.131 214.05 308.608 214.147 306.28V305.212C214.245 302.592 214.147 299.973 214.147 297.45V296.382C214.147 293.957 214.147 291.628 214.147 289.396V289.008C214.245 286.679 214.244 284.254 214.73 282.022C214.827 281.537 215.021 280.955 215.312 280.566C215.603 280.178 216.088 279.887 216.573 279.693C217.155 279.402 218.514 278.917 219.484 279.596C220.163 280.081 220.552 280.955 220.746 282.313C220.843 283.089 220.843 283.866 220.746 284.642C220.746 285.03 220.746 285.321 220.746 285.709L220.163 330.828C220.066 331.993 219.969 333.06 220.163 334.031C220.357 335.292 220.649 336.262 221.328 337.039C221.716 337.427 222.201 337.718 222.783 337.815C223.268 337.912 223.754 337.912 224.142 337.912C225.015 338.009 225.888 338.009 226.762 338.009C226.956 338.009 227.15 338.009 227.344 338.009C230.158 338.009 232.68 337.912 234.621 337.815L240.152 337.621C241.315 337.524 241.897 337.524 241.898 337.524C241.898 337.524 241.898 337.524 241.898 337.524C241.994 337.524 242.09 337.477 242.15 337.405C242.274 337.261 242.215 337.027 242.068 336.905C241.922 336.783 241.702 336.747 241.511 336.754C241.23 336.764 240.745 336.787 240.055 336.844L234.33 337.039C232.292 337.136 229.672 337.135 226.664 337.135C225.791 337.135 225.015 337.136 224.142 337.039C224.045 337.039 223.851 337.039 223.754 337.039C223.074 337.039 222.298 336.941 221.91 336.456C221.425 335.874 221.134 335.098 221.037 334.031C220.991 333.576 220.967 333.121 220.974 332.646C220.991 331.495 221.142 330.347 221.16 329.196L221.813 285.709C221.813 285.418 221.813 285.03 221.813 284.642C221.813 284.357 221.813 284.059 221.813 283.754C221.813 282.665 221.828 281.555 221.509 280.515C221.483 280.431 221.455 280.351 221.425 280.275C221.134 279.499 220.649 279.014 220.163 278.626C220.026 278.534 219.877 278.453 219.721 278.384C218.726 277.944 217.555 278.101 216.536 278.484C216.42 278.528 216.302 278.576 216.185 278.626C215.506 278.917 214.924 279.305 214.536 279.887C214.05 280.469 213.856 281.149 213.759 281.828C213.274 284.157 213.177 286.582 213.177 289.008V289.493C213.177 291.822 213.177 294.151 213.177 296.674V297.644C213.177 300.167 213.177 302.787 213.177 305.309V306.28C213.08 308.608 212.983 311.034 212.207 313.266C211.722 314.624 210.848 315.595 209.781 316.08C208.617 316.662 207.258 316.565 206.288 315.789C205.221 314.915 204.735 313.363 204.444 312.296C204.153 311.034 204.056 309.579 204.056 308.026C204.153 301.428 204.347 294.636 204.541 287.65C205.027 269.408 205.512 250.584 205.512 230.498C205.512 230.207 205.512 230.013 205.512 229.722C205.512 229.14 205.512 228.558 205.512 227.976C205.609 227.199 205.803 226.326 206.094 225.647C206.773 224.191 207.84 222.833 209.199 221.96C209.878 221.572 210.557 221.183 211.431 220.989L213.953 220.213C215.215 219.825 216.476 219.437 217.641 219.049L218.999 218.564C226.567 216.041 233.068 213.13 238.987 209.734C242.286 207.793 245.391 205.659 248.205 203.427C251.504 200.71 254.221 198.284 256.453 195.858C261.402 190.716 266.059 184.7 270.425 177.811C277.509 166.749 282.845 154.814 286.339 142.588C288.085 136.475 289.249 130.265 289.929 124.25C290.026 123.279 290.123 122.309 290.22 121.242C290.22 120.659 290.317 120.174 290.317 119.592C290.414 118.622 290.414 117.651 290.414 116.681C290.414 116.099 290.414 115.614 290.511 115.032C290.608 113.867 290.511 111.83 289.055 110.374Z" fill="#1C3687"/>
<ellipse cx="80" cy="362.5" rx="61" ry="13.5" fill="#FFE8DA"/>
<path d="M22.1182 153.861C24.0991 144.404 30.5236 135.913 36.5563 129.725C39.6244 126.578 42.5771 124.04 44.7625 122.289C45.855 121.414 46.755 120.736 47.381 120.278C47.5569 120.149 47.7111 120.038 47.8419 119.944L56.8059 142.579C56.7346 142.618 56.6544 142.663 56.5658 142.713C56.1634 142.94 55.5882 143.274 54.8932 143.704C53.5042 144.562 51.633 145.806 49.7071 147.344C46.0555 150.26 42.0986 154.321 40.9906 158.899C33.7399 155.372 26.4458 154.227 22.1182 153.861Z" fill="#EB7926" stroke="black"/>
<path d="M133.877 130.253C125.951 134.636 116.352 137.939 104.746 139.375L104.42 139.415L104.328 139.73L104.808 139.871C104.328 139.73 104.328 139.731 104.328 139.731L104.327 139.733L104.325 139.74L104.317 139.767L104.286 139.875L104.162 140.296C104.054 140.667 103.895 141.212 103.691 141.913C103.284 143.314 102.699 145.335 101.987 147.817C100.563 152.778 98.632 159.579 96.6026 166.936C92.5895 181.482 88.1839 198.23 86.5673 207.205C86.4099 207.261 86.1845 207.34 85.8959 207.438C85.2817 207.645 84.3814 207.936 83.2412 208.27C80.9605 208.939 77.7222 209.779 73.8965 210.465C66.3261 211.823 56.4948 212.569 47.2375 210.215C47.23 210.151 47.2216 210.078 47.2123 209.996C47.1702 209.628 47.1094 209.083 47.0346 208.373C46.8849 206.954 46.6791 204.878 46.4547 202.253C46.006 197.004 45.4835 189.563 45.1881 180.795C44.6003 163.344 44.9136 140.659 48.4939 119.56C48.6958 119.511 48.9923 119.439 49.3765 119.348C50.1582 119.163 51.3031 118.9 52.7536 118.584C55.6548 117.953 59.778 117.116 64.6632 116.291C74.4376 114.641 87.2452 113.045 99.4141 113.245C106.862 113.378 115.46 111.983 123.94 109.388C125.253 114.735 128.089 123.306 133.877 130.253Z" fill="#EB7926" stroke="black"/>
<path d="M151.443 95.8361C158.983 90.1402 164.648 83.2727 166.546 75.6284C166.606 75.609 166.678 75.5877 166.76 75.5664C167.049 75.4914 167.457 75.4185 167.931 75.4269C168.825 75.4429 169.974 75.7455 171.03 76.9311C171.022 76.9803 171.013 77.0376 171.003 77.1028C170.961 77.3631 170.895 77.7491 170.799 78.248C170.608 79.2457 170.299 80.6944 169.828 82.4907C168.885 86.0837 167.296 91.0641 164.709 96.6054C159.573 107.606 150.514 120.798 134.797 129.755C129.049 122.943 126.215 114.408 124.929 109.09C134.499 106.064 143.927 101.514 151.443 95.8361Z" fill="white" stroke="black"/>
<path d="M76.3003 122.957L70.8862 211.128" stroke="black"/>
<path d="M87.1765 343.861C87.1765 343.861 86.1029 349.968 85.5661 356.007C85.3648 358.372 87.1765 360.419 89.5419 360.519C97.5773 360.855 114.789 361.509 120.962 361.224C121.885 361.19 122.489 360.234 122.153 359.362C121.868 358.641 121.315 358.053 120.61 357.735L92.1924 344.667L87.1765 343.861Z" fill="black"/>
<path d="M88.1525 347.416C87.9337 347.342 87.7542 347.274 87.6224 347.221L86.8418 340.691L93.0953 339.712L94.963 347.076C93.4727 348.075 91.6701 348.138 90.1503 347.907C89.3519 347.786 88.6525 347.586 88.1525 347.416Z" fill="white" stroke="black"/>
<path d="M86.9422 203.064C86.5732 204.977 84.9292 298.165 94.8938 339.936C95.0616 340.624 94.7093 341.311 94.055 341.58C92.5285 342.2 89.5257 343.106 85.9357 343.224C84.8285 343.257 83.822 342.536 83.52 341.479C80.6682 331.783 67.0297 283.235 65.2515 236.85C63.2552 185.031 65.2515 235.089 65.2515 235.089L66.4258 203.048L86.9422 203.064Z" fill="#1C3687"/>
<path d="M54.4808 347.032C54.4808 347.032 52.7697 350.119 51.1089 358.305C50.807 359.781 51.8471 361.191 53.3401 361.341C55.9906 361.61 60.0838 361.945 63.3551 361.912C64.8649 361.895 66.0391 360.587 65.8546 359.094C65.4855 356.108 64.3616 351.209 60.8723 347.384L54.4808 347.032Z" fill="black"/>
<path d="M55.4529 348.386L53.5649 338.118L59.525 337.748L60.4236 348.716C58.7266 349.121 57.4564 349.018 56.61 348.817C56.1525 348.707 55.8145 348.568 55.5961 348.461C55.5407 348.433 55.493 348.408 55.4529 348.386Z" fill="white" stroke="black"/>
<path d="M47.5191 205.916C39.3662 255.085 49.2805 327.455 52.6356 341.613C52.8369 342.486 53.5415 343.14 54.4138 343.291C55.9069 343.543 58.3561 343.744 60.7885 343.039C61.6273 342.805 62.2144 342.05 62.248 341.177C62.7009 329.72 61.8957 259.43 69.4782 231.65C69.8641 230.241 70.7196 229.016 71.9107 228.161L86.6396 217.693L87.7635 200.766L47.5191 205.916Z" fill="#11286F"/>
<path d="M170.707 78.9375L170.707 78.9375L170.707 78.9375L170.706 78.9375L170.706 78.9375L170.031 78.9414L170.215 79.5302C170.199 79.5517 170.164 79.5865 170.094 79.633C169.919 79.7491 169.621 79.8525 169.248 79.85C168.552 79.8451 167.566 79.4649 166.78 78.0242C166.758 77.6539 166.704 77.0892 166.641 76.4292C166.631 76.3267 166.621 76.2219 166.61 76.1151C166.526 75.2347 166.431 74.2022 166.366 73.1804C166.302 72.1562 166.27 71.1564 166.309 70.3395C166.329 69.9308 166.367 69.58 166.423 69.301C166.482 69.0118 166.552 68.8483 166.606 68.7734C169.107 65.3623 172.792 61.5066 175.865 58.4929C177.4 56.9883 178.776 55.6983 179.77 54.7846C180.266 54.3278 180.667 53.9651 180.943 53.7169C180.96 53.7012 180.977 53.686 180.994 53.6712C181.389 54.2179 181.397 54.7109 181.314 55.0817C181.261 55.3208 181.166 55.5235 181.083 55.6675C181.041 55.7388 181.004 55.7935 180.979 55.8287C180.967 55.8441 180.959 55.8557 180.953 55.863L176.22 60.7995L175.965 61.0652L176.143 61.3873C176.396 61.8448 176.663 62.284 176.925 62.7126C176.95 62.7524 176.974 62.7921 176.998 62.8318C177.237 63.2213 177.47 63.6023 177.693 63.9924C178.181 64.8486 178.605 65.7287 178.87 66.7498C179.262 68.2696 179.029 69.8908 178.254 71.2819C177.422 72.7757 176.292 74.7143 175.235 76.224L175.235 76.2251C174.29 77.5825 173.146 78.2582 172.243 78.5971C171.79 78.7672 171.397 78.8525 171.12 78.8952C170.982 78.9165 170.874 78.9271 170.803 78.9324C170.767 78.935 170.741 78.9363 170.724 78.9369L170.708 78.9375L170.707 78.9375ZM170.229 79.5051C170.23 79.5052 170.229 79.509 170.225 79.5163C170.227 79.5087 170.229 79.505 170.229 79.5051Z" fill="white" stroke="black"/>
<path d="M172.411 74.7481C172.4 74.8051 172.389 74.8604 172.379 74.9139L169.396 71.6028L170.606 68.3504L174.557 64.9908C174.771 65.1442 174.891 65.3078 174.938 65.4879C175.005 65.744 174.966 66.1848 174.521 66.9257C174.237 67.3848 173.959 68.1949 173.704 69.0861C173.442 69.9998 173.187 71.0638 172.964 72.0722C172.741 73.0817 172.548 74.0413 172.411 74.7481Z" fill="white" stroke="black"/>
<path d="M77.162 165.731L80.1158 171.202C80.0862 171.222 80.0548 171.244 80.0217 171.266C79.7195 171.471 79.2732 171.769 78.6992 172.139C77.551 172.879 75.8924 173.907 73.8545 175.054C69.7761 177.35 64.1903 180.118 58.1432 182.025C52.0899 183.934 45.6168 184.965 39.7449 183.833C33.8987 182.706 28.6175 179.43 24.9087 172.646L24.9083 172.645C21.5665 166.556 20.935 160.522 21.9284 154.832C26.2196 155.186 33.5543 156.324 40.7918 159.898C40.4252 162.351 40.9344 164.906 42.7145 167.451C44.9797 170.693 48.3515 172.156 52.0664 172.548C55.7699 172.938 59.8487 172.271 63.617 171.226C67.3911 170.18 70.8872 168.745 73.4368 167.574C74.7126 166.989 75.7535 166.468 76.4764 166.093C76.753 165.95 76.9831 165.827 77.162 165.731Z" fill="white" stroke="black"/>
<path d="M74.7724 183.512L74.7737 183.507L88.7477 134.708L88.7477 134.708L88.7494 134.701C88.8443 134.353 89.1564 134.088 89.5332 134.043L89.534 134.043C92.0627 133.742 99.3877 132.92 107.852 132.2C118.058 131.343 129.877 130.643 136.908 131.227C137.566 131.282 137.955 131.984 137.675 132.554C135.663 136.629 130.52 146.944 124.843 157.596C119.158 168.262 112.962 179.221 108.839 184.609L108.839 184.61C108.665 184.838 108.377 184.983 108.081 184.984C108.08 184.984 108.08 184.984 108.079 184.984L75.6565 184.682H75.6518C75.042 184.682 74.6002 184.093 74.7724 183.512Z" fill="white" stroke="black"/>
<path d="M83.781 177.741L83.7798 177.745C83.6949 178.031 83.9127 178.327 84.2195 178.327H84.2241L106.153 178.531C106.154 178.531 106.154 178.531 106.155 178.531C106.305 178.53 106.452 178.455 106.539 178.342L106.539 178.341C109.318 174.715 113.504 167.326 117.35 160.12C121.189 152.929 124.666 145.964 126.027 143.213C126.165 142.932 125.973 142.578 125.64 142.55L83.781 177.741ZM83.781 177.741L93.2331 144.784L93.2331 144.784M83.781 177.741L93.2331 144.784M93.2331 144.784L93.2348 144.778M93.2331 144.784L93.2348 144.778M93.2348 144.778C93.2807 144.61 93.435 144.474 93.6278 144.452L93.6285 144.452M93.2348 144.778L93.6285 144.452M93.6285 144.452C95.3376 144.248 100.29 143.694 106.014 143.207M93.6285 144.452L106.014 143.207M106.014 143.207C112.918 142.629 120.9 142.157 125.64 142.55L106.014 143.207Z" fill="white" stroke="black"/>
<path d="M119.72 126.535L119.719 126.535L119.716 126.545L118.71 129.582L118.71 129.582L118.707 129.59C118.684 129.662 118.618 129.719 118.535 129.729L118.535 129.729L118.531 129.73L108.784 131.038C108.625 131.06 108.495 130.918 108.532 130.758C108.532 130.758 108.532 130.758 108.532 130.758L109.152 128.113C109.17 128.043 109.244 127.968 109.338 127.95L119.465 126.257C119.554 126.244 119.632 126.277 119.682 126.335C119.73 126.39 119.747 126.459 119.72 126.535Z" fill="#EB7926" stroke="black"/>
<path d="M123.63 135.459L124.938 130.041C125.106 129.353 124.552 128.732 123.864 128.799M123.63 135.459L123.864 128.799M123.63 135.459C123.529 135.895 123.143 136.214 122.707 136.231L123.63 135.459ZM123.864 128.799L123.913 129.297C123.913 129.297 123.914 129.297 123.914 129.297L123.915 129.297L123.864 128.799Z" fill="#EB7926" stroke="black"/>
<path d="M90.9327 160.028L90.4771 160.9L92.6114 162.554C92.604 162.58 92.5958 162.607 92.5866 162.635C92.5169 162.85 92.4016 163.1 92.2199 163.301C92.0463 163.493 91.8076 163.647 91.4543 163.687C91.089 163.727 90.555 163.649 89.7954 163.277L89.2059 164.063L91.1652 166.214C91.019 166.391 90.8082 166.605 90.5418 166.775C90.2775 166.943 89.9672 167.063 89.6106 167.07C89.2567 167.076 88.8166 166.972 88.288 166.628L88.2866 166.628C87.8972 166.376 87.4938 166.277 87.0813 166.339C86.6866 166.399 86.3378 166.598 86.0291 166.836C85.7197 167.074 85.4134 167.382 85.108 167.703C85.0049 167.811 84.9022 167.921 84.7982 168.032C84.5847 168.26 84.3658 168.493 84.1272 168.734C82.792 170.079 81.0387 171.428 78.0718 171.123C78.0712 171.12 78.0706 171.118 78.0701 171.115C78.0189 170.893 77.9465 170.572 77.8621 170.178C77.6931 169.388 77.4761 168.308 77.2838 167.14C77.0913 165.972 76.9248 164.724 76.8546 163.598C76.7836 162.458 76.8157 161.497 76.9891 160.874C77.3803 159.467 77.9332 157.949 78.9557 156.876C79.9455 155.838 81.4241 155.168 83.8101 155.547C86.3111 155.944 89.0504 156.675 91.1726 157.31C92.2319 157.627 93.1338 157.919 93.7704 158.132C94.014 158.213 94.2187 158.283 94.3784 158.338C94.3709 158.369 94.3626 158.402 94.3534 158.436C94.2744 158.729 94.1367 159.093 93.9044 159.416C93.6759 159.734 93.3604 160.007 92.9125 160.147C92.4618 160.287 91.8263 160.308 90.9327 160.028ZM94.4454 157.964C94.4455 157.963 94.4455 157.963 94.4454 157.964L94.4454 157.964Z" fill="white" stroke="black"/>
<path d="M66.4314 115.793C66.4243 115.791 66.4176 115.789 66.4113 115.786L73.9545 102.187H88.8346L86.4488 113.679C86.4487 113.68 86.4485 113.68 86.4484 113.681C86.347 114.147 85.8737 114.665 84.9963 115.01L84.9955 115.01C75.9739 118.582 68.4889 116.506 66.4398 115.796L66.4398 115.796L66.4314 115.793Z" fill="white" stroke="black"/>
<path d="M61.4121 116.576C67.2773 121.99 81.8307 128.99 91.576 112.902" stroke="black"/>
<path d="M97.5021 87.7002C96.4002 82.7203 93.6326 80.2264 93.6326 80.2264C91.3071 70.9093 87.0919 61.9625 74.3656 64.4473C64.0961 66.4687 59.3336 76.3127 61.6601 85.634L63.642 93.5745C64.7918 98.1813 73.7966 107.258 85.2285 104.405C96.6603 101.552 98.661 92.9081 97.5021 87.7002Z" fill="white" stroke="black" stroke-width="1.39" stroke-miterlimit="10"/>
<path d="M67.06 84.1322C67.06 84.1322 63.4638 80.0832 60.9056 82.9109C58.3474 85.7386 62.9419 97.5992 68.5905 93.2293" fill="white"/>
<path d="M67.06 84.1322C67.06 84.1322 63.4638 80.0832 60.9056 82.9109C58.3474 85.7386 62.9419 97.5992 68.5905 93.2293" stroke="black" stroke-width="1.39" stroke-miterlimit="10"/>
<path d="M65.907 89.3047C65.907 89.3047 64.9951 85.9512 62.6008 85.8352L65.907 89.3047Z" fill="white"/>
<path d="M65.907 89.3047C65.907 89.3047 64.9951 85.9512 62.6008 85.8352" stroke="black" stroke-width="1.39" stroke-miterlimit="10"/>
<path d="M85.8251 66.1506C81.5132 63.3462 75.2371 68.5907 76.9284 74.8198C78.6196 81.0489 71.2801 83.6736 71.2801 83.6736L72.2891 87.7164L69.1502 88.4999L65.9474 83.1326C65.9474 83.1326 63.1384 80.5785 60.91 82.9274C55.0963 77.1414 60.4838 72.7134 60.4838 72.7134C60.4838 72.7134 64.1506 57.7029 78.5014 59.6623C92.8523 61.6217 90.6686 71.8969 90.6686 71.8969C90.6686 71.8969 90.1172 68.9644 85.8251 66.1506Z" fill="black" stroke="black" stroke-width="1.39" stroke-miterlimit="10"/>
<path d="M85.7341 78.1761C85.7341 78.1761 84.0541 80.5688 89.3564 87.1299C90.4577 88.4892 87.2659 92.0961 84.9918 89.4438" fill="white"/>
<path d="M85.7341 78.1761C85.7341 78.1761 84.0541 80.5688 89.3564 87.1299C90.4577 88.4892 87.2659 92.0961 84.9918 89.4438" stroke="black" stroke-width="1.39" stroke-miterlimit="10"/>
<path d="M89.08 79.7905L89.362 79.7202C89.8726 79.5927 90.3899 79.9034 90.5174 80.414L90.7585 81.3802C90.886 81.8909 90.5753 82.4082 90.0647 82.5356L89.7827 82.606C89.272 82.7335 88.7547 82.4228 88.6273 81.9121L88.3861 80.946C88.2587 80.4353 88.5693 79.918 89.08 79.7905Z" fill="black"/>
<path d="M92.0964 75.6234C91.0262 74.3357 88.2565 74.6922 87.5426 76.5089" stroke="black" stroke-width="1.39" stroke-miterlimit="10"/>
<path d="M77.6015 82.6552L77.8834 82.5848C78.3941 82.4573 78.9114 82.768 79.0389 83.2787L79.28 84.2448C79.4075 84.7555 79.0968 85.2728 78.5862 85.4002L78.3042 85.4706C77.7935 85.5981 77.2762 85.2874 77.1487 84.7767L76.9076 83.8106C76.7801 83.2999 77.0908 82.7826 77.6015 82.6552Z" fill="black"/>
<path d="M80.3196 78.8406C79.2493 77.5528 76.4796 77.9094 75.7658 79.7261" stroke="black" stroke-width="1.39" stroke-miterlimit="10"/>
<path d="M85.4647 95.3471C85.4647 95.3471 80.789 97.7915 76.503 92.5844L85.4647 95.3471Z" fill="white"/>
<path d="M85.4647 95.3471C85.4647 95.3471 80.789 97.7915 76.503 92.5844" stroke="black" stroke-width="1.39" stroke-miterlimit="10"/>
<path d="M73.7891 52.4824L100.373 58.3967C100.889 58.5128 101.355 58.7921 101.701 59.1933C102.047 59.5945 102.255 60.0962 102.294 60.6246C102.333 61.1529 102.201 61.6798 101.918 62.1275C101.635 62.5752 101.215 62.9199 100.721 63.1109L76.721 72.3826C76.3406 72.5299 75.9297 72.581 75.5248 72.5314L48.6119 69.1793C48.0884 69.1097 47.6012 68.874 47.2217 68.5067C46.8423 68.1395 46.5908 67.6602 46.5042 67.1393C46.4176 66.6184 46.5005 66.0835 46.7406 65.6132C46.9808 65.143 47.3656 64.7623 47.8383 64.5271L72.1711 52.6704C72.6739 52.4275 73.244 52.3613 73.7891 52.4824Z" fill="black"/>
</svg>

          </div>
          </div>
        </div>
</div>
     );
    }}

export default studentdoubt;
