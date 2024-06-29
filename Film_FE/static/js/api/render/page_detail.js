function LoadDetail(data, movieName) {
    var hNameMovie = document.getElementById("h1-name-movie");
    hNameMovie.textContent = movieName;

    var lMovieYear = document.getElementById("li-movie-year");
    lMovieYear.textContent = data.data[0].year_manufacture;

    var lMovieTime = document.getElementById("li-movie-time");
    lMovieTime.textContent = data.data[0].time;

    var pMovieRating = document.getElementById("p-movie-rating");
    pMovieRating.textContent = data.data[0].rating;

    var pMovieVote = document.getElementById("p-movie-vote");
    pMovieVote.textContent = data.data[0].total_vote;

    var pMovieDescribe = document.getElementById("p-movie-describe");
    pMovieDescribe.textContent = data.data[0].describe_movie;

    var pMovieStoryline = document.getElementById("p-movie-storyline");
    pMovieStoryline.textContent = data.data[0].storyline;

    var pMovieRelaeaseDate = document.getElementById("p-movie-releasedate");
    pMovieRelaeaseDate.textContent = data.data[0].release_date;
};

function LoadGenres(data) {
    var uListGenres = document.getElementById("ul-list-genres");
    var divMovieGenres = document.getElementById("div-movie-genres");
    var count = data.data.length;

    var stt = 0;
    data.data.forEach(jsonData => {
        // Genres trên
        var newListItem = document.createElement("li");
        var newLink = document.createElement("a");
        newLink.href = "#";
        newLink.textContent = jsonData.genres_name;
        newListItem.appendChild(newLink);

        uListGenres.appendChild(newListItem);


        // Genres dưới
        var linkAction = document.createElement("a");
        linkAction.href = "#";
        linkAction.textContent = jsonData.genres_name;

        var dotIcon = document.createElement("i");
        dotIcon.className = "fas fa-circle pl-1 pr-1";
        dotIcon.style.fontSize = "2px";
        dotIcon.style.verticalAlign = "middle";

        if (stt == count - 1) {
            divMovieGenres.appendChild(linkAction);
        } else {
            divMovieGenres.appendChild(linkAction);
            divMovieGenres.appendChild(dotIcon);
        }

        stt++;
    });
};

function LoadDirector(data) {
    var dMovieDirector = document.getElementById("div-movie-director");
    var dMovieDirector2 = document.getElementById("div-movie-director-content");
    var count = data.data.length;
    // console.log(count);

    var stt = 0;
    data.data.forEach(jsonData => {
        var linkRidleyScott = document.createElement("a");
        linkRidleyScott.href = "#";
        linkRidleyScott.textContent = jsonData.name;

        // Tạo một thẻ i mới cho dấu chấm giữa
        var dotIcon = document.createElement("i");
        dotIcon.className = "fas fa-circle pl-1 pr-1";
        dotIcon.style.fontSize = "2px";
        dotIcon.style.verticalAlign = "middle";

        if (stt == count - 1) {
            dMovieDirector.appendChild(linkRidleyScott.cloneNode(true));

            dMovieDirector2.appendChild(linkRidleyScott.cloneNode(true));
        }
        else {
            dMovieDirector.appendChild(linkRidleyScott.cloneNode(true));
            dMovieDirector.appendChild(dotIcon.cloneNode(true));

            dMovieDirector2.appendChild(linkRidleyScott.cloneNode(true));
            dMovieDirector2.appendChild(dotIcon.cloneNode(true));
        }
        stt++;
    });
};

function LoadWriter(data) {
    var dMovieDirector = document.getElementById("div-movie-writer");
    var dMovieDirector2 = document.getElementById("div-movie-writer-content");

    var count = data.data.length;
    // console.log(count);

    var stt = 0;
    data.data.forEach(jsonData => {
        if (jsonData.name == " " || jsonData.name == null || jsonData.name == "") {
            count--;
            // console.log("hi");
        }
        else {
            var linkRidleyScott = document.createElement("a");
            linkRidleyScott.href = "#";
            linkRidleyScott.textContent = jsonData.name;

            // Tạo một thẻ i mới cho dấu chấm giữa
            var dotIcon = document.createElement("i");
            dotIcon.className = "fas fa-circle pl-1 pr-1";
            dotIcon.style.fontSize = "2px";
            dotIcon.style.verticalAlign = "middle";

            if (stt == count - 1) {
                if (stt < 3) {
                    dMovieDirector.appendChild(linkRidleyScott.cloneNode(true));
                }

                dMovieDirector2.appendChild(linkRidleyScott.cloneNode(true));
            }
            else {
                if (stt < 3) {
                    dMovieDirector.appendChild(linkRidleyScott.cloneNode(true));
                    if (stt != 2) {
                        dMovieDirector.appendChild(dotIcon.cloneNode(true));
                    }
                }

                dMovieDirector2.appendChild(linkRidleyScott.cloneNode(true));
                dMovieDirector2.appendChild(dotIcon.cloneNode(true));
            }
            stt++;
        }

    });
};

