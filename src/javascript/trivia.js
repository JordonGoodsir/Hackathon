// Gets the details from the trivia api
async function fetchTrivaJSON(number, category, difficulty, type) {
  // This is the format the trivia api is in when all categories are selected
  let api = `https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${difficulty}&type=${type}`
  
  // If any selection is any it is removed from the above api
  if (category === 'any') { api = api.replace(`&category=${category}`, '')}
  if (difficulty === 'any') { api = api.replace(`&difficulty=${difficulty}`, '') }
  if (type === 'any') { api = api.replace(`&type=${type}`, '') }  
  
  const response = await fetch(api)
  const trivia = await response.json()
  return trivia
}

// Converts text into html friendly text
function decodeHtml(html) {
  let txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

const questions = document.getElementById('questions')

// Generates the list of questions and displays them to the screen
function getQuestions() {
  // Gets data from the form and allocates it to the right area
  let formEl = document.forms.formdata; 
  let formData = new FormData(formEl);
  let questionNumber = formData.get('trivia_amount')
  let category = formData.get('trivia_category')
  let difficulty = formData.get('trivia_difficulty')
  let type = formData.get('trivia_type')

  // Wipes previously loaded data
  questions.innerHTML = ""

  // Uses the api to generate the question list
  fetchTrivaJSON(questionNumber, category, difficulty, type).then(trivia => {
    trivia.results.map(question =>  {

      // Creates element for questions to be added to
      let thisQuestion = document.createElement('p')
      thisQuestion.textContent = `${decodeHtml(question.question)}`
      thisQuestion.style.fontWeight = '800'

      // Creates list for display purposes
      let ul = document.createElement('ul')
      let correctAnswer = document.createElement('li')
      ul.style.fontWeight = '400'

      // Shows the correct answer
      correctAnswer.textContent = `Correct Answer: ${decodeHtml(question.correct_answer)}`
      thisQuestion.appendChild(ul).appendChild(correctAnswer)
      correctAnswer.style.fontWeight = '500'

      // Loops through all incorret options and displays them
      for (answer in question.incorrect_answers) {
        let li = document.createElement('li')
        li.textContent = decodeHtml(question.incorrect_answers[answer])
        ul.appendChild(li)
      }

      questions.appendChild(thisQuestion)
    })
  })
}

const triviaButton = document.getElementById('trivia-button')

// Sets click event
triviaButton.addEventListener('click', getQuestions)