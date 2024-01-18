function LoadAwardAll(data) {
    var dMovieAward = document.getElementById("div-movie-award-all");

    data.data.forEach(jsonData => {
        // Tạo một phần tử div mới
        var awardsElementDiv = document.createElement("div");
        awardsElementDiv.className = "awards-element";

        // Tạo một phần tử h5 mới
        var h5Element = document.createElement("h5");
        h5Element.textContent = jsonData.awards_name;

        // Thêm phần tử h5 vào phần tử div
        awardsElementDiv.appendChild(h5Element);

        dMovieAward.appendChild(awardsElementDiv);
    });
};

export { LoadAwardAll }