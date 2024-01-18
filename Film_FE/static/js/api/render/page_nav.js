function LoadFilmNav(data) {
    var filmFilter = document.querySelector('select[name="filmFilter"]');
    document.getElementById('searchInput').addEventListener('input', function () {
        // Lấy giá trị từ ô tìm kiếm
        // console.log(this.value);
        var searchTerm = this.value;

        if (searchTerm.toLowerCase()) {
            searchTerm = searchTerm.toLowerCase();
        }

        console.log(filmFilter.value);

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
        var searchResultsElement = document.getElementById('searchResults');
        searchResultsElement.innerHTML = ''; // Xóa nội dung cũ

        var stt = 0;
        filteredMovies.forEach(function (movie) {
            // Tạo phần tử li mới cho mỗi kết quả tìm kiếm
            if (filmFilter.value == 0 || filmFilter.value == 1) {
                var content = 'Describe: ' + movie.describe_movie;
            } else if (filmFilter.value == 2) {
                var content = 'Year manufacture: ' + movie.year_manufacture;
            } else {
                var content = 'Rating: ' + movie.rating;
            }

            var liElement = document.createElement('li');
            liElement.innerHTML = `
              <div>
                <a href="detail.html" class="name-and-des-search">
                  <h6 class="name-search">${movie.movie_name}</h6>
                  <p>${content}</p>
                </a>
              </div>
            `;
            if (stt < 5) {
                searchResultsElement.appendChild(liElement);
            }
            stt++;
        });

        var divParentResult = document.getElementById('div-parent-result');
        var liElements = divParentResult.querySelectorAll('li');

        var numberOfLiElements = liElements.length;

        if (numberOfLiElements > 1) {
            divParentResult.style.display = 'block'; // Hiển thị
        } else {
            divParentResult.style.display = 'none';
        }

        document.addEventListener('click', function (event) {
            var targetElement = event.target; // Phần tử được click

            // Kiểm tra xem phần tử được click có là con của div-parent-result hay không
            var isClickInsideDiv = divParentResult.contains(targetElement);

            // Nếu không phải là con của div-parent-result, ẩn div-parent-result
            if (!isClickInsideDiv) {
                divParentResult.style.display = 'none';
            } else {
                var h6Element = targetElement.closest('div').querySelector('h6');
                var movieName = h6Element ? h6Element.textContent : '';

                if (movieName) {
                    localStorage.setItem('movie_name', movieName);
                }
            }
        });
    });
}


export { LoadFilmNav };