function LoadStar(data) {
    var dMovieDirector = document.getElementById("div-movie-star");
    var count = data.data.length;
    // console.log(count);

    var stt = 0;
    data.data.forEach(jsonData => {
        if (jsonData.name == " " || jsonData.name == null || jsonData.name == "") {
            count--;
            // console.log("hi");
        }
        else {
            var linkRidleyScott = document.createElement("a");
            linkRidleyScott.href = "#";
            linkRidleyScott.textContent = jsonData.name;

            // Tạo một thẻ i mới cho dấu chấm giữa
            var dotIcon = document.createElement("i");
            dotIcon.className = "fas fa-circle pl-1 pr-1";
            dotIcon.style.fontSize = "2px";
            dotIcon.style.verticalAlign = "middle";

            if (stt < 3) {
                if (stt == 2) {
                    dMovieDirector.appendChild(linkRidleyScott);
                }
                else {
                    dMovieDirector.appendChild(linkRidleyScott);
                    dMovieDirector.appendChild(dotIcon);
                }
            }

            stt++;
        }

    });
};

function LoadCast(data) {
    var dMovieDirector = document.getElementById("div-movie-cast-col-1");
    var dMovieDirector2 = document.getElementById("div-movie-cast-col-2");
    var count = data.data.length;
    // console.log(count);

    var stt = 0;
    data.data.forEach(jsonData => {
        if (jsonData.name == " " || jsonData.name == null || jsonData.name == "") {
            count--;
            // console.log("hi");
        }
        else {
            var newListItem = document.createElement("li");

            var newH5 = document.createElement("h5");
            newH5.textContent = jsonData.name;

            var newP = document.createElement("p");
            newP.textContent = jsonData.role;

            newListItem.appendChild(newH5);
            newListItem.appendChild(newP);

            if (stt < 10) {
                if (stt % 2 == 0) {
                    dMovieDirector.appendChild(newListItem);
                } else {
                    dMovieDirector2.appendChild(newListItem);
                }
            }

            stt++;
        }

    });
};

function LoadTagline(data) {
    var pMovieTagline = document.getElementById("p-movie-tagline");

    if (data.data[0] && data.data[0].taglines_content) {
        pMovieTagline.textContent = data.data[0].taglines_content;
    }

    // data.data.forEach(jsonData => {

    // });
};

function LoadDidyouknow(data) {
    var dMovieDidyouknow = document.getElementById("div-movie-didyouknow");

    data.data.forEach(jsonData => {
        var newDiv = document.createElement("div");
        newDiv.className = "did-you-know-content-element p-3 mb-2";

        // Tạo một phần tử p mới cho tên phần tử
        var nameParagraph = document.createElement("p");
        nameParagraph.className = "did-you-know-content-element-name mb-0";
        nameParagraph.textContent = jsonData.name;

        // Tạo một phần tử p mới cho nội dung phần tử
        var contentParagraph = document.createElement("p");
        contentParagraph.className = "did-you-know-content-element-content mb-0";
        contentParagraph.textContent = jsonData.content;

        // Thêm phần tử p vào phần tử div
        newDiv.appendChild(nameParagraph);
        newDiv.appendChild(contentParagraph);

        dMovieDidyouknow.appendChild(newDiv);
    });
};

