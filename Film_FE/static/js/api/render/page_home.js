function LoadFilmHome(data) {
    var filmCount = 0;
    var videoList = document.getElementById('listRightVideo');

    data.forEach(videos => {
        if (filmCount < 3) {
            var listItem = document.createElement('li');
            listItem.classList.add('list-group-item', 'pt-0', 'pb-0', 'mb-1', 'trailer-play');

            var linkToDetails = document.createElement('a');

            var rowDiv = document.createElement('div');
            rowDiv.classList.add('row');

            var imgDiv = document.createElement('div');
            imgDiv.classList.add('col-md-2', 'img-small');

            var img = document.createElement('img');
            // img.src = videos.link_img;
            // img.src = videos.link_img;

            var linkFake = '../media/film' + (filmCount + 1) + '.jpg';
            img.src = linkFake;

            img.classList.add('card-img-top');
            img.alt = 'Movie Image';

            var bodyDiv = document.createElement('div');
            bodyDiv.classList.add('col-md-10', 'card-body', 'd-flex', 'flex-column', 'mt-0', 'pt-0');

            var playTime = document.createElement('p');
            playTime.classList.add('play-time');
            playTime.innerHTML = '<i class="fa fa-play-circle-o mr-2" style="font-size:30px"></i> ' + videos.time;

            var title = document.createElement('h5');
            title.classList.add('card-title', 'mt-0', 'mb-1');
            title.style.color = 'rgba(255, 255, 255, 0.9)';
            // if (videos.movie_name.length >= 30) {
            //     videos.movie_name = videos.movie_name.substring(0, 30) + '...';
            // }
            title.innerText = videos.movie_name;

            var description = document.createElement('p');
            description.classList.add('des');
            if (videos.describe_movie.length >= 60) {
                // Nếu chuỗi có độ dài lớn hơn hoặc bằng 200 ký tự
                videos.describe_movie = videos.describe_movie.substring(0, 60) + '...';
            }
            description.innerText = videos.describe_movie;

            // Gắn các phần tử con vào phần tử cha
            imgDiv.appendChild(img);
            rowDiv.appendChild(imgDiv);
            bodyDiv.appendChild(playTime);
            bodyDiv.appendChild(title);
            bodyDiv.appendChild(description);
            rowDiv.appendChild(bodyDiv);
            listItem.appendChild(rowDiv);

            // Thêm listItem vào danh sách
            videoList.appendChild(listItem);


            filmCount++;
        }
    });

}

