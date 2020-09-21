async function fetchTrivaJSON() {
  const response = await fetch('https://opentdb.com/api.php?amount=10')
  const trivia = await response.json()
  return trivia
}

function decodeHtml(str){
  let map =
    {
        '&amp;': '&',
        '&lt;': '<',
        '&gt;': '>',
        '&quot;': '"',
        '&#039;': "'"
    };
    return str.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function(m) {return map[m];});
}

const questions = document.getElementById('questions')

function getQuestions() {
  questions.innerHTML = ""
  fetchTrivaJSON().then(trivia => {
    console.log(trivia.results)
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

document.getElementById("button").addEventListener("click", getQuestions)