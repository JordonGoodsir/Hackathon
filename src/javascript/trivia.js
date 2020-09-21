async function fetchTrivaJSON(number, category, difficulty, type) {
  let api = `https://opentdb.com/api.php?amount=${number}&category=${category}&difficulty=${difficulty}&type=${type}`
  if (category === 'any') { api = api.replace(`&category=${category}`, '')}
  if (difficulty === 'any') { api = api.replace(`&difficulty=${difficulty}`, '') }
  if (type === 'any') { api = api.replace(`&type=${type}`, '') }  
  const response = await fetch(api)
  const trivia = await response.json()
  return trivia
}

function decodeHtml(html) {
  let txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

const questions = document.getElementById('questions')

function getQuestions() {
  let formEl = document.forms.formdata; 
  let formData = new FormData(formEl);
  let questionNumber = formData.get('trivia_amount')
  let category = formData.get('trivia_category')
  let difficulty = formData.get('trivia_difficulty')
  let type = formData.get('trivia_type')

  questions.innerHTML = ""

  fetchTrivaJSON(questionNumber, category, difficulty, type).then(trivia => {
    trivia.results.map(question =>  {
      let thisQuestion = document.createElement('p')
      thisQuestion.textContent = `${decodeHtml(question.question)}`

      let ul = document.createElement('ul')
      let correctAnswer = document.createElement('li')

      correctAnswer.textContent = `Correct Answer: ${decodeHtml(question.correct_answer)}`
      thisQuestion.appendChild(ul).appendChild(correctAnswer)

      for (answer in question.incorrect_answers) {
        let li = document.createElement('li')
        li.textContent = decodeHtml(question.incorrect_answers[answer])
        ul.appendChild(li)
      }

      questions.appendChild(thisQuestion)
    })
  })
}