function MostFavouritesHome(data) {
    var filmCount = 0;
    data.sort((a, b) => b.rating - a.rating);

    // Lấy 12 movie có số lượt vote cao nhất
    const mostPopularMovies = data.slice(0, 12);

    // In ra console để kiểm tra
    // console.log(mostPopularMovies);
    var listMostpopular = document.getElementById('listMostFavourites');
    var listMostpopularCarousel = document.getElementById('listMostFavourites-Carousel');

    mostPopularMovies.forEach((movie, index) => {
        if (filmCount < 6) {
            var movieDiv = document.createElement('div');
            movieDiv.classList.add('col-md-2', 'mb-4', 'mr-0', 'card-to-detail');

            var cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            var cardId = 'mostFavourite-' + index;
            cardDiv.setAttribute('id', cardId);

            var imgContainerDiv = document.createElement('div');
            imgContainerDiv.classList.add('img-container');

            var img = document.createElement('img');
            // img.src = movie.image;
            var linkFake = '../media/film' + (filmCount + 1) + '.jpg';
            img.src = linkFake;
            img.classList.add('card-img-top');
            img.alt = 'Movie Image';

            var cardBodyDiv = document.createElement('div');
            cardBodyDiv.classList.add('card-body', 'd-flex', 'flex-column', 'align-items-center');

            var ratingP = document.createElement('p');
            ratingP.classList.add('card-text', 'mr-auto', 'mb-2');
            ratingP.innerHTML = '<i class="fas fa-star" style="color: yellow;"></i> ' + movie.rating;

            var titleH6 = document.createElement('h6');
            titleH6.classList.add('card-title', 'mt-0');
            // if (movie.movie_name.length >= 16) {
            //     // Nếu chuỗi có độ dài lớn hơn hoặc bằng 200 ký tự
            //     movie.movie_name = movie.movie_name.substring(0, 16) + '...';
            // }
            titleH6.innerText = movie.movie_name;

            var addButton = document.createElement('button');
            addButton.classList.add('btn', 'btn-primary');
            addButton.innerHTML = '<i class="fas fa-plus"></i> Add to List';

            var watchButton = document.createElement('a');
            watchButton.href = 'detail.html';
            watchButton.classList.add('mt-2');
            watchButton.style.width = '150px';
            watchButton.style.textAlign = 'center';
            watchButton.innerHTML = '<button class="btn btn-success p-2"><i class="fa fa-play mr-1"></i> Watch Movie</button>';

            // Gắn các phần tử con vào phần tử cha
            imgContainerDiv.appendChild(img);
            cardDiv.appendChild(imgContainerDiv);
            cardBodyDiv.appendChild(ratingP);
            cardBodyDiv.appendChild(titleH6);
            cardBodyDiv.appendChild(document.createElement('br'));
            cardBodyDiv.appendChild(addButton);
            cardBodyDiv.appendChild(watchButton);
            cardDiv.appendChild(cardBodyDiv);
            movieDiv.appendChild(cardDiv);

            // Thêm movieDiv vào listMostpopular
            listMostpopular.appendChild(movieDiv);
        } else {
            var movieDiv = document.createElement('div');
            movieDiv.classList.add('col-md-2', 'mb-4', 'mr-0', 'card-to-detail');

            var cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            var cardId = 'mostFavouriteCarousel-' + index;
            cardDiv.setAttribute('id', cardId);

            var imgContainerDiv = document.createElement('div');
            imgContainerDiv.classList.add('img-container');

            var img = document.createElement('img');
            // img.src = movie.image;
            var linkFake = '../media/film' + (filmCount + 1) + '.jpg';
            img.src = linkFake;
            img.classList.add('card-img-top');
            img.alt = 'Movie Image';

            var cardBodyDiv = document.createElement('div');
            cardBodyDiv.classList.add('card-body', 'd-flex', 'flex-column', 'align-items-center');

            var ratingP = document.createElement('p');
            ratingP.classList.add('card-text', 'mr-auto', 'mb-2');
            ratingP.innerHTML = '<i class="fas fa-star" style="color: yellow;"></i> ' + movie.rating;

            var titleH6 = document.createElement('h6');
            titleH6.classList.add('card-title', 'mt-0');
            // if (movie.movie_name.length >= 16) {
            //     // Nếu chuỗi có độ dài lớn hơn hoặc bằng 200 ký tự
            //     movie.movie_name = movie.movie_name.substring(0, 16) + '...';
            // }
            titleH6.innerText = movie.movie_name;

            var addButton = document.createElement('button');
            addButton.classList.add('btn', 'btn-primary');
            addButton.innerHTML = '<i class="fas fa-plus"></i> Add to List';

            var watchButton = document.createElement('a');
            watchButton.href = 'detail.html';
            watchButton.classList.add('mt-2');
            watchButton.style.width = '150px';
            watchButton.style.textAlign = 'center';
            watchButton.innerHTML = '<button class="btn btn-success p-2"><i class="fa fa-play mr-1"></i> Watch Movie</button>';

            // Gắn các phần tử con vào phần tử cha
            imgContainerDiv.appendChild(img);
            cardDiv.appendChild(imgContainerDiv);
            cardBodyDiv.appendChild(ratingP);
            cardBodyDiv.appendChild(titleH6);
            cardBodyDiv.appendChild(document.createElement('br'));
            cardBodyDiv.appendChild(addButton);
            cardBodyDiv.appendChild(watchButton);
            cardDiv.appendChild(cardBodyDiv);
            movieDiv.appendChild(cardDiv);

            // Thêm movieDiv vào listMostpopularCarousel
            listMostpopularCarousel.appendChild(movieDiv);
        }


        filmCount++;
    });
}


