console.log('client side js is loaded')

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const time = document.querySelector('#time')
const cityName = document.querySelector('#location')
const allNextDaysHeader = document.querySelector('#all-next-days-header')

//Get city name based on coordinates from API
fetch("http://ip-api.com/json/?fields=status,city").then((response) => {
    response.json().then((data) => {
        if(data.status  === "success") {
            cityName.textContent = data.city
        } 
    })
})

//Get current date
const date = new Date()
console.log(date)
time.textContent = date.toLocaleDateString()

//Get unit using radio buttons
function changeButton() {
    if(document.getElementById('f').checked === true) {
        return unit = document.getElementById('f').value
    } else {
        return unit = document.getElementById('m').value
    }
}

//Get data from APIs
weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    //get value from input
    const location = search.value

    messageOne.textContent = 'Loading...'
  

    //get value from radio butons
    let unit = changeButton()

    //get data from back end
    fetch('/weather?address=' + location + '&unit=' + unit).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
            } else {
               
                messageOne.innerHTML = `<div class="weather-desc-wrapper-two">
                                            <div>
                                                <p>Location: ${data.location}</p>
                                                ${data.forecast}
                                            </div>
                                            <div class="weather-icon"> 
                                                <img src=${data.image}>
                                            </div>
                                        </div>`
               
               
                console.log(data.location)
                console.log(data.forecast)
                console.log(data.unit)
              
                //Get data from new fetch - forecast 7 days
                fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${data.latitude}&lon=${data.longitude}&exclude=current,minutely,hourly&appid=15f27c62eb4bf00f92f51cb7cd507a08&units=${(unit === 'f' ? 'standard' : 'metric')}`)
                .then((response) => {response.json()
                .then((data) => {
                    
                    console.log(data.daily)
                    let daily = Object.entries(data.daily)

                    console.log(daily)

                    let nextDayMap = `
                    ${daily.map(day =>
                            `
                                <table>
                                    <tr class="table-row">
                                        <td>${new Date(day[1].dt*1000).toLocaleDateString()}</td>
                                        <td>${day[1].weather[0].main}</td>
                                        <td>${day[1].temp.day}</td>
                                        <td>${day[1].feels_like.day}</td>
                                        <td>${day[1].humidity}</td>    
                                         
                                    </tr>
                                </table>
                            `
                     ).join('')}
                `;
                console.log(nextDayMap)
                    
                allNextDaysHeader.innerHTML = `<div class="all-next-days-wrapper">
                                                <div class="all-next-days-header">
                                                    <h2>Summary weather data and forecast for next 7 days</h2>
                                                </div>
                                                <div class="all-next-days-title">
                                                        <p>Description</p>
                                                        <p>Temperature</p>
                                                        <p>Feels Like Temperature</p>
                                                        <p>Humidity</p>
                                                </div>
                                                <div>
                                                    ${nextDayMap}
                                                </div>
                                              </div>`
              
              
                    let nexDateData = data
                    console.log(nexDateData)
        
                 })
            })

        }
        })
    })

    console.log(location)
})





