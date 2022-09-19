const apiKey = '729d4f97c05ea2a44cbd97e71a6e7d0a'
const apiCountryURL = 'https://countryflagsapi.com/png/'

const cityInput = document.querySelector('#city-input')
const searchBtn = document.querySelector('#search')

const cityElement = document.querySelector('#city')
const temperatureElement = document.querySelector('#temperature span')
const descElement = document.querySelector('#description')
const weatherIconElement = document.querySelector('#weather-icon')
const countryElement = document.querySelector('#country')
const humidityElement = document.querySelector('#humidity span')
const windElement = document.querySelector('#wind span')

const weatherContainer = document.querySelector('#weather-data')
const weatherSuggestions = document.querySelector('#weather-suggestions')

const dataSuggestions = [
  'New York',
  'Genebra',
  'Osaka',
  'Curitiba',
  'Vancouver'
]

//Functions
const getWeatherData = async city => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

  const res = await fetch(apiWeatherURL)
  const data = await res.json()

  return data
}

function getValue(id) {
  weatherSuggestions.classList.add('hide')
  showWeatherData(dataSuggestions[id])
}

const showWeatherData = async city => {
  const data = await getWeatherData(city)

  cityElement.innerHTML = data.name
  temperatureElement.innerHTML = parseInt(data.main.temp)
  descElement.innerHTML = data.weather[0].description
  weatherIconElement.setAttribute(
    'src',
    `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  )
  countryElement.setAttribute('src', apiCountryURL + data.sys.country)
  humidityElement.innerHTML = `${data.main.humidity}%`
  windElement.innerHTML = `${data.wind.speed}km/h`

  weatherContainer.classList.remove('hide')
}

//Events
weatherSuggestions.classList.remove('hide')

dataSuggestions.map((nome, i) => {
  let id = '<div id="' + i + '"'
  weatherSuggestions.innerHTML +=
    id + ' onClick="' + 'getValue(' + i + ')">' + nome + '</div><br>'
})

searchBtn.addEventListener('click', e => {
  e.preventDefault()

  const city = cityInput.value

  weatherSuggestions.classList.add('hide')
  showWeatherData(city)
})

cityInput.addEventListener('keyup', e => {
  if (e.code === 'Enter') {
    const city = e.target.value

    weatherSuggestions.classList.add('hide')
    showWeatherData(city)
  }
})
