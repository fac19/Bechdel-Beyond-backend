BEGIN;

    DROP TABLE IF EXISTS users, user_reviews, films, crew
    CASCADE;

CREATE TABLE users
(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    userPassword VARCHAR(255)
);

CREATE TABLE films
(
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
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
    user_id INTEGER REFERENCES users(id),
    film_id INTEGER REFERENCES films(id),
    bechdel_1 BOOLEAN NOT NULL,
    bechdel_2 BOOLEAN NOT NULL,
    bechdel_3 BOOLEAN NOT NULL,
    beyond INTEGER NOT NULL,
    comment VARCHAR(255),
    date TIMESTAMP
    WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE crew
(
    id SERIAL PRIMARY KEY,
    img TEXT,
    name VARCHAR(255),
    gender VARCHAR(255)
);

CREATE TABLE films_crew
(
  id SERIAL PRIMARY KEY,
  crew_id INTEGER REFERENCES crew(id),
  films_id INTEGER REFERENCES films(id),
  role VARCHAR(255)
);
    INSERT INTO users
        (username, email, userPassword)
    VALUES
        ('Gio', 'gio@gio.com', '123'),
        ('Chloe', 'chloe@chloe.com', '123');

    INSERT INTO films
        (title, poster, year, rated, released, runtime, genre, plot, filmLanguage, country, awards, ratings)
    VALUES
        ('Titanic', 'https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUCotMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg', '1997', 'PG-13', '19 Dec 1997', '194 min', 'drama, romance', 'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.', 'English', 'USA', 'Won 11 oscars and another 114 wins', '[{"Source":"Internet Movie Database","Value":"7.8/10"},{"Source":"Rotten Tomatoes","Value":"82%"},{"Source":"Metacritic","Value":"83/100"}]');

    INSERT INTO user_reviews
        (user_id, film_id, bechdel_1, bechdel_2, bechdel_3, beyond, comment)
    VALUES
        (1, 1, true, true, true, 3, 'I love it!'),
        (2, 1, false, true, true, 2, 'I hate it!');

    INSERT INTO crew
        (img, name, gender)
    VALUES
        ('https://m.media-amazon.com/images/M/MV5BMjI0MjMzOTg2MF5BMl5BanBnXkFtZTcwMTM3NjQxMw@@._V1_UX67_CR0,0,67,98_AL_.jpg', 'James Cameron', 'male');

    INSERT INTO films_crew
        (crew_id, films_id, role)
    VALUES
        (1, 1, 'director'),
        (1, 1, 'writer');
          
    COMMIT;