/* selectors */
const pokemonInputBtn = document.querySelector('#pokemonInputBtn')
const dexPokeImg = document.querySelector('#dexPokeImg')
const dexText = document.querySelector('#dexText')

pokemonInputBtn.addEventListener('click', getFetch)

function getFetch(){
  const userInput = document.querySelector('#pokemonInput').value.toLowerCase()
  const url = `https://pokeapi.co/api/v2/pokemon/${userInput}`

  fetch(url)
    .then(res => res.json())
    .then(data => {
      const pokeName = data.name[0].toUpperCase() + data.name.substring(1)
      const pokeType = data.types[0].type.name
      const pokeImg = `../img/pokemon-by-id/${data.id}.webp`
      const pokeBlurb = `${pokeName} is a ${pokeType} type pokemon. ${pokeName}'s average height is ${((data.height * 30.3) / 100).toFixed(2)} feet and their average weight is ${data.weight} pounds.`

      dexPokeImg.src = pokeImg
      dexPokeImg.type = `The screen is showing a picture of ${pokeName}.`
      dexText.innerText = pokeBlurb
      playText(pokeBlurb)
    })
    .catch(err => {
      dexText.innerText = `Invalid input! Enter a Pokemon from the Kanto Region. Make sure it is spelled correctly.`
      console.log(`error ${err}`)
    });
}

function playText(text) {
  const utterance = new SpeechSynthesisUtterance(text)
  speechSynthesis.getVoices()
  speechSynthesis.speak(utterance)
}