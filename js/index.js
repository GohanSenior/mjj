"use strict";

const URLDATA = "./data/data.json";

let carouDiv = document.getElementById("createcarou");
let filmCard = document.getElementById("filmCard");

fetch(URLDATA)
    .then(response => response.json())  // Récupérer les données JSON
    .then(data => {

        // Limiter à 3 films
        const films = data.results.slice(0, 3);
        const cardFilm = data.results.slice(4);  

        // Créer les items du carrousel et les indicateurs dynamiquement
            
            films.forEach((film, index) => {
                carouDiv.innerHTML += `<div class="carousel-item ${index === 0 ? 'active' : ''}">
                    <img src="https://image.tmdb.org/t/p/w500${film.poster_path}" class="d-block m-auto" alt="...">
                </div>`;
            });

            cardFilm.forEach((film) => {
                filmCard.innerHTML += `<div class="my-card">
                    <img src="https://image.tmdb.org/t/p/w500${film.backdrop_path}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${film.title}</h5>
                         <p class="card-text">⭐${film.vote_average}/10</p>
                          <p class="card-text">${film.release_date}</p>
                    </div>
                </div>`;
            });
        
    })
    .catch(error => {
        console.error("Erreur:", error);
    });