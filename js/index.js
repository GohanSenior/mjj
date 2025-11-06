"use strict";

const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NWE0YjQwNzJkOWFlOWNjOWNhNzQ2ZDk5YTg1OWY0ZiIsIm5iZiI6MTc2MjMzNzg2Mi40OTIsInN1YiI6IjY5MGIyNDQ2M2Q5MTY5ZTRjMmY2Y2VkOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.IdTPk-ScEmyEjOU715JAGDAzs9mLP-ZgoVijOH61IGk",
    },
};

let carouDiv = document.getElementById("createcarou");
let filmCard = document.getElementById("filmCard");
let searchInput = document.getElementById("searchbar");
let suggestionsDiv = document.getElementById("suggestions");

// Charger et afficher les films à l'affiche
fetch("https://api.themoviedb.org/3/movie/now_playing?language=fr-FR&page=1", options)
    .then((response) => response.json()) // Récupérer les données JSON
    .then((data) => {
        // Limiter à 3 films
        const films = data.results.slice(0, 3);
        // Commence l'overflow à partir de 4
        const cardFilm = data.results.slice(4);

        // Créer les items du carrousel dynamiquement
        films.forEach((film, index) => {
            carouDiv.innerHTML += `<div class="carousel-item ${index === 0 ? "active" : ""}">
                    <a href="movie.html?id=${film.id}"> <img src="https://image.tmdb.org/t/p/w500${film.poster_path}" class="d-block m-auto" alt="...">
                </div>`;
        });
        // Créer les cartes de films dans l'overflow dynamiquement
        cardFilm.forEach((film) => {
            filmCard.innerHTML += `
                <div class="my-card">
                    <a href="movie.html?id=${film.id}"> <img src="https://image.tmdb.org/t/p/w500${film.backdrop_path}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${film.title}</h5>
                        <p class="card-text">⭐${film.vote_average.toFixed(1)} / 10</p>
                        <p class="card-text">${film.release_date}</p>
                    </div>
                </div>
            `;
        });
    })
    .catch((error) => {
        console.error("Erreur:", error);
    });

// Fonctionnalité de recherche avec suggestions

// Fonction pour rechercher des films
async function searchMovies(query) {
    if (query.length < 2) {
        hideSuggestions();
        return;
    }
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?language=fr-FR&query=${query}&page=1`, options);
        const data = await response.json();
        showSuggestions(data.results.slice(0, 8)); // Limiter à 8 suggestions
    } catch (error) {
        console.error("Erreur lors de la recherche:", error);
        hideSuggestions();
    }
}

// Fonction pour afficher les suggestions
function showSuggestions(movies) {
    if (movies.length === 0) {
        hideSuggestions();
        return;
    }

    suggestionsDiv.innerHTML = "";

    movies.forEach((movie) => {
        const suggestionItem = document.createElement("div");
        suggestionItem.className = "suggestion-item";

        // Image par défaut si pas de poster
        const suggestionPosterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w92${movie.poster_path}` : "./images/no-poster.png";

        // Année de sortie
        const year = movie.release_date ? movie.release_date.split("-")[0] : "N/A";

        suggestionItem.innerHTML = `
            <img src="${suggestionPosterPath}" alt="${movie.title}" class="suggestion-poster">
            <div class="suggestion-info">
                <div class="suggestion-title">${movie.title}</div>
                <div class="suggestion-year">${year}</div>
            </div>
        `;

        // Clic sur une suggestion
        suggestionItem.addEventListener("click", () => {
            window.location.href = `movie.html?id=${movie.id}`;
        });

        suggestionsDiv.appendChild(suggestionItem);
    });

    suggestionsDiv.style.display = "block";
}

// Événement de saisie dans la barre de recherche
searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim();
    searchMovies(query);
});

// Recherche au clavier (Entrée)
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const query = searchInput.value.trim();
        if (query.length > 0) {
            // Si il y a des suggestions visibles, prendre la première
            const firstSuggestion = suggestionsDiv.querySelector(".suggestion-item");
            if (firstSuggestion && suggestionsDiv.style.display !== "none") {
                firstSuggestion.click();
            }
        }
    }
});

// Fonction pour masquer les suggestions
function hideSuggestions() {
    suggestionsDiv.style.display = "none";
}
