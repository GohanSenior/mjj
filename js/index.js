"use strict";

const URLDATA = "./data/data.json";

let carouDiv = document.getElementById("createcarou");

fetch(URLDATA)
    .then(response => response.json())  // Récupérer les données JSON
    .then(data => {

        // Limiter à 3 films
        const films = data.results.slice(0, 3);  

        // Créer les items du carrousel et les indicateurs dynamiquement
            
            films.forEach((film, index) => {
                carouDiv.innerHTML += `<div class="carousel-item ${index === 0 ? 'active' : ''}">
                    <img src="https://image.tmdb.org/t/p/w500${film.poster_path}" class="d-block m-auto" alt="...">
                </div>`;
            });
        
    })
    .catch(error => {
        console.error("Erreur:", error);
    });