console.log('client side app3.js is loaded ')

const artistsByType = document.querySelector('#artists-by-type')
const tagSelect = document.querySelector('#tags')
const tags = document.querySelector('#tags')
console.log(tagSelect)

//Genrate picklist
const tagArray = ['Piano', 'Disco', 'Rock', 'Classical', 'Rock', 'Dance', 'Jazz', 'Punk', 'Metal', 'Blues', 'Country', 'Heavy Metal', 'Pop', 'House', 'Chili']
  
const tagArrayMap = `
    ${tagArray.map(tag =>
        `
            <option value="${tag.toLowerCase()}">${tag}</option>
        `
    ).join('')}`

tags.innerHTML = ` <option value="type">Choose music type</option>
                    ${tagArrayMap}`

console.log(tagArrayMap)

//Update page on dropdown change
tagSelect.addEventListener('change', (e) => {
    let value = e.target.value
    console.log(value)
    fetchArtists(e.target.value)
})

//Fetch artists
function fetchArtists(tag) {
    const url = 'http://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=' + tag + '&api_key=c2223c30be336e50fdd318988e98413a&format=json&limit=10'

    fetch(url)
    .then((response) => {
        response.json().then((data) => {
            const top = Object.entries(data.topartists.artist)
            console.log(top)

            const topListMap = `
            ${top.map(artist =>
                `
                <section class="section-artist">
                        <h4 class="artist-name"><a target="_blank" href="${artist[1].url}">${artist[1].name}</a></h4>
                    <a target="_blank" class="artist-image" href="${artist[1].url}"><img class="artist-image" src="${artist[1].image[1]['#text']}"></a>
                </section>
                `
         ).join('')}
    `;
    console.log(topListMap)

    artistsByType.innerHTML = topListMap
        
        })
    })     
}