function LoadReview(data) {
    var dMovieReview = document.getElementById("div-movie-review");
    var count = data.data.length;
    // console.log(count);

    var stt = 0;
    data.data.forEach(jsonData => {
        if (stt < 3) {
            // Tạo một phần tử div mới
            var newUserReviewDiv = document.createElement("div");
            newUserReviewDiv.className = "user-reviews-content-element p-3 mb-2";

            // Tạo một phần tử a mới
            var userReviewLink = document.createElement("a");
            userReviewLink.href = "#";

            // Tạo một phần tử p mới cho tên người đăng bài
            var userNameParagraph = document.createElement("p");
            userNameParagraph.className = "user-reviews-content-element-name mb-2";
            userNameParagraph.style.display = "inline-block";
            userNameParagraph.style.fontSize = "18px";
            userNameParagraph.textContent = jsonData.name_review;

            // Tạo một phần tử p mới cho đánh giá và rate
            var userRateParagraph = document.createElement("p");
            userRateParagraph.className = "user-reviews-content-element-rate mb-0";
            userRateParagraph.style.float = "right";
            userRateParagraph.innerHTML = '<i class="fas fa-star pr-2" style="color: yellow; display: inline-block; font-size: 14px;"></i>' + jsonData.star_review;

            // Tạo một phần tử p mới cho nội dung đánh giá
            var userReviewContentParagraph = document.createElement("p");
            userReviewContentParagraph.className = "user-reviews-content-element-content mb-0";
            userReviewContentParagraph.innerHTML = jsonData.content_review;

            // Thêm phần tử p vào phần tử a
            userReviewLink.appendChild(userNameParagraph);
            userReviewLink.appendChild(userRateParagraph);
            userReviewLink.appendChild(userReviewContentParagraph);

            // Thêm phần tử a vào phần tử div
            newUserReviewDiv.appendChild(userReviewLink);

            // Tạo một phần tử div mới cho số lượt like và dislike
            var reviewStatsDiv = document.createElement("div");
            reviewStatsDiv.className = "review-div-detail mt-4";

            // Tạo phần tử i cho nút like
            var thumbsUpIcon = document.createElement("i");
            thumbsUpIcon.className = "fa-regular fa-thumbs-up d-inline-block";
            thumbsUpIcon.style.fontSize = "20px";
            thumbsUpIcon.style.width = "100px";

            // Tạo một phần tử p cho số lượt like
            var likeCountParagraph = document.createElement("p");
            likeCountParagraph.className = "d-inline-block pl-2 pr-4 like-count";
            likeCountParagraph.style.fontSize = "14px";
            likeCountParagraph.textContent = "0";

            // Thêm phần tử p vào phần tử i và phần tử i vào phần tử div
            thumbsUpIcon.appendChild(likeCountParagraph);
            reviewStatsDiv.appendChild(thumbsUpIcon);

            // Tạo phần tử i cho nút dislike
            var thumbsDownIcon = document.createElement("i");
            thumbsDownIcon.className = "fa-regular fa-thumbs-down d-inline-block";
            thumbsDownIcon.style.fontSize = "20px";
            thumbsDownIcon.style.width = "100px";

            // Tạo một phần tử p cho số lượt dislike
            var dislikeCountParagraph = document.createElement("p");
            dislikeCountParagraph.className = "d-inline-block pl-2 pr-4 dislike-count";
            dislikeCountParagraph.style.fontSize = "14px";
            dislikeCountParagraph.textContent = "0";

            // Thêm phần tử p vào phần tử i và phần tử i vào phần tử div
            thumbsDownIcon.appendChild(dislikeCountParagraph);
            reviewStatsDiv.appendChild(thumbsDownIcon);

            // Thêm phần tử div cho số lượt like và dislike vào phần tử div chính
            newUserReviewDiv.appendChild(reviewStatsDiv);

            dMovieReview.appendChild(newUserReviewDiv);
        }
        stt++;
    });
};

function LoadCountry(data) {
    var dMovieCountry = document.getElementById("div-movie-country");
    var count = data.data.length;

    var stt = 0;
    data.data.forEach(jsonData => {
        // Tạo một phần tử a mới
        var linkUnitedStates = document.createElement("a");
        linkUnitedStates.href = "#";
        linkUnitedStates.textContent = jsonData.country_origin_name;

        // Tạo một phần tử i mới cho dấu chấm giữa
        var dotIcon = document.createElement("i");
        dotIcon.className = "fas fa-circle pl-1 pr-1";
        dotIcon.style.fontSize = "2px";
        dotIcon.style.verticalAlign = "middle";

        if (stt == count - 1) {
            dMovieCountry.appendChild(linkUnitedStates);
        } else {
            dMovieCountry.appendChild(linkUnitedStates);
            dMovieCountry.appendChild(dotIcon);
        }
        stt++;
    });
};

