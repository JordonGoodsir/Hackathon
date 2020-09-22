// Sets up for modal use when cat button is clicked
let btn = document.getElementById('cat')
let modalPic = document.getElementById('modal_pic')
let modal = document.getElementById('myModal')
let span = document.getElementsByClassName('close')[0]
let catAudio = new Audio('audio/meow.wav')

// Returns a random number to display cat. Currently there are 16 random cat images available
function getRandomNumberForKittenAPI() {
  let suitableNumber = Math.floor(Math.random() * 15) + 1;
  return suitableNumber;
}

// Displays cat and meows
function displayKitten() {
  // Sets audio to 0 time so it will restart on click of button
  catAudio.currentTime = 0;  
  catAudio.play()

  // Removes old image
  modalPic.innerHTML = ''

  const catPic = document.getElementById('cat-pic')  
  let catImage = document.createElement('img')
  catImage.src = `https://placekitten.com/200/300?image=${getRandomNumberForKittenAPI()}`
  modalPic.appendChild(catImage)

}

btn.onclick = function() {
  modal.style.display = 'block'
  displayKitten()
}

span.onclick = function() {
  modal.style.display = 'none'
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Converts text into html friendly text
function decodeHtml(html) {
  let txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}  

let audio = new Audio("resources/ohh.mp4") 
audio.volume = 0.02 

insult = async () => {    
  document.getElementById("insultDiv").innerHTML = "" 

  const proxyurl = "https://cors-anywhere.herokuapp.com/";
  const url = "https://evilinsult.com/generate_insult.php?lang=en&type=json";
  fetch(proxyurl + url)
      .then(response => response.json())
      .then(contents => { 
          h5 = document.createElement("H5");
          pText = document.createTextNode(decodeHtml(contents.insult))  
          let insultGif = document.createElement('img')
          h5.appendChild(pText)  

          insultGif.src = 'https://media1.tenor.com/images/81ed4fdd6bc5d2611b8caaaa3fbe9e9d/tenor.gif?itemid=15863050'

          h5.style.padding = "1.2rem"

          document.getElementById("insultDiv").appendChild(h5)   
          document.getElementById("insultDiv").appendChild(insultGif)
          
          audio.play() 

          setTimeout(function(){
              document.getElementById("insultDiv").innerHTML = "";
      },5000); 
      })
      .catch(() => { 
          h5 = document.createElement("H5");
          pText = document.createTextNode("You've been insulted enough")  
          h5.appendChild(pText)  

          h5.style.padding = "1.2rem"

          document.getElementById("insultDiv").appendChild(h5)  

          setTimeout(function(){
              document.getElementById("insultDiv").innerHTML = "";
      },5000); 
  }) 
}  

document.getElementById("insult").addEventListener("click",insult) 
