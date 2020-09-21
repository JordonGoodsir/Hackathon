let btn = document.getElementById('cat')
let modalPic = document.getElementById('modal_pic')
let modal = document.getElementById('myModal')
let span = document.getElementsByClassName('close')[0]
let catAudio = new Audio('audio/meow.wav')


function getRandomNumberForKittenAPI() {
  let suitableNumber = Math.floor(Math.random() * 15) + 1;
  return suitableNumber;
}


function displayKitten() {
  catAudio.currentTime = 0;
  
  catAudio.play()

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