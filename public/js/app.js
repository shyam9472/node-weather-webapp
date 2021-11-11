const weatherForm = document.querySelector('form')
const searchVal = document.querySelector('input')
const messageOne = document.querySelector("#searchResult")
const messageTwo = document.querySelector("#forecast")
messageOne.textContent = ''
messageTwo.textContent = ''

weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  messageOne.textContent = 'Loading...'
  fetch('/weather?address=' + searchVal.value).then((response) => {
    response.json().then((data) => {
      if(data.error) {
          messageOne.textContent = data.error
          messageTwo.textContent = ''
      }
      else {
          messageOne.textContent = data.location
          messageTwo.textContent = data.forecastData
      }
    })
  })
  searchVal.value = ''
})