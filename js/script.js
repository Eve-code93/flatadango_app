document.addEventListener("DOMContentLoaded", function () {
    const API_URL = "http://localhost:4000/films";
    const movieList = document.getElementById("movies");
    const movieTitle = document.getElementById("movie-title");
    const movieRuntime = document.getElementById("movie-runtime");
    const movieDescription = document.getElementById("movie-description");
    const movieShowtime = document.getElementById("movie-showtime");
    const movieTickets = document.getElementById("movie-tickets");
    const moviePoster = document.getElementById("movie-poster");
    const buyButton = document.getElementById("buy-ticket");
    const deleteButton = document.createElement("button"); 

    let selectedMovie = null; 

    deleteButton.textContent = "Delete Movie";
    deleteButton.id = "delete-movie";
    deleteButton.style.marginTop = "10px";
    buyButton.insertAdjacentElement("afterend", deleteButton);

    
    function fetchMovies() {
        fetch(API_URL)
            .then(response => response.json())
            .then(movies => {
                movieList.innerHTML = ""; 
                if (!movies.length) {
                    console.error("No movies found.");
                    return;
                }
                movies.forEach(movie => addMovieToList(movie));
                displayMovieDetails(movies[0]); 
            })
            .catch(error => console.error("Error fetching movies:", error));
    }

    
    function addMovieToList(movie) {
        const li = document.createElement("li");
        li.textContent = movie.title;
        li.dataset.id = movie.id;
        li.classList.add("film-item");
        li.addEventListener("click", () => displayMovieDetails(movie));
        movieList.appendChild(li);
    }

    
    function displayMovieDetails(movie) {
        selectedMovie = movie;
        movieTitle.textContent = movie.title;
        movieRuntime.textContent = `Runtime: ${movie.runtime} minutes`;
        movieDescription.textContent = movie.description;
        movieShowtime.textContent = `Showtime: ${movie.showtime}`;
        movieTickets.textContent = `Tickets Left: ${movie.capacity - movie.tickets_sold}`;
        moviePoster.src = movie.poster;
        updateBuyButton(movie);
    }

    
    function updateBuyButton(movie) {
        let availableTickets = movie.capacity - movie.tickets_sold;
        if (availableTickets === 0) {
            buyButton.textContent = "Sold Out";
            buyButton.disabled = true;
        } else {
            buyButton.textContent = "Buy Ticket";
            buyButton.disabled = false;
        }
    }

   
    buyButton.addEventListener("click", () => {
        if (!selectedMovie) return;

        let availableTickets = selectedMovie.capacity - selectedMovie.tickets_sold;
        if (availableTickets > 0) {
            selectedMovie.tickets_sold += 1;
            movieTickets.textContent = `Tickets Left: ${availableTickets - 1}`;
            if (availableTickets - 1 === 0) {
                buyButton.textContent = "Sold Out";
                buyButton.disabled = true;
            }

           
            fetch(`${API_URL}/${selectedMovie.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tickets_sold: selectedMovie.tickets_sold }),
            })
            .catch(error => console.error("Error updating tickets:", error));
        }
    });

    
    deleteButton.addEventListener("click", () => {
        if (!selectedMovie) return;

        fetch(`${API_URL}/${selectedMovie.id}`, {
            method: "DELETE",
        })
        .then(() => {
            document.querySelector(`[data-id="${selectedMovie.id}"]`).remove(); // Remove from UI
            alert("Movie deleted!");
            fetchMovies(); 
        })
        .catch(error => console.error("Error deleting movie:", error));
    });

    fetchMovies(); 
});