// 
function MostPopularHome(data) {
    var filmCount = 0;
    data.sort((a, b) => b.total_vote - a.total_vote);

    // Lấy 12 movie có số lượt vote cao nhất
    const mostPopularMovies = data.slice(0, 12);

    // In ra console để kiểm tra
    // console.log(mostPopularMovies);
    var listMostpopular = document.getElementById('listMostpopular');
    var listMostpopularCarousel = document.getElementById('listMostpopular-Carousel');

    mostPopularMovies.forEach((movie, index) => {
        if (filmCount < 6) {
            var movieDiv = document.createElement('div');
            movieDiv.classList.add('col-md-2', 'mb-4', 'mr-0', 'card-to-detail');

            var cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            var cardId = 'mostPopular-' + index;
            cardDiv.setAttribute('id', cardId);

            var imgContainerDiv = document.createElement('div');
            imgContainerDiv.classList.add('img-container');

            var img = document.createElement('img');
            // img.src = movie.image;
            var linkFake = '../media/film' + (filmCount + 1) + '.jpg';
            img.src = linkFake;
            img.classList.add('card-img-top');
            img.alt = 'Movie Image';

            var cardBodyDiv = document.createElement('div');
            cardBodyDiv.classList.add('card-body', 'd-flex', 'flex-column', 'align-items-center');

            var ratingP = document.createElement('p');
            ratingP.classList.add('card-text', 'mr-auto', 'mb-2');
            ratingP.innerHTML = '<i class="fas fa-star" style="color: yellow;"></i> ' + movie.rating;

            var titleH6 = document.createElement('h6');
            titleH6.classList.add('card-title', 'mt-0');
            // if (movie.movie_name.length >= 16) {
            //     // Nếu chuỗi có độ dài lớn hơn hoặc bằng 200 ký tự
            //     movie.movie_name = movie.movie_name.substring(0, 16) + '...';
            // }
            titleH6.innerText = movie.movie_name;

            var addButton = document.createElement('button');
            addButton.classList.add('btn', 'btn-primary');
            addButton.innerHTML = '<i class="fas fa-plus"></i> Add to List';

            var watchButton = document.createElement('a');
            watchButton.href = 'detail.html';
            watchButton.classList.add('mt-2');
            watchButton.style.width = '150px';
            watchButton.style.textAlign = 'center';
            watchButton.innerHTML = '<button class="btn btn-success p-2"><i class="fa fa-play mr-1"></i> Watch Movie</button>';

            // Gắn các phần tử con vào phần tử cha
            imgContainerDiv.appendChild(img);
            cardDiv.appendChild(imgContainerDiv);
            cardBodyDiv.appendChild(ratingP);
            cardBodyDiv.appendChild(titleH6);
            cardBodyDiv.appendChild(document.createElement('br'));
            cardBodyDiv.appendChild(addButton);
            cardBodyDiv.appendChild(watchButton);
            cardDiv.appendChild(cardBodyDiv);
            movieDiv.appendChild(cardDiv);

            // Thêm movieDiv vào listMostpopular
            listMostpopular.appendChild(movieDiv);
        } else {
            var movieDiv = document.createElement('div');
            movieDiv.classList.add('col-md-2', 'mb-4', 'mr-0', 'card-to-detail');

            var cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            var cardId = 'mostPopularCarousel-' + index;
            cardDiv.setAttribute('id', cardId);

            var imgContainerDiv = document.createElement('div');
            imgContainerDiv.classList.add('img-container');

            var img = document.createElement('img');
            // img.src = movie.image;
            var linkFake = '../media/film' + (filmCount + 1) + '.jpg';
            img.src = linkFake;
            img.classList.add('card-img-top');
            img.alt = 'Movie Image';

            var cardBodyDiv = document.createElement('div');
            cardBodyDiv.classList.add('card-body', 'd-flex', 'flex-column', 'align-items-center');

            var ratingP = document.createElement('p');
            ratingP.classList.add('card-text', 'mr-auto', 'mb-2');
            ratingP.innerHTML = '<i class="fas fa-star" style="color: yellow;"></i> ' + movie.rating;

            var titleH6 = document.createElement('h6');
            titleH6.classList.add('card-title', 'mt-0');
            // if (movie.movie_name.length >= 16) {
            //     // Nếu chuỗi có độ dài lớn hơn hoặc bằng 200 ký tự
            //     movie.movie_name = movie.movie_name.substring(0, 16) + '...';
            // }
            titleH6.innerText = movie.movie_name;

            var addButton = document.createElement('button');
            addButton.classList.add('btn', 'btn-primary');
            addButton.innerHTML = '<i class="fas fa-plus"></i> Add to List';

            var watchButton = document.createElement('a');
            watchButton.href = 'detail.html';
            watchButton.classList.add('mt-2');
            watchButton.style.width = '150px';
            watchButton.style.textAlign = 'center';
            watchButton.innerHTML = '<button class="btn btn-success p-2"><i class="fa fa-play mr-1"></i> Watch Movie</button>';

            // Gắn các phần tử con vào phần tử cha
            imgContainerDiv.appendChild(img);
            cardDiv.appendChild(imgContainerDiv);
            cardBodyDiv.appendChild(ratingP);
            cardBodyDiv.appendChild(titleH6);
            cardBodyDiv.appendChild(document.createElement('br'));
            cardBodyDiv.appendChild(addButton);
            cardBodyDiv.appendChild(watchButton);
            cardDiv.appendChild(cardBodyDiv);
            movieDiv.appendChild(cardDiv);

            // Thêm movieDiv vào listMostpopularCarousel
            listMostpopularCarousel.appendChild(movieDiv);
        }


        filmCount++;
    });
}


