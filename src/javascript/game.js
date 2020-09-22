// on click function

// counts clicks

// and makes cube appear on random spot on screen

// and reduce size

let clickCount = 0;
let height = 10;
let width = 10;

let box = document.getElementById("game_box");
let gameMessage = document.getElementById("game_message");

reload = () => {
  location.reload();
};

game = () => {
  clickCount++;
  box.style.width = `${width--}rem`;
  box.style.height = `${height--}rem`;

  box.style.top = `${Math.floor(Math.random() * 90) + 1}%`;
  box.style.left = `${Math.floor(Math.random() * 90) + 1}%`;

  switch (clickCount) {
    case 1:
      game_message.innerHTML = "O it moves, where'd it go?";
      break;

    case 3:
      game_message.innerHTML = "Kinda annoying right";
      break;

    case 5:
      game_message.innerHTML = "Feel free to give up :)";
      break;

    case 8:
      game_message.innerHTML =
        "I mean no one will blame you, this is really difficult";
      break;

    case 10:
      game_message.innerHTML = "hehehe you'll never find me now";
      break;

    case 11:
      game_message.innerHTML = "you beat me :(";
      let btn = document.createElement("BUTTON");
      let btnText = document.createTextNode("Again?");

      btn.appendChild(btnText);

      btn.classList.add("game_buttons");

      document.getElementById("try_again").appendChild(btn);

      document
        .getElementsByClassName("game_buttons")[0]
        .addEventListener("click", reload);

      break;
  }
};

box.addEventListener("click", game);
