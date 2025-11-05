const URLCREDITS = "./data/credits.json"; //  "https://api.themoviedb.org/3/movie/movie_id/credits?language=en-US";
const URLDETAILS = "./data/details.json"; // "https://api.themoviedb.org/3/movie/movie_id?language=en-US";
const options = {
    method: "GET",
    headers: {
        accept: "application/json",
        Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2MzOTRjYzE3ZDc0OTBlOWMyZjg2YTVlZjBjMTcwMyIsIm5iZiI6MTc2MjMzNzgyNS44NzksInN1YiI6IjY5MGIyNDIxZmZhNTZkZTQyN2Q3MzFlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.DJgdtarzoOrMN1hXM7VA5GSYDrGFyZLxFsyQ3J3rD2w",
    },
};

let movieContainer = document.getElementById("movie-container");
let posterImg = document.getElementById("poster-img");
let titleH1 = document.getElementById("title");
let releaseGenresPara = document.getElementById("release-genres-duree");
let notePara = document.getElementById("note");
let taglinePara = document.getElementById("tagline");
let descriptionPara = document.getElementById("description");
let directorsDiv = document.getElementById("directors");
let rolesDiv = document.getElementById("roles");
let actorCardsDiv = document.getElementById("actor-cards");

// Charger et afficher le contenu de details.json
fetch(URLDETAILS)
    .then((response) => response.json())
    .then((data) => {
        // console.log(data.vote_average);
        let dateFormatee = transformerDate(data.release_date);
        movieContainer.style.backgroundImage = `url(https://image.tmdb.org/t/p/w780${data.backdrop_path})`;
        posterImg.setAttribute("src", `https://image.tmdb.org/t/p/w500${data.poster_path}`);
        titleH1.innerText = `${data.title} (${data.release_date.slice(0, 4)})`;
        releaseGenresPara.innerText = `${dateFormatee} . ${data.genres[0].name}, ${data.genres[1].name}`;
        notePara.innerText = `⭐ ${data.vote_average} / 10`;
        taglinePara.innerText = data.tagline;
        descriptionPara.innerText = data.overview;
    })
    .catch((error) => console.error("Erreur:", error));

fetch(URLCREDITS)
    .then((response) => response.json())
    .then((data) => {
        let tDirectors = [];
        // console.log(data.crew[107]);
        data.crew.forEach((element) => {
            if (element.job === "Director") {
                tDirectors.push(element.name);
                // directorsDiv.innerHTML += `<h4>${element.name}</h4>`;
            }
        });

        tDirectors.forEach((director) => {
            let memberDiv = document.createElement("div");
            directorsDiv.appendChild(memberDiv);
            memberDiv.innerHTML += `<h4>${director}</h4>`;
            data.crew.forEach((element) => {
                if (element.name === director) {
                    memberDiv.innerHTML += `<p>${element.job}</p>`;
                }
            });
        });

        let actors = data.cast.slice(0, 10);
        actors.forEach((element) => {
            if (element.known_for_department === "Acting") {
                actorCardsDiv.innerHTML += `<div class="actor-card">
                                                <img src="https://image.tmdb.org/t/p/w200${element.profile_path}}" class="card-img-top actor-img" alt="...">
                                                <div class="card-body">
                                                <h5 id= "actor-h5"class="card-title">${element.name}</h5>
                                                <p id="role-p" class="card-text">${element.character}</p>
                                            </div>`;
            }
        });
    })
    .catch((error) => console.error("Erreur:", error));

// Fonction pour transformer la date de AAAA-MM-JJ en JJ-MM-AAAA
function transformerDate(dateString) {
    let [annee, mois, jour] = dateString.split("-");
    return `${jour}-${mois}-${annee}`;
}
