[![codecov](https://codecov.io/gh/fac19/Bechdel-Beyond-backend/branch/master/graph/badge.svg)](https://codecov.io/gh/fac19/Bechdel-Beyond-backend)

# Bechdel-Beyond-backend

## Set up incturction to install the API on your local machine

1. clone this repo
2. in your terminal run `npm i`
3. create a `.env` file in the root folder with the following inside:

```env
PGDATABASE=bbdev
PGUSER=myuser
PGPASSWORD=mypassword
SECRET=mysecret
APIKEYTMDB=yourAPIkey
APIKEYOMDB=yourAPIkey
```

Contact one of us to get api keys for movie APIs.

4. change your terminal to `psql` or `pgcli` environment
5. To setup a super user run following commands. if you have one already you can skip running this code in `psql` environment.

```sql
CREATE USER myuser WITH PASSWORD 'mypassword';
ALTER USER myuser WITH SUPERUSER;
```

6. If you are having issues with anything related to accessing the databases you have created, you may need to grant privileges:

```sql
GRANT ALL PRIVILEGES ON DATABASE bbdev TO myuser;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO myuser;
```

7. Initialise the dev and test databases:

```sql
CREATE DATABASE bbdev WITH OWNER myuser;
CREATE DATABASE bbtest WITH OWNER myuser;
\c bbdev;
\i database/init.sql;
\c bbtest;
\i database/init.sql;
```

Bear in mind that in our `package.json` runs tests from `bbtest` database and names in the `"test"` script and database have to match.

8. You can exit `psql` or `pgcli` environment and you can run test by following command `npm run test`.

9. To start the development server run `npm run dev`

10. This step is optional and can be skipped if you just intend to test the app but if you wish to populate your bbdev database with more data you can go to `server.js` file and uncomment the line 14, that is the home route.

- after you can run development server again and go to home route once.(we had cases when we needed to go there twice 😆)
- `/` route has a call back `setupMovies` function, that is defined at the end of `fetch.js` file.
- purpose of whole `fetch.js` is to make fetch request to different APIs and gather resources that will be used for our app and store them in our database. At the moment we are working to optimise this process so developers won't need to run something like this manually.

## Berchdel API routes

The base URL for the api end points is: `https://apibechdel.herokuapp.com/`

### Users

| Path      | Method | Body                                                              | Example response                                                                    |
| --------- | ------ | ----------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `/signup` | `POST` | `{ "email: "gio@gio.com", "username": "gio", "password": "123" }` | `{ "id": 1, "email": "gio@gio.com", "username": "gio", "access_token": "ey5a..." }` |
| `/login`  | `POST` | `{ "email": "gio@gio.com", "password": "123" }`                   | `{ "id": 1, "email": "gio@gio.com", "username": "gio""access_token": "ey5a..." }`   |

<!--May need to add PUT and DELETE routes for user reviews/account details -->

### Films

| Path           | Method | Body | Example response                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| -------------- | ------ | ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/films`       | `GET`  | n/a  | `[{ "id": 1, "title": "Titanic", "poster": "https://m.media-amazon.com/images..."}, {"id: 2", "title": "Pulp fiction"...}]"`                                                                                                                                                                                                                                                                                                                                                                                       |
| `/film/:title` | `GET`  | n/a  | `[{ "id": 1, "title": "Titanic", "poster": "https://m.media-amazon.com/images...", "year": "1997", "rated": "PG-13", "runtime": "194min", "genre": "["drama", "romance"]", "plot": "A seventeen-year-old aristocrat falls in love with...", "filmLanguage": "English", "country": "USA", "awards": "Won 11 oscars and another 114 wins", "ratings":"[{ "Source": "Internet Movie Database", "Value": "7.8/10" }, { "Source": "Rotten Tomatoes", "Value": "82%" }, { "Source": "Metacritic", "Value": "83/100" }]"` |

<!--Handlers to generate Join tables for reviews and crew -->

### Reviews(The paths currently don't work)

| Path                   | Method   | Body                                                                                                                 | Example response |
| ---------------------- | -------- | -------------------------------------------------------------------------------------------------------------------- | ---------------- |
| `/film/:title/reviews` | `GET`    | `[{ "user_id": "1", "film_id": "1", "bechdel": "true", "beyond": "3", "comment": "I loved it!"}, {"user_id": 5...}]` |
| `/user/:id/reviews`    | `GET`    | `[{ "film_id": "1", "bechdel": "true", "beyond": "3", "comment": "I loved it!"}, {"film_id": "5"...}]`               |
| `/reviews/:id`         | `DELETE` | n/a                                                                                                                  | n/a              |
