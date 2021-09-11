import {Component} from 'react';
import style from './nav.module.css';
class Navcomp extends Component {
  render(){
  return (
    <nav class={style.navbar} id="navbg">
      <div class="container-fluid">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <svg width="195" height="51" viewBox="0 0 195 51" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M38.3515 23.275L0.5 12.2767L38.3515 0L76.2031 12.2767L72.7138 12.9666C72.7138 16.2134 72.7138 19.4601 72.7138 22.6865C74.0402 23.1938 74.9788 24.249 74.9788 25.9738C74.9788 27.6987 73.3872 29.4844 71.4487 29.4844C69.4898 29.4844 67.9186 27.6987 67.9186 25.9738C67.9186 24.249 68.8572 23.1938 70.204 22.6865C70.204 19.6427 70.204 16.5786 70.204 13.5348L38.3515 23.275Z" fill="#2B337A"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M21.5417 38.3162L36.5023 42.9192V47.7063L14.1633 40.8121V36.0454L29.4297 30.8492L14.1633 26.1439V21.3568L36.5023 28.2511V28.4352V33.0177V33.2223L21.5417 38.3162ZM40.5992 42.9192L62.9383 35.6567V40.4438L40.5992 47.7063V42.9192ZM40.5992 28.2306L62.9383 20.9681V25.7552L40.5992 33.0177V28.2306ZM40.5992 35.5749V40.362L57.2516 34.9407V30.1536L40.5992 35.5749ZM38.6221 51L65.4453 42.285C65.4453 28.6193 65.4453 33.9792 65.4453 17.5312L38.5813 26.2667L11.6562 17.9609C11.6562 34.6952 11.6562 27.0032 11.6562 42.6737L38.6221 51Z" fill="#029EDC"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M126.555 21.5156C123.822 21.5562 121.726 22.5717 120.534 24.765V21.6578H116.445V38.25H120.534V30.0859C120.534 27.3645 122.158 25.3336 124.932 25.3133C127.254 25.3133 128.672 26.7349 128.672 29.0704V38.25H132.781V27.8926C132.761 23.9527 130.418 21.5156 126.555 21.5156Z" fill="#029EDC"/>
          <path d="M111.266 21.5156H107.281V38.25H111.266V21.5156Z" fill="#029EDC"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M109.473 14.7422C108.182 14.7422 107.281 15.6586 107.281 16.9336C107.281 18.2086 108.182 19.125 109.473 19.125C110.763 19.125 111.664 18.2086 111.664 16.9336C111.664 15.6586 110.742 14.7422 109.473 14.7422Z" fill="#029EDC"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M85.3785 16.3359L85.358 20.0019H97.8765L84.9688 35.2599V38.25H103.695V34.584H90.6441L103.531 19.2851V16.3359H85.3785Z" fill="#2B337A"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M190.176 21.1172V29.4863C190.176 32.2068 188.662 34.3042 186.092 34.3458C183.901 34.3458 182.586 32.9129 182.586 30.5454V21.1172H178.602V31.7499C178.602 35.7579 180.853 38.25 184.498 38.25C187.088 38.25 189.041 37.2116 190.156 34.948V38.0838H194.141V21.1172H190.176Z" fill="#029EDC"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M169.782 14.7628V24.0302C168.565 22.1398 166.658 21.1123 164.101 21.1123C159.454 21.1123 156.289 24.544 156.289 29.6195C156.289 34.7362 159.454 38.25 164.202 38.25C166.678 38.25 168.606 37.2226 169.782 35.3526V38.0445H173.82V14.7422H169.782V14.7628ZM165.075 34.8184C162.275 34.8184 160.388 32.7224 160.368 29.7017C160.408 26.7221 162.315 24.5851 165.075 24.5851C167.875 24.5851 169.782 26.681 169.782 29.7017C169.782 32.7018 167.855 34.8184 165.075 34.8184Z" fill="#029EDC"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M137.164 34.2656V37.8516H153.5V34.2656H141.34H137.164Z" fill="#2B337A"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M137.164 25.1016V28.6675H143.273V28.6875H151.906V25.1016H141.338H137.164Z" fill="#2B337A"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M137.164 15.9375V19.9219H141.331H143.263H153.102V15.9375H137.164Z" fill="#2B337A"/>
          </svg>
        </div>
        <div class="collapse navbar-collapse" id={style.myNavbar}>
          <ul class="nav navbar-nav navbar-right" id="close">
          
            <li class="dropdown"><a class="dropdown-toggle" data-toggle="dropdown" href="#" id="navbarexam">Exam <img class="x-primary-color" src="https://anima-uploads.s3.amazonaws.com/projects/5fec5bb9441305656b529bd5/releases/5ff41816295716dffeabdfed/img/---primary-color@2x.svg"/></a>
            <ul class="dropdown-menu">
            <li><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
          </ul></li>
          <li><a href="#quiz" id="navbarquiz">Quiz</a></li>
            <li><a href="#products" id="navbarassign">My Assignment</a></li>
            <li><a href="#contact" id="navbarvideo">Video Lectures</a></li>
            <i id={style.icon1} class="fas fa-bell"></i>
            <img id="img1" height="45px" width="auto" class="rectangle-2" src="https://anima-uploads.s3.amazonaws.com/projects/5fec5bb9441305656b529bd5/releases/5ff41816295716dffeabdfed/img/rectangle-2@2x.jpg"/>
            <img class="x-primary-color" src="https://anima-uploads.s3.amazonaws.com/projects/5fec5bb9441305656b529bd5/releases/5ff41816295716dffeabdfed/img/---primary-color@2x.svg"/>
          </ul>
        </div>
      </div>
    </nav>

  );
}
}
export default Navcomp;

