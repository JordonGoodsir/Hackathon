const questions = document.getElementById("questions");
const triviaButton = document.getElementById("trivia-button");

// Gets the details from the trivia api
async function fetchTrivaJSON(number, category, difficulty, type) {
  // This is the format the trivia api is in when all categories are selected
  let api = `https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${difficulty}&type=${type}`;

  // If any selection is any it is removed from the above api
  if (category === "any") {
    api = api.replace(`&category=${category}`, "");
  }
  if (difficulty === "any") {
    api = api.replace(`&difficulty=${difficulty}`, "");
  }
  if (type === "any") {
    api = api.replace(`&type=${type}`, "");
  }

  const response = await fetch(api);
  const trivia = await response.json();
  return trivia;
}

// Converts text into html friendly text
function decodeHtml(html) {
  let txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function showAnswer(answerDiv) {
  answerDiv.addEventListener("click", function () {
    if (answerDiv.classList.contains("text-danger")) {
      answerDiv.classList.add("text-light");
      answerDiv.classList.remove("text-danger");
    } else {
      answerDiv.classList.remove("text-light");
      answerDiv.classList.add("text-danger");
    }
  });
}

function shuffleArray(array) {
  var j, x, i;
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
  return array;
}

// Generates the list of questions and displays them to the screen
function getQuestions() {
  // Gets data from the form and allocates it to the right area
  let formEl = document.forms.formdata;
  let formData = new FormData(formEl);
  let questionNumber = formData.get("trivia_amount");
  let category = formData.get("trivia_category");
  let difficulty = formData.get("trivia_difficulty");
  let type = formData.get("trivia_type");

  // Wipes previously loaded data
  questions.innerHTML = "";

  // Uses the api to generate the question list
  fetchTrivaJSON(questionNumber, category, difficulty, type).then((trivia) => {
    trivia.results.map((question) => {
      // Creates element for questions to be added to and adds styling
      let thisQuestion = document.createElement("p");
      thisQuestion.textContent = `${decodeHtml(question.question)}`;
      thisQuestion.style.fontWeight = "700";
      thisQuestion.classList.add("card", "bg-dark", "text-light", "p-1");

      // Generates an array for the answers to be stored in and shuffles the array
      let answers = question.incorrect_answers;
      answers.push(question.correct_answer);
      answers = shuffleArray(answers);

      // Iterates through each answer and displays it below the question
      answers.map((answer) => {
        let eachAnswer = document.createElement("p");
        eachAnswer.textContent = decodeHtml(decodeHtml(answer));
        eachAnswer.style.fontWeight = "400";
        thisQuestion.appendChild(eachAnswer);
      });

      // Creates the correct answer element and adds styling so it isn't readable
      let correctAnswer = document.createElement("p");
      correctAnswer.textContent = `Correct Answer: ${decodeHtml(question.correct_answer)}`;
      correctAnswer.classList.add("bg-danger", "text-danger");

      thisQuestion.appendChild(correctAnswer);
      correctAnswer.style.fontWeight = "500";

      questions.appendChild(thisQuestion);

      // Calls function to hide answer
      showAnswer(correctAnswer);
    });
  });
}
// Sets click event
triviaButton.addEventListener("click", getQuestions);