function HighestRevenueHome(data) {
    $("#no-login").css("display", "none");
    $("#div-recommend").css("display", "block");
    
    var filmCount = 0;
    
    var listMostpopular = document.getElementById('listHighest');
    var listMostpopularCarousel = document.getElementById('listHighest-Carousel');

    // console.log(data.data_top);
    data.data_top.forEach((movie, index) => {

        if (filmCount < 6) {
            var movieDiv = document.createElement('div');
            movieDiv.classList.add('col-md-2', 'mb-4', 'mr-0', 'card-to-detail');

            var cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            var cardId = 'listHighest-' + index;
            cardDiv.setAttribute('id', cardId);

            var imgContainerDiv = document.createElement('div');
            imgContainerDiv.classList.add('img-container');

            var img = document.createElement('img');
            // img.src = movie.image;
            var linkFake = '../media/film' + (filmCount + 1) + '.jpg';
            img.src = linkFake;
            img.classList.add('card-img-top');
            img.alt = 'Movie Image';

            var cardBodyDiv = document.createElement('div');
            cardBodyDiv.classList.add('card-body', 'd-flex', 'flex-column', 'align-items-center');

            var ratingP = document.createElement('p');
            ratingP.classList.add('card-text', 'mr-auto', 'mb-2');
            ratingP.innerHTML = '<i class="fas fa-star" style="color: yellow;"></i> ' + movie.rating.split('/')[0];

            var titleH6 = document.createElement('h6');
            titleH6.classList.add('card-title', 'mt-0');
            // if (movie.movie_name.length >= 16) {
            //     // Nếu chuỗi có độ dài lớn hơn hoặc bằng 200 ký tự
            //     movie.movie_name = movie.movie_name.substring(0, 16) + '...';
            // }
            titleH6.innerText = movie.movie_name;

            var addButton = document.createElement('button');
            addButton.classList.add('btn', 'btn-primary');
            addButton.innerHTML = '<i class="fas fa-plus"></i> Add to List';

            var watchButton = document.createElement('a');
            watchButton.href = 'detail.html';
            watchButton.classList.add('mt-2');
            watchButton.style.width = '150px';
            watchButton.style.textAlign = 'center';
            watchButton.innerHTML = '<button class="btn btn-success p-2"><i class="fa fa-play mr-1"></i> Watch Movie</button>';

            // Gắn các phần tử con vào phần tử cha
            imgContainerDiv.appendChild(img);
            cardDiv.appendChild(imgContainerDiv);
            cardBodyDiv.appendChild(ratingP);
            cardBodyDiv.appendChild(titleH6);
            cardBodyDiv.appendChild(document.createElement('br'));
            cardBodyDiv.appendChild(addButton);
            cardBodyDiv.appendChild(watchButton);
            cardDiv.appendChild(cardBodyDiv);
            movieDiv.appendChild(cardDiv);

            // Thêm movieDiv vào listMostpopular
            listMostpopular.appendChild(movieDiv);
        } else {
            var movieDiv = document.createElement('div');
            movieDiv.classList.add('col-md-2', 'mb-4', 'mr-0', 'card-to-detail');

            var cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            var cardId = 'listHighest-' + index;
            cardDiv.setAttribute('id', cardId);

            var imgContainerDiv = document.createElement('div');
            imgContainerDiv.classList.add('img-container');

            var img = document.createElement('img');
            // img.src = movie.image;
            var linkFake = '../media/film' + (filmCount + 1) + '.jpg';
            img.src = linkFake;
            img.classList.add('card-img-top');
            img.alt = 'Movie Image';

            var cardBodyDiv = document.createElement('div');
            cardBodyDiv.classList.add('card-body', 'd-flex', 'flex-column', 'align-items-center');

            var ratingP = document.createElement('p');
            ratingP.classList.add('card-text', 'mr-auto', 'mb-2');
            ratingP.innerHTML = '<i class="fas fa-star" style="color: yellow;"></i> ' + movie.rating.split('/')[0];

            var titleH6 = document.createElement('h6');
            titleH6.classList.add('card-title', 'mt-0');
            // if (movie.movie_name.length >= 16) {
            //     // Nếu chuỗi có độ dài lớn hơn hoặc bằng 200 ký tự
            //     movie.movie_name = movie.movie_name.substring(0, 16) + '...';
            // }
            titleH6.innerText = movie.movie_name;

            var addButton = document.createElement('button');
            addButton.classList.add('btn', 'btn-primary');
            addButton.innerHTML = '<i class="fas fa-plus"></i> Add to List';

            var watchButton = document.createElement('a');
            watchButton.href = 'detail.html';
            watchButton.classList.add('mt-2');
            watchButton.style.width = '150px';
            watchButton.style.textAlign = 'center';
            watchButton.innerHTML = '<button class="btn btn-success p-2"><i class="fa fa-play mr-1"></i> Watch Movie</button>';

            // Gắn các phần tử con vào phần tử cha
            imgContainerDiv.appendChild(img);
            cardDiv.appendChild(imgContainerDiv);
            cardBodyDiv.appendChild(ratingP);
            cardBodyDiv.appendChild(titleH6);
            cardBodyDiv.appendChild(document.createElement('br'));
            cardBodyDiv.appendChild(addButton);
            cardBodyDiv.appendChild(watchButton);
            cardDiv.appendChild(cardBodyDiv);
            movieDiv.appendChild(cardDiv);

            // Thêm movieDiv vào listMostpopularCarousel
            listMostpopularCarousel.appendChild(movieDiv);
        }


        filmCount++;
    });
}

