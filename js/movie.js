const URLCREDITS = "./data/credits.json";
const URLDETAILS = "./data/details.json";

let movieContainer = document.getElementById("movie-container");
let titleH1 = document.getElementById("title");
let releaseGenresPara = document.getElementById("release-genres-duree");
let notePara = document.getElementById("note");
let taglinePara = document.getElementById("tagline");
let descriptionPara = document.getElementById("description");

// Charger et afficher le contenu de details.json
fetch(URLDETAILS)
    .then((response) => response.json())
    .then((data) => {
        // console.log(data.vote_average);
        titleH1.innerText = `${data.title} (${data.release_date.slice(0, 4)})`;
        releaseGenresPara.innerText = `${data.release_date} . ${data.genres[0].name}, ${data.genres[1].name}`;
        notePara.innerText = `⭐ ${data.vote_average} / 10`;
        taglinePara.innerText = data.tagline;
        descriptionPara.innerText = data.overview;
    })
    .catch((error) => console.error("Erreur:", error));

// function recupererDetails() {}
