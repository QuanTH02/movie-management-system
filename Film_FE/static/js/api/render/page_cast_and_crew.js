function LoadDirectorAll(data, movieName) {
    var dMovieDirector = document.getElementById("tb-movie-director-all");
    var h5NameMovie = document.getElementById("h5-name-movie-cast-and-crew");

    h5NameMovie.textContent = movieName;
   
    data.data.forEach(jsonData => {
        var trName = document.createElement("tr");

        var tdName = document.createElement("td");
        tdName.style.verticalAlign = "top";
        tdName.className = "cast-and-crew-name";

        var linkName = document.createElement("a");
        linkName.href = "#";

        var pName = document.createElement("p");
        pName.textContent = jsonData.name;

        linkName.appendChild(pName);

        tdName.appendChild(linkName);

        var tdRole = document.createElement("td");
        tdRole.style.verticalAlign = "top";
        tdRole.className = "cast-and-crew-role";

        var pRole = document.createElement("p");
        pRole.textContent = jsonData.role;

        tdRole.appendChild(pRole);

        trName.appendChild(tdName);
        trName.appendChild(tdRole);

        dMovieDirector.appendChild(trName);
    });
};

function LoadWriterAll(data) {
    var dMovieWriter = document.getElementById("tb-movie-writer-all");

    data.data.forEach(jsonData => {
        var trName = document.createElement("tr");

        var tdName = document.createElement("td");
        tdName.style.verticalAlign = "top";
        tdName.className = "cast-and-crew-name";

        var linkName = document.createElement("a");
        linkName.href = "#";

        var pName = document.createElement("p");
        pName.textContent = jsonData.name;

        linkName.appendChild(pName);

        tdName.appendChild(linkName);

        var tdRole = document.createElement("td");
        tdRole.style.verticalAlign = "top";
        tdRole.className = "cast-and-crew-role";

        var pRole = document.createElement("p");
        pRole.textContent = jsonData.role;

        tdRole.appendChild(pRole);

        trName.appendChild(tdName);
        trName.appendChild(tdRole);

        dMovieWriter.appendChild(trName);
    });
};

function LoadCastAll(data) {
    var dMovieCast = document.getElementById("tb-movie-cast-all");

    data.data.forEach(jsonData => {
        var trName = document.createElement("tr");

        var tdName = document.createElement("td");
        tdName.style.verticalAlign = "top";
        tdName.className = "cast-and-crew-name";

        var linkName = document.createElement("a");
        linkName.href = "#";

        var pName = document.createElement("p");
        pName.textContent = jsonData.name;

        linkName.appendChild(pName);

        tdName.appendChild(linkName);

        var tdRole = document.createElement("td");
        tdRole.style.verticalAlign = "top";
        tdRole.className = "cast-and-crew-role";

        var pRole = document.createElement("p");
        pRole.textContent = jsonData.role;

        tdRole.appendChild(pRole);

        trName.appendChild(tdName);
        trName.appendChild(tdRole);

        dMovieCast.appendChild(trName);
    });
};

function LoadProducedAll(data) {
    var dMovieProduced = document.getElementById("tb-movie-produced-all");

    data.data.forEach(jsonData => {
        var trName = document.createElement("tr");

        var tdName = document.createElement("td");
        tdName.style.verticalAlign = "top";
        tdName.className = "cast-and-crew-name";

        var linkName = document.createElement("a");
        linkName.href = "#";

        var pName = document.createElement("p");
        pName.textContent = jsonData.name;

        linkName.appendChild(pName);

        tdName.appendChild(linkName);

        var tdRole = document.createElement("td");
        tdRole.style.verticalAlign = "top";
        tdRole.className = "cast-and-crew-role";

        var pRole = document.createElement("p");
        pRole.textContent = jsonData.role;

        tdRole.appendChild(pRole);

        trName.appendChild(tdName);
        trName.appendChild(tdRole);

        dMovieProduced.appendChild(trName);
    });
};

