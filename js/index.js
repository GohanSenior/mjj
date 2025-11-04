"use strict";

const URLDATA = "./data/data.json";



fetch(URLDATA)
    .then((response) => response.json())
    .then((data) => {
        // console.log(data.vote_average);
        console.log(data);
    })
    .catch((error) => console.error("Erreur:", error));
