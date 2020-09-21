let btn = document.getElementById('cat')

let modalPic = document.getElementById('modal_pic')



function getRandomNumberForKittenAPI() {
  let suitableNumber = Math.floor(Math.random() * 15) + 1;
  return suitableNumber;
}

function displayKitten() {

  modalPic.innerHTML = ''
  const catPic = document.getElementById('cat-pic')  
  let catImage = document.createElement('img')
  catImage.src = `https://placekitten.com/200/300?image=${getRandomNumberForKittenAPI()}`
  modalPic.appendChild(catImage)

}


let modal = document.getElementById('myModal')


let span = document.getElementsByClassName('close')[0]

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = 'block'
  displayKitten()
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = 'none'
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}