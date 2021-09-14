 //------fullscreen-------

 let fullScreen = document.querySelector('.fullscreen');

 fullScreen.onclick = function () {
     if (document.fullscreenElement) {
         document.exitFullscreen();
     }
        else {
                document.documentElement.requestFullscreen();
        }
 }; 

 //------------------------значения------------------\\

function fun1() {
  let rng=document.getElementById('blur'); 
  let p=document.getElementById('one'); 
  p.innerHTML=rng.value;
}
function fun2() {
    let rng=document.getElementById('invert'); 
    let p=document.getElementById('two'); 
    p.innerHTML=rng.value;
  }
  function fun3() {
    let rng=document.getElementById('sepia'); 
    let p=document.getElementById('three'); 
    p.innerHTML=rng.value;
  }
  function fun4() {
    let rng=document.getElementById('saturate'); 
    let p=document.getElementById('four'); 
    p.innerHTML=rng.value;
  }
  function fun5() {
    let rng=document.getElementById('hue'); 
    let p=document.getElementById('five'); 
    p.innerHTML=rng.value;
  }


//----------------reset---------------------------------------//
const filters = document.querySelector('.filters');
const reset = document.querySelector('.btn-reset');
const root = document.querySelector(':root');

reset.addEventListener('click', filtersReset);
function filtersReset() {
    const filtersInputs = filters.getElementsByTagName('input');

    for (let item of filtersInputs) {
        let resetItem;

        if (item.name === 'blur') {
          resetItem = 'px';
        } else if (item.name === 'invert' || item.name === 'sepia' || item.name === 'saturate') {
          resetItem = '%';
        } else {
          resetItem = 'deg';
        }
        
        item.value = item.attributes.value.value;
        item.nextElementSibling.value = item.attributes.value.value;
        root.style.setProperty(`--${item.name}`, `${item.value}${resetItem}`);
    }

};
//------------------------SAVE-------------------//
const canvas = document.querySelector('.canvas');
const download = document.querySelector('.btn-save');
const outputs = document.querySelectorAll("output");

function drawImage() {
  const img = new Image();
  img.setAttribute('crossOrigin', 'anonymous'); 
  img.src = imageContainer.src;
  img.onload = function() {
    canvas.width = img.width;
    
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        const coefficient = img.width >= img.height ? img.width / 830 : img.height / 520
        ctx.filter = `blur(${Math.floor((coefficient !== 0 ? coefficient * outputs[0].value : 1 * outputs[0].value) * 100) / 100}px) invert(${outputs[1].value}%) sepia(${outputs[2].value}%) saturate(${outputs[3].value}%) hue-rotate(${outputs[4].value}deg)`;
        console.log(outputs[0]);
        ctx.drawImage(img, 0, 0);
        let link = document.createElement('a');
        link.download = 'download.png';
        link.href = canvas.toDataURL();
        link.click();
        link.delete;
    }
};
download.addEventListener('click', drawImage)

//----------------------LOAD------------------//
const uploadImg = document.querySelector('.btn-load--input')
const img = document.querySelector('img')
const imageContainer = document.querySelector(".btn-img");
function uploadImage() {
  const file = uploadImg.files[0]
  const reader = new FileReader()
  reader.onload = () => {
    const newImg = new Image()
    newImg.src = reader.result
    img.src = newImg.src
  }
  reader.readAsDataURL(file)
  uploadImg.value = ''
}
uploadImg.addEventListener('change', uploadImage)

//------------------filters------//

const inputs = document.querySelectorAll(".filters input");

function handleUpdate() {
  
    const suffix = this.dataset.sizing;
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
    this.nextElementSibling.textContent = this.value;
}

inputs.forEach(input => input.addEventListener("input", handleUpdate));

//---------------------NEXT-------------------------------//
const base = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';
const images = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
const btn = document.querySelector('.btn-next');
let i = 0;

function viewBgImage(src) {  
  const img = new Image();
  img.src = src;
  img.onload = () => {      
    imageContainer.src = src;
  }; 
}
function getTime() {
    
    let time = new Date().getHours();
    if (time >= 6 && time < 12) { return "morning/"; }
    if (time >= 12 && time < 18) { return "day/"; }
    if (time >= 18 && time < 24) { return "evening/"; }
    if (time >= 24 && time < 6) { return "night/"; }
}
function getImage() {
 
  const index = i % images.length;
  const imageSrc = base + getTime() + images[index];
  viewBgImage(imageSrc);
  i++;
  btn.disabled = true;
  setTimeout(function() { btn.disabled = false }, 1000);
} 

btn.addEventListener('click', getImage);