function LoadOfficialSite(data) {
    var dMovieOfficialSite = document.getElementById("div-movie-officialsite");
    var count = data.data.length;

    var stt = 0;
    data.data.forEach(jsonData => {
        // Tạo một phần tử a mới
        var linkUnitedStates = document.createElement("a");
        linkUnitedStates.href = "#";
        linkUnitedStates.textContent = jsonData.official_site_name;

        // Tạo một phần tử i mới cho dấu chấm giữa
        var dotIcon = document.createElement("i");
        dotIcon.className = "fas fa-circle pl-1 pr-1";
        dotIcon.style.fontSize = "2px";
        dotIcon.style.verticalAlign = "middle";

        if (stt == count - 1) {
            dMovieOfficialSite.appendChild(linkUnitedStates);
        } else {
            dMovieOfficialSite.appendChild(linkUnitedStates);
            dMovieOfficialSite.appendChild(dotIcon);
        }
        stt++;
    });
};

function LoadLanguage(data) {
    var dMovieLanguage = document.getElementById("div-movie-language");
    var count = data.data.length;

    var stt = 0;
    data.data.forEach(jsonData => {
        // Tạo một phần tử a mới
        var linkUnitedStates = document.createElement("p");
        linkUnitedStates.style.fontWeight = "400";
        linkUnitedStates.textContent = jsonData.language_name;
        // linkUnitedStates.style.color = "white";

        // Tạo một phần tử i mới cho dấu chấm giữa
        var dotIcon = document.createElement("i");
        dotIcon.className = "fas fa-circle pl-1 pr-1";
        dotIcon.style.fontSize = "2px";
        dotIcon.style.verticalAlign = "middle";
        dotIcon.style.color = "rgb(239, 239, 239)";

        if (stt == count - 1) {
            dMovieLanguage.appendChild(linkUnitedStates);
        } else {
            dMovieLanguage.appendChild(linkUnitedStates);
            dMovieLanguage.appendChild(dotIcon);
        }
        stt++;
    });
};

function LoadLocation(data) {
    var dMovieLocation = document.getElementById("div-movie-location");
    var count = data.data.length;

    var stt = 0;
    data.data.forEach(jsonData => {
        // Tạo một phần tử a mới
        var linkUnitedStates = document.createElement("p");
        linkUnitedStates.style.fontWeight = "400";
        linkUnitedStates.textContent = jsonData.filming_locations_name;
        // linkUnitedStates.style.color = "white";

        // Tạo một phần tử i mới cho dấu chấm giữa
        var dotIcon = document.createElement("i");
        dotIcon.className = "fas fa-circle pl-1 pr-1";
        dotIcon.style.fontSize = "2px";
        dotIcon.style.verticalAlign = "middle";
        dotIcon.style.color = "rgb(239, 239, 239)";

        if (stt == count - 1) {
            dMovieLocation.appendChild(linkUnitedStates);
        } else {
            dMovieLocation.appendChild(linkUnitedStates);
            dMovieLocation.appendChild(dotIcon);
        }
        stt++;
    });
};

function LoadCompany(data) {
    var dMovieCompany = document.getElementById("div-movie-company");
    var count = data.data.length;

    var stt = 0;
    data.data.forEach(jsonData => {
        // Tạo một phần tử a mới
        var linkUnitedStates = document.createElement("a");
        linkUnitedStates.href = "#";
        linkUnitedStates.textContent = jsonData.production_companies_name;

        // Tạo một phần tử i mới cho dấu chấm giữa
        var dotIcon = document.createElement("i");
        dotIcon.className = "fas fa-circle pl-1 pr-1";
        dotIcon.style.fontSize = "2px";
        dotIcon.style.verticalAlign = "middle";

        if (stt == count - 1) {
            dMovieCompany.appendChild(linkUnitedStates);
        } else {
            dMovieCompany.appendChild(linkUnitedStates);
            dMovieCompany.appendChild(dotIcon);
        }
        stt++;
    });
};

function LoadBoxOffice(data) {
    var pMovieBoxofficeBudget = document.getElementById("p-movie-boxoffice-budget");
    var pMovieBoxofficeOpening = document.getElementById("p-movie-boxoffice-opening");
    var pMovieBoxofficeGross = document.getElementById("p-movie-boxoffice-gross");
    var pMovieBoxofficeGrossWolrdwide = document.getElementById("p-movie-boxoffice-gross-worldwide");

    pMovieBoxofficeBudget.textContent = data.data[0].budget;
    pMovieBoxofficeOpening.textContent = data.data[0].opening_weekend;
    pMovieBoxofficeGross.textContent = data.data[0].gross;
    pMovieBoxofficeGrossWolrdwide.textContent = '$' + data.data[0].gross_worldwide;
};