function LoadCinematographyAll(data) {
    var dMovieCinematography = document.getElementById("tb-movie-cinematography-all");

    data.data.forEach(jsonData => {
        var trName = document.createElement("tr");

        var tdName = document.createElement("td");
        tdName.style.verticalAlign = "top";
        tdName.className = "cast-and-crew-name";

        var linkName = document.createElement("a");
        linkName.href = "#";

        var pName = document.createElement("p");
        pName.textContent = jsonData.name;

        linkName.appendChild(pName);

        tdName.appendChild(linkName);

        var tdRole = document.createElement("td");
        tdRole.style.verticalAlign = "top";
        tdRole.className = "cast-and-crew-role";

        var pRole = document.createElement("p");
        pRole.textContent = jsonData.role;

        tdRole.appendChild(pRole);

        trName.appendChild(tdName);
        trName.appendChild(tdRole);

        dMovieCinematography.appendChild(trName);
    });
};

function LoadEditingAll(data) {
    var dMovieEditing = document.getElementById("tb-movie-editing-all");

    data.data.forEach(jsonData => {
        var trName = document.createElement("tr");

        var tdName = document.createElement("td");
        tdName.style.verticalAlign = "top";
        tdName.className = "cast-and-crew-name";

        var linkName = document.createElement("a");
        linkName.href = "#";

        var pName = document.createElement("p");
        pName.textContent = jsonData.name;

        linkName.appendChild(pName);

        tdName.appendChild(linkName);

        var tdRole = document.createElement("td");
        tdRole.style.verticalAlign = "top";
        tdRole.className = "cast-and-crew-role";

        var pRole = document.createElement("p");
        pRole.textContent = jsonData.role;

        tdRole.appendChild(pRole);

        trName.appendChild(tdName);
        trName.appendChild(tdRole);

        dMovieEditing.appendChild(trName);
    });
};

function LoadSpecialEffectsAll(data) {
    var dMovieSpecialEffects = document.getElementById("tb-movie-special-effects-all");

    data.data.forEach(jsonData => {
        var trName = document.createElement("tr");

        var tdName = document.createElement("td");
        tdName.style.verticalAlign = "top";
        tdName.className = "cast-and-crew-name";

        var linkName = document.createElement("a");
        linkName.href = "#";

        var pName = document.createElement("p");
        pName.textContent = jsonData.name;

        linkName.appendChild(pName);

        tdName.appendChild(linkName);

        var tdRole = document.createElement("td");
        tdRole.style.verticalAlign = "top";
        tdRole.className = "cast-and-crew-role";

        var pRole = document.createElement("p");
        pRole.textContent = jsonData.role;

        tdRole.appendChild(pRole);

        trName.appendChild(tdName);
        trName.appendChild(tdRole);

        dMovieSpecialEffects.appendChild(trName);
    });
};

function LoadMusicAll(data) {
    var dMovieMusic = document.getElementById("tb-movie-music-all");

    data.data.forEach(jsonData => {
        var trName = document.createElement("tr");

        var tdName = document.createElement("td");
        tdName.style.verticalAlign = "top";
        tdName.className = "cast-and-crew-name";

        var linkName = document.createElement("a");
        linkName.href = "#";

        var pName = document.createElement("p");
        pName.textContent = jsonData.name;

        linkName.appendChild(pName);

        tdName.appendChild(linkName);

        var tdRole = document.createElement("td");
        tdRole.style.verticalAlign = "top";
        tdRole.className = "cast-and-crew-role";

        var pRole = document.createElement("p");
        pRole.textContent = jsonData.role;

        tdRole.appendChild(pRole);

        trName.appendChild(tdName);
        trName.appendChild(tdRole);

        dMovieMusic.appendChild(trName);
    });
};

export { LoadDirectorAll, LoadWriterAll, LoadCastAll, LoadProducedAll, LoadCinematographyAll, LoadEditingAll, LoadSpecialEffectsAll, LoadMusicAll }