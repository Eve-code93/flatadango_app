document.addEventListener("DOMContentLoaded", function () {
    const API_URL = "http://localhost:4000/films"; // Correct API URL

    const movieList = document.getElementById("movies");
    const movieTitle = document.getElementById("movie-title");
    const movieRuntime = document.getElementById("movie-runtime");
    const movieDescription = document.getElementById("movie-description");
    const movieShowtime = document.getElementById("movie-showtime");
    const movieTickets = document.getElementById("movie-tickets");
    const moviePoster = document.getElementById("movie-poster");

    // Fetch movies from db.json
    fetch(API_URL)
        .then(response => response.json())
        .then(movies => {
            if (!movies.length) {
                console.error("No movies found in the database.");
                return;
            }

            movies.forEach(movie => {
                const li = document.createElement("li");
                li.textContent = movie.title;
                li.dataset.id = movie.id;
                movieList.appendChild(li);

                // Display first movie by default
                if (movie.id === movies[0].id) {
                    displayMovieDetails(movie);
                }

                // Click event to show movie details
                li.addEventListener("click", () => displayMovieDetails(movie));
            });
        })
        .catch(error => console.error("Error fetching movies:", error));

    // Function to display movie details
    function displayMovieDetails(movie) {
        movieTitle.textContent = movie.title;
        movieRuntime.textContent = movie.runtime;
        movieDescription.textContent = movie.description;
        movieShowtime.textContent = movie.showtime;
        movieTickets.textContent = movie.capacity - movie.tickets_sold;
        moviePoster.src = movie.poster;
    }
});