function LikeAndDisLikeEvent() {
    $('.review-div-detail').each(function () {
        // console.log("Hello");
        var $review = $(this);
        var $thumbsUpIcon = $review.find('.fa-thumbs-up');
        var $thumbsDownIcon = $review.find('.fa-thumbs-down');
        var $likeCount = $review.find('.fa-thumbs-up .like-count');
        var $dislikeCount = $review.find('.fa-thumbs-down .dislike-count');

        $thumbsUpIcon.on('click', function () {
            if ($thumbsUpIcon.hasClass('fa-regular')) {
                $thumbsUpIcon.removeClass('fa-regular').addClass('fa-solid');
                $likeCount.text(parseInt($likeCount.text()) + 1);

                if ($thumbsDownIcon.hasClass('fa-solid')) {
                    $thumbsDownIcon.removeClass('fa-solid').addClass('fa-regular');
                    $dislikeCount.text(parseInt($dislikeCount.text()) - 1);
                }
            } else {
                $thumbsUpIcon.removeClass('fa-solid').addClass('fa-regular');
                $likeCount.text(parseInt($likeCount.text()) - 1);
            }

        });

        $thumbsDownIcon.on('click', function () {
            if ($thumbsDownIcon.hasClass('fa-regular')) {
                $thumbsDownIcon.removeClass('fa-regular').addClass('fa-solid');
                $dislikeCount.text(parseInt($dislikeCount.text()) + 1);

                if ($thumbsUpIcon.hasClass('fa-solid')) {
                    $thumbsUpIcon.removeClass('fa-solid').addClass('fa-regular');
                    $likeCount.text(parseInt($likeCount.text()) - 1);
                }
            } else {
                $thumbsDownIcon.removeClass('fa-solid').addClass('fa-regular');
                $dislikeCount.text(parseInt($dislikeCount.text()) - 1);
            }
        });
    });
}

function LoadMovieMaybeLike(data) {
    var ind = 0;
    data.forEach(jsonData => {
        ind++;
        const movieMaybeLikeDiv = document.createElement('div');
        movieMaybeLikeDiv.classList.add('movie_maybe_like');

        const movieLink = document.createElement('a');
        movieLink.href = 'detail.html';
        movieLink.classList.add('a-movie-maybe-like');

        const movieImage = document.createElement('img');
        movieImage.src = '../media/vebinh' + ind + '.jpg';
        movieImage.classList.add('img-movie-maybe-like');

        const movieInfoDiv = document.createElement('div');
        movieInfoDiv.classList.add('div-movie-maybe-like');

        const ul1 = document.createElement('ul');
        const li1 = document.createElement('li');
        const h5 = document.createElement('h5');
        h5.textContent = jsonData.movie_name;
        li1.appendChild(h5);

        const ul2 = document.createElement('ul');
        const li2_1 = document.createElement('li');
        li2_1.textContent = jsonData.year_manufacture;
        const li2_2 = document.createElement('li');
        li2_2.innerHTML = '<i class="fas fa-circle pl-1 pr-1" style="font-size: 2px; vertical-align: middle;"></i>';
        const li2_3 = document.createElement('li');
        li2_3.textContent = jsonData.time;

        // Ghép các phần tử vào cấu trúc HTML
        ul2.appendChild(li2_1);
        ul2.appendChild(li2_2);
        ul2.appendChild(li2_3);

        li1.appendChild(ul2);

        ul1.appendChild(li1);

        movieInfoDiv.appendChild(ul1);

        movieLink.appendChild(movieImage);
        movieLink.appendChild(movieInfoDiv);

        movieMaybeLikeDiv.appendChild(movieLink);

        document.querySelector('#content-right-id').appendChild(movieMaybeLikeDiv);

    });
}

function LoadTrailer(data) {
    var video = document.getElementById("link-trailer-id");
    video.src = data[0].link_trailer;
    video.type = "video/mp4";
}

function LoadImg(data) {
    var img = document.getElementById("img_movie");
    img.src = data[0].link_img;
}

export { LoadDetail, LoadGenres, LoadDirector, LoadWriter, LoadStar, LoadCast, LoadTagline, LoadDidyouknow, LoadReview, LoadCountry, LoadOfficialSite, LoadLanguage, LoadLocation, LoadCompany, LoadBoxOffice, LikeAndDisLikeEvent, LoadMovieMaybeLike, LoadTrailer, LoadImg }