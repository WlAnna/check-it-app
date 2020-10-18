console.log('client side app2.js is loaded ')

const topArtistForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})




//get data from APIs
topArtistForm.addEventListener('submit', (e) => {
    e.preventDefault()

    //get value from input
    const location = search.value
    messageOne.textContent = 'Loading...'

    fetch('http://localhost:3000/topArtist2?address=' + location).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
            } else {
                console.log(data.topArt)

                let artists = Object.entries(data.topArt)
                console.log(artists)

                let topArtistMap = `
                ${artists.map(artist =>
                        `
                        <section>
                          
                                <h2 class="artist-name"><a target="_blank" href="${artist[1].url}">${artist[1].name}</a></h2>
                          
                            <a target="_blank" class="artist-image" href="${artist[1].url}"><img src="${artist[1].image[1]['#text']}"></a>
                        </section>
                        `
                 ).join('')}
            `;
            console.log(topArtistMap)

            messageOne.innerHTML = topArtistMap










            }
            
        })
    })
    


})