const db = require("./connection");
const fetch = require("node-fetch");

const apikeyTMDB = process.env.APIKEYTMDB
const apikeyOMDB = process.env.APIKEYOMDB

const movieTitles = [];
const movieIds = [];
// console.log("movieIds", movieIds)

function setupMovies() {
    return fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apikeyTMDB}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&year=1997`)
    .then(data => data.json())
    .then(result => {
      const moviesArr = result.results
      moviesArr.map(movie => {
        movieTitles.push(movie.title)
        movieIds.push(movie.id)
      })
      
      console.log("titles", movieTitles, "movieIds", movieIds)
    })
    .then(getMovieDetails)
    // .then(getMovieCrew)
    .catch(console.error)
}


function getMovieDetails() {
    movieTitles.forEach(
      title => {
        return fetch('http://www.omdbapi.com/?t=' + title + '&apikey=' + apikeyOMDB)
        .then(data => data.json())
        .then(results => 
            console.log(results))
          // db.query(
          //   `INSERT INTO films(title, poster, year, rated, released, runtime, genre, plot, filmLanguage, country, awards, ratings) VALUES ($)`
          // )
      })
  
}

function getMovieCrew() {
  movieIds.forEach(
    id => {
      return fetch('https://api.themoviedb.org/3/movie/' + id + '/credits?api_key=' + apikeyTMDB)
      .then(data => data.json())
      .then(results => console.log(results))
    })
}

module.exports = setupMovies;