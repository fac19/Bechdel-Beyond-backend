# Bechdel-Beyond-backend

## Routes

### Users

| Path        | Method | Body                                                              | Example response                                                                    |
| ----------- | ------ | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `/user/:id` | `GET`  | n/a                                                               | `{ "id": 1, "email": "gio@gio.com", "username": "gio" }`                            |
| `/signup`   | `POST` | `{ "email: "gio@gio.com", "username": "gio", "password": "123" }` | `{ "id": 1, "email": "gio@gio.com", "username": "gio", "access_token": "ey5a..." }` |
| `/login`    | `POST` | `{ "email": "gio@gio.com", "password": "123" }`                   | `{ "id": 1, "email": "gio@gio.com", "username": "gio""access_token": "ey5a..." }`   |

<!--May need to add PUT and DELETE routes for user reviews/account details -->

### Films

| Path     | Method | Body | Example response                                                                                                             |
| -------- | ------ | ---- | ---------------------------------------------------------------------------------------------------------------------------- |
| `/films` | `GET`  | n/a  | `[{ "id": 1, "title": "Titanic", "poster": "https://m.media-amazon.com/images..."}, {"id: 2", "title": "Pulp fiction"...}]"` |

| `/film/:title` | `GET` | n/a | `[{ "id": 1, "title": "Titanic", "poster": "https://m.media-amazon.com/images...", "year": "1997", "rated": "PG-13", "runtime": "194min", "genre": "["drama", "romance"]", "plot": "A seventeen-year-old aristocrat falls in love with...", "filmLanguage": "English", "country": "USA", "awards": "Won 11 oscars and another 114 wins", "ratings":"[{ "Source": "Internet Movie Database", "Value": "7.8/10" }, { "Source": "Rotten Tomatoes", "Value": "82%" }, { "Source": "Metacritic", "Value": "83/100" }]"` |

<!--Handlers to generate Join tables for reviews and crew -->

### Reviews

| `/film/:title/reviews` | `GET` | `[{ "user_id": "1", "film_id": "1", "bechdel": "true", "beyond": "3", "comment": "I loved it!"}, {"user_id": 5...}]` |
| `/user/:id/reviews` | `GET` | `[{ "film_id": "1", "bechdel": "true", "beyond": "3", "comment": "I loved it!"}, {"film_id": "5"...}]` |
| `/dogs/:id` | `DELETE` | n/a | n/a |

### Crew
