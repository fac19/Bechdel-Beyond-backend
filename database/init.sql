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
    title VARCHAR(255),
    movAPI_id INTEGER PRIMARY KEY,
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
    ratings INTEGER
);

CREATE TABLE user_reviews
(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    movAPI_id INTEGER REFERENCES films(movAPI_id),
    bechdel_1 BOOLEAN NOT NULL,
    bechdel_2 BOOLEAN NOT NULL,
    bechdel_3 BOOLEAN NOT NULL,
    beyond INTEGER NOT NULL,
    comment VARCHAR
    (255),
    date TIMESTAMP
    WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
    CREATE TABLE film_cast
    (
        id SERIAL PRIMARY KEY,
        gender_parity_cast json,
        movAPI_id INTEGER REFERENCES films(movAPI_id)
    );

    CREATE TABLE films_crew
    (
        id SERIAL PRIMARY KEY,
        director VARCHAR(255),
        producer VARCHAR(255),
        gender_parity json,
        movAPI_id INTEGER REFERENCES films(movAPI_id)
    );

    INSERT INTO users
        (username, email, userPassword)
    VALUES
        ('Gio', 'gio@gio.com', '123'),
        ('Chloe', 'chloe@chloe.com', '123'),
        ('Guy', 'guy@someguy.com', '$2a$10$.4XK5WMk1dTdJIpanxAEZOzmZLArCgWzeTTBSDCNqmjtFP/GHvNce');
    /*hashed 123 password*/

    INSERT INTO films
        (title, movAPI_id, poster, year, rated, released, runtime, genre, plot, filmLanguage, country, awards, ratings)
    VALUES
        ('titanic', 34, 'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUCotMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg', '1997', 'PG-13', '19 Dec 1997', '194 min', '["drama", "romance"]', 'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.', 'English', 'USA', 'Won 11 oscars and another 114 wins', '87'),
        ('Star Wars: Episode IV - A New Hope', 12, 'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg', '1977', 'PG', '25 May 1977', '121 min', '["Action", "Adventure", "Fantasy", "Sci-Fi"]', 'Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.', 'English', 'USA', 'Won 6 Oscars. Another 52 wins & 28 nominations.', '87');

    INSERT INTO user_reviews
        (user_id, movAPI_id, bechdel_1, bechdel_2, bechdel_3, beyond, comment)
    VALUES
        (1, 12, true, true, true, 3, 'I love it!'),
        (2, 12, false, true, true, 2, 'I so hate it!'),
        (2, 34, false, false, true, 1, 'It was terrible!'),
        (3, 34, true, true, true, 1, 'terrible!');


    INSERT INTO film_cast
        (gender_parity_cast, movAPI_id)
    VALUES
        ('{ "male": 12, "female": 33, "notlisted": 342 }', 34);

    INSERT INTO films_crew
        (director, producer, gender_parity, movAPI_id)
    VALUES
        ('James', 'Gio', '{ "male": 2, "female": 3, "notlisted": 34 }' , 34),
        ('Chloe', 'Ako', '{ "male": 2, "female": 3, "notlisted": 34 }' , 34);

    COMMIT;