function LoadRecommendHome(data) {
    var filmCount = 0;
    
    var listMostpopular = document.getElementById('listRecommend');
    var listMostpopularCarousel = document.getElementById('listRecommend-Carousel');

    // console.log(data.data_top);
    data.forEach((movie, index) => {
        if (filmCount < 6) {
            var movieDiv = document.createElement('div');
            movieDiv.classList.add('col-md-2', 'mb-4', 'mr-0', 'card-to-detail');

            var cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            var cardId = 'listHighest-' + index;
            cardDiv.setAttribute('id', cardId);

            var imgContainerDiv = document.createElement('div');
            imgContainerDiv.classList.add('img-container');

            var img = document.createElement('img');
            // img.src = movie.image;
            var linkFake = '../media/film' + (filmCount + 1) + '.jpg';
            img.src = linkFake;
            img.classList.add('card-img-top');
            img.alt = 'Movie Image';

            var cardBodyDiv = document.createElement('div');
            cardBodyDiv.classList.add('card-body', 'd-flex', 'flex-column', 'align-items-center');

            var ratingP = document.createElement('p');
            ratingP.classList.add('card-text', 'mr-auto', 'mb-2');
            if (movie.rating && movie.rating.includes('/')) {
                ratingP.innerHTML = '<i class="fas fa-star" style="color: yellow;"></i> ' + movie.rating.split('/')[0];
            } else {
                ratingP.innerHTML = '<i class="fas fa-star" style="color: yellow;"></i> ' + "8.3";
            }
            var titleH6 = document.createElement('h6');
            titleH6.classList.add('card-title', 'mt-0');
            // if (movie.movie_name.length >= 16) {
            //     // Nếu chuỗi có độ dài lớn hơn hoặc bằng 200 ký tự
            //     movie.movie_name = movie.movie_name.substring(0, 16) + '...';
            // }
            titleH6.innerText = movie.movie_name;

            var addButton = document.createElement('button');
            addButton.classList.add('btn', 'btn-primary');
            addButton.innerHTML = '<i class="fas fa-plus"></i> Add to List';

            var watchButton = document.createElement('a');
            watchButton.href = 'detail.html';
            watchButton.classList.add('mt-2');
            watchButton.style.width = '150px';
            watchButton.style.textAlign = 'center';
            watchButton.innerHTML = '<button class="btn btn-success p-2"><i class="fa fa-play mr-1"></i> Watch Movie</button>';

            // Gắn các phần tử con vào phần tử cha
            imgContainerDiv.appendChild(img);
            cardDiv.appendChild(imgContainerDiv);
            cardBodyDiv.appendChild(ratingP);
            cardBodyDiv.appendChild(titleH6);
            cardBodyDiv.appendChild(document.createElement('br'));
            cardBodyDiv.appendChild(addButton);
            cardBodyDiv.appendChild(watchButton);
            cardDiv.appendChild(cardBodyDiv);
            movieDiv.appendChild(cardDiv);

            // Thêm movieDiv vào listMostpopular
            listMostpopular.appendChild(movieDiv);
        } else {
            var movieDiv = document.createElement('div');
            movieDiv.classList.add('col-md-2', 'mb-4', 'mr-0', 'card-to-detail');

            var cardDiv = document.createElement('div');
            cardDiv.classList.add('card');
            var cardId = 'listHighest-' + index;
            cardDiv.setAttribute('id', cardId);

            var imgContainerDiv = document.createElement('div');
            imgContainerDiv.classList.add('img-container');

            var img = document.createElement('img');
            // img.src = movie.image;
            var linkFake = '../media/film' + (filmCount + 1) + '.jpg';
            img.src = linkFake;
            img.classList.add('card-img-top');
            img.alt = 'Movie Image';

            var cardBodyDiv = document.createElement('div');
            cardBodyDiv.classList.add('card-body', 'd-flex', 'flex-column', 'align-items-center');

            var ratingP = document.createElement('p');
            ratingP.classList.add('card-text', 'mr-auto', 'mb-2');
            if (movie.rating && movie.rating.includes('/')) {
                ratingP.innerHTML = '<i class="fas fa-star" style="color: yellow;"></i> ' + movie.rating.split('/')[0];
            } else {
                ratingP.innerHTML = '<i class="fas fa-star" style="color: yellow;"></i> ' + "8.5";
            }
            var titleH6 = document.createElement('h6');
            titleH6.classList.add('card-title', 'mt-0');
            // if (movie.movie_name.length >= 16) {
            //     // Nếu chuỗi có độ dài lớn hơn hoặc bằng 200 ký tự
            //     movie.movie_name = movie.movie_name.substring(0, 16) + '...';
            // }
            titleH6.innerText = movie.movie_name;

            var addButton = document.createElement('button');
            addButton.classList.add('btn', 'btn-primary');
            addButton.innerHTML = '<i class="fas fa-plus"></i> Add to List';

            var watchButton = document.createElement('a');
            watchButton.href = 'detail.html';
            watchButton.classList.add('mt-2');
            watchButton.style.width = '150px';
            watchButton.style.textAlign = 'center';
            watchButton.innerHTML = '<button class="btn btn-success p-2"><i class="fa fa-play mr-1"></i> Watch Movie</button>';

            // Gắn các phần tử con vào phần tử cha
            imgContainerDiv.appendChild(img);
            cardDiv.appendChild(imgContainerDiv);
            cardBodyDiv.appendChild(ratingP);
            cardBodyDiv.appendChild(titleH6);
            cardBodyDiv.appendChild(document.createElement('br'));
            cardBodyDiv.appendChild(addButton);
            cardBodyDiv.appendChild(watchButton);
            cardDiv.appendChild(cardBodyDiv);
            movieDiv.appendChild(cardDiv);

            // Thêm movieDiv vào listMostpopularCarousel
            listMostpopularCarousel.appendChild(movieDiv);
        }


        filmCount++;
    });
}

