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
    ratings json
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
    COMMIT;