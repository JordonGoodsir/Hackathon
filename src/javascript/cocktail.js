window.onload = function() {
  if (confirm('Please select ok if you are over legal drinking age.')) {
  // Save it!
  } else {
    // Do nothing!
    alert(`Sorry you're too young to be here`)
    window.open('index.html', '_self')};
}

async function fetchCocktailJSON() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
  const cocktail = await response.json();
  return cocktail;
}

function getCocktail() {
  fetchCocktailJSON().then(cocktail => {
    let thisDrink = cocktail.drinks[0]
    let cocktailDiv = document.getElementById('cocktail')
    let drinkName = document.createElement('h5')
    let drinkImage = document.createElement('img')

    cocktailDiv.classList.add('card')

    cocktailDiv.innerHTML = ''

    drinkName.textContent = `${thisDrink.strDrink}`

    drinkImage.src = `${thisDrink.strDrinkThumb}`
    drinkImage.width = '200'
    drinkImage.height = '200'

    cocktailDiv.appendChild(drinkName)
    cocktailDiv.appendChild(drinkImage)

    for (item in thisDrink) {
      if (item.includes('strGlass')) {
        let glass = document.createElement('p')
        glass.textContent = `Recommended glass: ${thisDrink[item]}`
        cocktailDiv.appendChild(glass)
      }
      if (item.includes('strIngredient') && thisDrink[item] !== null && thisDrink[item]  !== '') {
        let strMeasure = `strMeasure${item.slice(-1)}`
        if (!isNaN(item.slice(-2))) { strMeasure = `strMeasure${item.slice(-2)}` }
        let ingredient = document.createElement('p')
        ingredient.textContent = (thisDrink[strMeasure] === null) ?`Ingredient: ${thisDrink[item]}` : `Ingredient: ${thisDrink[item]} - measure ${thisDrink[strMeasure]}`

        cocktailDiv.appendChild(ingredient)
      }
    }

    let instructions = document.createElement('p')
    instructions.textContent = `Instructions: ${thisDrink.strInstructions}`
    cocktailDiv.appendChild(instructions)
  })
}

let cocktailButton = document.getElementById('cocktail-button')
cocktailButton.addEventListener('click', getCocktail)