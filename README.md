# Bechdel-Beyond-backend

## Guidance Install on your local machine
1. clone the repo
2. in your terminal run `npm i`
3. create a `.env` file in the root folder with the following inside: 

```
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
GRANT ALL PRIVILEGES ON DATABASE week7cado_db TO myuser;
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

1. to start the development server run `npm run dev`
2. 
## Routes

The main route for the api end points is: `https://apibechdel.herokuapp.com/`

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
