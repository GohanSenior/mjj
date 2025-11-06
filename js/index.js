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
            filmCard.innerHTML += `<div class="my-card">
                                        <a href="movie.html?id=${film.id}"> <img src="https://image.tmdb.org/t/p/w500${film.backdrop_path}" class="card-img-top" alt="...">
                                        <div class="card-body">
                                            <h5 class="card-title">${film.title}</h5>
                                            <p class="card-text">⭐${film.vote_average.toFixed(1)} / 10</p>
                                            <p class="card-text">${film.release_date}</p>
                                        </div>
                                    </div>`;
        });
    })
    .catch((error) => {
        console.error("Erreur:", error);
    });
