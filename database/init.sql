BEGIN;

    DROP TABLE IF EXISTS users, user_reviews, films, film_cast, films_crew
    CASCADE;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    userPassword VARCHAR(255),
    adminusr BOOLEAN
);

CREATE TABLE films
(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    movAPI_id INTEGER,
    poster TEXT,
    year VARCHAR(255),
    rated VARCHAR(255),
    released VARCHAR(255),
    runtime VARCHAR(255),
    genre VARCHAR(255),
    plot TEXT,
    filmLanguage VARCHAR(255),
    country VARCHAR(255),
    awards VARCHAR(255),
    ratings json
);

CREATE TABLE user_reviews
(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    movAPI_id INTEGER,
    bechdel_1 BOOLEAN NOT NULL,
    bechdel_2 BOOLEAN NOT NULL,
    bechdel_3 BOOLEAN NOT NULL,
    beyond INTEGER NOT NULL,
    comment VARCHAR(255),
    date TIMESTAMP
    WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE film_cast
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    gender INTEGER,
    character VARCHAR(255),
    movAPI_id INTEGER
);

CREATE TABLE films_crew
(
  id SERIAL PRIMARY KEY,
  director VARCHAR(255),
  assistant_director VARCHAR(255),
  producer VARCHAR(255),
  gender_parity json,
  movAPI_id INTEGER
);
    INSERT INTO users
        (username, email, userPassword)
    VALUES
        ('Gio', 'gio@gio.com', '123'),
        ('Chloe', 'chloe@chloe.com', '123');

    INSERT INTO films
        (title, movAPI_id, poster, year, rated, released, runtime, genre, plot, filmLanguage, country, awards, ratings)
    VALUES
        ('Titanic', 34,'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUCotMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg', '1997', 'PG-13', '19 Dec 1997', '194 min', 'drama, romance', 'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.', 'English', 'USA', 'Won 11 oscars and another 114 wins', '[{"Source":"Internet Movie Database","Value":"7.8/10"},{"Source":"Rotten Tomatoes","Value":"82%"},{"Source":"Metacritic","Value":"83/100"}]');

    INSERT INTO user_reviews
        (user_id, movAPI_id, bechdel_1, bechdel_2, bechdel_3, beyond, comment)
    VALUES
        (1, 12, true, true, true, 3, 'I love it!'),
        (2, 14, false, true, true, 2, 'I hate it!');

    INSERT INTO film_cast
        (name, gender, character, movAPI_id)
    VALUES
        ('James Cameron', 2, 'Judge', 3);

    INSERT INTO films_crew
        (director, assistant_director, producer, gender_parity,  movAPI_id)
    VALUES
        ('James', 'Ako', 'Gio','{ "male": 2, "female": 3, "notlisted": 34 }' , 3),
        ('Gio', 'Chloe', 'Ako','{ "male": 2, "female": 3, "notlisted": 34 }' , 3);

    COMMIT;