function LoadResultSearch(data) {
    var filmFilter = document.querySelector('select[name="filmFilter"]');
    document.getElementById('search-submit').addEventListener('click', function () {
        // Lấy giá trị từ ô tìm kiếm
        // console.log(this.value);
        var searchTerm = this.value;
        document.getElementById('h-search-content').innerHTML = "Search \"" + searchTerm +"\"";

        if (searchTerm.toLowerCase()) {
            searchTerm = searchTerm.toLowerCase();
        }

        // console.log(filmFilter.value);

        if (filmFilter.value == 0 || filmFilter.value == 1) {
            var filteredMovies = data.filter(function (movie) {
                return movie.movie_name.toLowerCase().includes(searchTerm);
            });
        } else if (filmFilter.value == 2) {
            var filteredMovies = data.filter(function (movie) {
                return movie.year_manufacture.toLowerCase().includes(searchTerm);
            });
        } else {
            var filteredMovies = data.filter(function (movie) {
                return String(movie.rating).toLowerCase().includes(searchTerm);
            });
        }

        // Hiển thị kết quả tìm kiếm
        var searchResultsElement = document.getElementById('result');
        searchResultsElement.innerHTML = ''; // Xóa nội dung cũ

        var stt = 0;
        filteredMovies.forEach(function (movie) {
            
            var pName = movie.movie_name;
            var pYear = movie.year_manufacture;
            var pRating = movie.rating;
            var pTime = movie.time;
            var pDescribe = movie.describe_movie;

            var divResultElement = document.createElement('div');
            divResultElement.classList.add('search-result');
            divResultElement.innerHTML = `
                        <a href="detail.html" class="a-movie-maybe-like">
                            <img src="../media/vebinh1.jpg" class="img-movie-maybe-like">
                            <div class="div-search-result">
                                <li>
                                    <h5>${pName}</h5>
                                    <ul class="mb-0">
                                        <div class="d-inline-block">
                                            <i class="fas fa-star pr-0"
                                                style="color: yellow; display: inline-block; font-size: 14px;"></i>
                                            <div style="display: inline-block;">
                                                <p class="m-0" id="p-movie-rating">${pRating}</p>
                                            </div>
                                        </div>
                                        <i class="fas fa-circle pl-1 pr-1"
                                            style="font-size: 2px; vertical-align: middle;"></i>
                                        <li>${pYear}</li>
                                        <i class="fas fa-circle pl-1 pr-1"
                                            style="font-size: 2px; vertical-align: middle;"></i>
                                        <li>${pTime}</li>
                                    </ul>

                                    <p id="result-describe">${pDescribe}</p>
                                </li>
                            </div>
                        </a>
            `;
            if (stt < 5) {
                searchResultsElement.appendChild(divResultElement);
            }
            stt++;
        });

        document.getElementsByClassName("search-result").forEach(function (element) {
            element.addEventListener('click', function () {
                var movieName = element.querySelector('h5').textContent;
                localStorage.setItem('movie_name', movieName);
            });
        });
    });
}


export { LoadResultSearch };