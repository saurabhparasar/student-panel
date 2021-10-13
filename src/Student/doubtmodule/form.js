import React, { Component } from "react";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Config from "../../config.json";
import Finding from "./img/finding your solution.gif";
import NotFound from "./img/134-target-outline.gif";

class studentdoubt extends Component {
  constructor() {
    super();
    let data = localStorage.getItem("userdetail");
    data = JSON.parse(data);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      crop: {
        unit: "%",
        width: 80,
        height: 50,
        x: 10,
        y: 20,
      },
      isUpload: false,
      isCrop: false,
      isNotfound: false,
      ques_text: "",
      ques_image: null,
      ques_url: null,
      cropques_url: null,
      img: null,
      token: data.token,
      student: data.username,
    };
  }
  onTextClick = () => {
    this.setState({ isCamera: true });
  };

  onUploadClick = (event) => {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    console.log(url);
    this.setState({ ques_image: file, ques_url: url, isUpload: true });
  };

  onCropChange = (crop) => {
    this.setState({ crop });
  };
  onImageLoaded = (image) => {
    this.setState({ img: image });
  };

  getCroppedImg = () => {
    const canvas = document.createElement("canvas");
    const scaleX = this.state.img.naturalWidth / this.state.img.width;
    const scaleY = this.state.img.naturalHeight / this.state.img.height;
    canvas.width = this.state.crop.width;
    canvas.height = this.state.crop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      this.state.img,
      this.state.crop.x * scaleX,
      this.state.crop.y * scaleY,
      this.state.crop.width * scaleX,
      this.state.crop.height * scaleY,
      0,
      0,
      this.state.crop.width,
      this.state.crop.height
    );
    const base64Image = canvas.toDataURL("image/jpeg");

    this.setState({ cropques_url: base64Image, isCrop: true, isUpload: false });

    let arr = base64Image.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    let croppedImage = new File([u8arr], "default", { type: mime });
    console.log(croppedImage);
    var formdata = new FormData();
    formdata.append("student_username", this.state.student);
    formdata.append("query_image", croppedImage);
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
      headers: {
        Authorization: "Token " + this.state.token,
      },
    };
    fetch(Config.SERVER_URL + "student/get-solution/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.Success) {
          this.setState({
            isNotfound: true,
            isCrop: false,
            isUpload: false,
          });
        } else {
          this.props.history.push({
            pathname: "/student/doubtsolutions",
            state: {
              question: croppedImage,
              solutions: data,
              search_type: "image",
            },
          });
        }
      })
      .catch((error) => {
        alert("Try Searching SomeOther Image");
        window.location.reload();
      });
  };
  backupload = () => {
    this.setState({ isUpload: false, isCrop: false, isNotfound: false });
  };
  backcrop = () => {
    this.setState({ isUpload: true, isCrop: false, isNotfound: false });
  };
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

  searchedtext = (event) => {
    let variable = event.target.value;
    this.setState({
      ques_text: variable,
    });
  };
  onSubmitHandler = (e) => {
    e.preventDefault();
    this.setState({
      isUpload: false,
      isCrop: true,
      isNotfound: false,
    });
    var formdata = new FormData();
    formdata.append("student_username", this.state.student);
    formdata.append("question_text", this.state.ques_text);
    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
      headers: {
        Authorization: "Token " + this.state.token,
      },
    };
    fetch(Config.SERVER_URL + "student/student-queries-text/", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.Success) {
          this.setState({
            isNotfound: true,
            isCrop: false,
            isUpload: false,
          });
        } else {
          this.props.history.push({
            pathname: "/student/doubtsolutions",
            state: {
              question: this.state.ques_text,
              solutions: data,
              search_type: "text",
            },
          });
        }
      })
      .catch((error) => {
        alert("Try Searching SomeOther Image");
        window.location.reload();
      });
  };
  handleClick = (e) => {
    this.refs.fileUploader.click();
  };
  render() {

    if (this.state.isUpload) {
      return (
        <div class="crop-img-container">
          <h3>Crop Image</h3>

          <div class="crop-img-box">
            <ReactCrop className="crop-box" onImageLoaded={this.onImageLoaded} src={this.state.ques_url} crop={this.state.crop} onChange={this.onCropChange} minHeight={100} minWidth={200} />

            <div class="crop-btns">
              <button type="submit" onClick={this.getCroppedImg}>Submit</button>
              <button type="submit" class="blue-cropper" onClick={this.backupload}>Back</button>
              {/*  <p>Crop the image such that only one question is selected
        in the cropped image.</p>
          */}
            </div>
          </div>
        </div>
      )
    }

    if (this.state.isCrop) {
      return (
        <div class="finding-solution-container">
          <div class="finding-solution-content">
            <img src={Finding} alt="finding your solution" />
            <p>Finding Your Solution</p>
          </div>
        </div>
      )
    }

    if (this.state.isNotfound) {
      return (
        <div class="solution-not-found-container">
          <div class="solutions-not-found-content">
            <img src={NotFound} alt="solution not found" />
            <p>We currently do not have any matching solution to this question.Don't worry! Our teachers are working on
              your doubt and will send you the solution within 6 hours</p>
          </div>

          <button onClick={this.backupload}>Search Another Question</button>
        </div>
      )
    }

    return (
      <div className="doubt-module-input-container">
        <div class="doubt-module-input-title">
          <h2>Have a Doubt?</h2>
          <p>Post It Here!</p>
        </div>

        <div class="doubt-module-input-fields">
          <div class="camera-input">
            <input type="file" accept="image/*" ref="fileUploader" onChange={this.onUploadClick} />
            <div class="camera-input-flex" onClick={this.handleClick}>
              <p>Upload Picture of Your Doubt</p>
            </div>
          </div>

          <div class="search-input">
            <form onSubmit={this.onSubmitHandler}>
              <input type="text" name="search" placeholder="Type your Doubt Here" onChange={this.searchedtext} />
              <button type="submit"></button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default studentdoubt;
