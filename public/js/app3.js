console.log('client side app3.js is loaded ')

const artistsByType = document.querySelector('#artists-by-type')
const tagSelect = document.querySelector('#tags')
console.log(tagSelect)


tagSelect.addEventListener('change', (e) => {
    let value = e.target.value
    console.log(value)
    fetchArtists(e.target.value)
})

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
                <section>
                        <h2 class="artist-name"><a target="_blank" href="${artist[1].url}">${artist[1].name}</a></h2>
                    <a target="_blank" class="artist-image" href="${artist[1].url}"><img src="${artist[1].image[1]['#text']}"></a>
                </section>
                `
         ).join('')}
    `;
    console.log(topListMap)

    artistsByType.innerHTML = topListMap
            
            


        })
    })     









}