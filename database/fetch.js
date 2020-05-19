const db = require("./connection");

const apikey = process.env.APIKEY

function setupMovies() {
    // console.log('hello')
    return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=e321983e25312e5a5c14a4119f9e8fb6&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&year=1997`)
    .then(data => data.json())
    .then(result => console.log(result))
    .catch(console.error)
}
module.exports = setupMovies;