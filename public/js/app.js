console.log('client side js is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const radioUnit = document.querySelector('#r')
const weatherIcon = document.querySelector('#weather-icon')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent =''

    let unit = 'm'


    fetch('/weather?address=' + location + '&unit=' + unit).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                radioUnit.textContent = data.unit
                weatherIcon.src = data.image
                console.log(data.location)
                console.log(data.forecast)
                console.log(data.unit)
                console.log(weatherIcon.src)
            }
        })
    })

    console.log(location)
})