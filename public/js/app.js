console.log('client side js is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const radioUnit = document.querySelector('#r')
const weatherIcon = document.querySelector('#weather-icon')
const time = document.querySelector('#time')
const cityName = document.querySelector('#location')


fetch("http://ip-api.com/json/?fields=status,city").then((response) => {
    response.json().then((data) => {
        if(data.status  === "success") {
            cityName.textContent = data.city
        } 
    })
})


const date = new Date(1602871200*1000)
console.log(date)
time.textContent = date.toLocaleString()

function changeButton() {
    if(document.getElementById('f').checked === true) {
        return unit = document.getElementById('f').value
    } else {
        return unit = document.getElementById('m').value
    }
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent =''


    let unit = changeButton()


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