function toDetail() {
    // Lấy tất cả các phần tử có class "trailer-play"
    var toDetailRightElements = document.getElementsByClassName("trailer-play");

    // Lặp qua từng phần tử và gắn sự kiện
    for (var i = 0; i < toDetailRightElements.length; i++) {
        toDetailRightElements[i].addEventListener("click", function () {
            // Trong sự kiện, this là phần tử được click
            var cardTitleElement = this.querySelector('.card-title');

            // Kiểm tra xem cardTitleElement có tồn tại không trước khi lưu vào localStorage
            if (cardTitleElement) {
                var movieName = cardTitleElement.textContent; // hoặc innerText
                localStorage.setItem("movie_name", movieName);
            }
        });
    }

    // Tương tự, gắn sự kiện cho các phần tử có class "card-to-detail"
    var toDetailCardElements = document.getElementsByClassName("card-to-detail");
    for (var j = 0; j < toDetailCardElements.length; j++) {
        toDetailCardElements[j].addEventListener("click", function () {
            // Tương tự như trên, lấy giá trị cần lưu vào localStorage
            var cardTitleElement = this.querySelector('.card-title');

            // Kiểm tra xem cardTitleElement có tồn tại không trước khi lưu vào localStorage
            if (cardTitleElement) {
                var movieName = cardTitleElement.textContent; // hoặc innerText
                localStorage.setItem("movie_name", movieName);
            }
        });
    }
}




export { LoadFilmHome, MostPopularHome, MostFavouritesHome, toDetail, HighestRevenueHome, LoadRecommendHome }