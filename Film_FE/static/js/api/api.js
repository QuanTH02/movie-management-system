import { apiLogin, apiRegister, apiAllMovie, apiAllAccount, apiChangeProfile, apiDetailMovie, apiTrailerMovie, apiImgMovie, apiGenresMovie, apiDirectorMovie, apiWritersMovie, apiCastMovie, apiTaglineMovie, apiDidYouKnowMovie, apiUserReviewMovie, apiCountryOriginMovie, apiOfficialSitesMovie, apiLanguageMovie, apiFilmingLocationsMovie, apiProductionCompaniesMovie, apiBoxOfficeMovie, apiMaybeYouLikeMovie, apiProducedMovie, apiCinematographyMovie, apiEditingMovie, apiSpecialEffectsMovie, apiMusicMovie, apiAwardMovie, apiSubmitReviewMovie, apiMaybeYouLikeMovieCollab, apiAddToList, apiGetMovieLikes, apiRatingMovie, apiDeleteMovieLike } from "./api_func.js"
import { LoadReviewElement, LikeAndDisLikeEventPageReview } from "./render/page_review.js";
import { LoadFilmHome, MostPopularHome, MostFavouritesHome, toDetail, HighestRevenueHome, LoadRecommendHome } from "./render/page_home.js";
import { LoadDetail, LoadGenres, LoadDirector, LoadWriter, LoadStar, LoadCast, LoadTagline, LoadDidyouknow, LoadReview, LoadCountry, LoadOfficialSite, LoadLanguage, LoadLocation, LoadCompany, LoadBoxOffice, LikeAndDisLikeEvent, LoadMovieMaybeLike } from "./render/page_detail.js";
import { LoadDirectorAll, LoadWriterAll, LoadCastAll, LoadProducedAll, LoadCinematographyAll, LoadEditingAll, LoadSpecialEffectsAll, LoadMusicAll } from "./render/page_cast_and_crew.js";
import { LoadAwardAll } from "./render/page_award.js";
import { LoadFilmNav } from "./render/page_nav.js";
import { LoadProfile, LoadMovieLike } from "./render/page_profile.js";
import { LoadResultSearch } from "./render/page_search.js";
import { LoadImg } from "./render/page_img.js";
import { LoadGraphRating } from "./render/page_rating.js";

$(function () {
    (async () => {
        try {
            const data = await apiAllMovie();
            LoadFilmNav(data);
        } catch (error) {
            console.error('Error:', error);
        }
    })();

    var currentAccount = false;
    if (document.getElementById("btn-sign-in")) {
        // ##############################################################################################################
        // PAGE LOGIN
        // ##############################################################################################################
        // ##############################################################################################################
        // Login 
        // ##############################################################################################################
        $("#btn-sign-in").on("click", async function () {
            var username = document.getElementById("login-account").value;
            var password = document.getElementById("passwordField1").value;

            try {
                const data = await apiLogin(username, password);
                if (data.message == "Successfully logged in.") {
                    currentAccount = username;
                    localStorage.setItem('currentAccount', currentAccount);
                    window.location.href = "home.html"
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error('Error:', error);
                alert("Login failed, please try again!");
            }
        });

        // ##############################################################################################################
        // Register 
        // ##############################################################################################################
        $("#btn-sign-up").on("click", async function () {
            var username = document.getElementById("register-account").value;
            var name = document.getElementById("nameField").value;
            var gmail = document.getElementById("emailField").value;
            var password = document.getElementById("passwordField2").value;
            var confirmPassword = document.getElementById("confirmPasswordField").value;

            if (password != confirmPassword) {
                alert("Password and Confirm Password must be the same!");
            } else {
                const data_register = {
                    account: username,
                    name: name,
                    gmail: gmail,
                    password: password,
                    confirm_password: confirmPassword
                };

                try {
                    const data = await apiRegister(data_register);
                    alert(data.message);
                } catch (error) {
                    console.error('Error:', error);
                    alert("Registration failed, please try again!");
                }
            }
        });

    }

    // ##############################################################################################################
    // PAGE NAV
    // ##############################################################################################################
    // ##############################################################################################################
    // Load Film
    // ##############################################################################################################
    // console.log(document.getElementById('searchInput'));
    // if (document.getElementById('searchInput')) {
    //     fetch(`http://127.0.0.1:8000/api/film/`)
    //         .then(response => {
    //             return response.json();
    //         })
    //         .then(data => {
    //             console.log("To Nav");
    //             LoadFilmNav(data);
    //         })
    //         .catch(error => {
    //             // Xử lý lỗi nếu có
    //             console.error('Fetch error:', error);
    //         });
    // }

    // ##############################################################################################################
    // PAGE HOME
    // ##############################################################################################################
    // ##############################################################################################################
    // Load Film Home
    // ##############################################################################################################

    if (document.getElementById('listRightVideo')) {
        var currentAccount = localStorage.getItem('currentAccount');

        (async () => {
            try {
                const data = await apiAllMovie();
                const data_top_revenue = await apiBoxOfficeMovie(5);
                LoadFilmHome(data);
                // LoadFilmNav(data);
                MostPopularHome(data);
                MostFavouritesHome(data);
                HighestRevenueHome(data_top_revenue);
                toDetail();

                if (currentAccount != null) {
                    const dataRecommend = await apiMaybeYouLikeMovieCollab(currentAccount);
                    LoadRecommendHome(dataRecommend);
                    // console.log(dataRecommend);
                } else {
                    $("#no-login").css("display", "block");
                    $("#div-recommend").css("display", "none");
                }

                const addToListButtons = document.querySelectorAll('.add_to_list');

                addToListButtons.forEach(button => {
                    button.addEventListener('click', function () {
                        const movieTitle = this.parentElement.querySelector('h6').innerText;
                        // console.log(movieTitle);
                        apiAddToList(movieTitle, currentAccount);
                    });
                });

                const trailerButtons = document.getElementsByClassName("trailer-play");

                Array.from(trailerButtons).forEach(button => {
                    button.addEventListener('click', function () {
                        const movieTitle = this.querySelector('h5').innerText;
                        localStorage.setItem("movie_name", movieTitle);
                        window.location.href = "detail.html";
                    });
                });
            } catch (error) {
                console.error('Error:', error);
            }
        })();
    }

    // ##############################################################################################################
    // PAGE PROFILE
    // ##############################################################################################################
    // ##############################################################################################################
    // Load Profile
    // ##############################################################################################################
    if (document.getElementById('pf-f-name')) {
        (async () => {
            var currentAccount = localStorage.getItem('currentAccount');
            try {
                const data = await apiAllAccount(currentAccount);
                LoadProfile(data);
                const movieLike = await apiGetMovieLikes(currentAccount);
                // console.log(movieLike);
                LoadMovieLike(movieLike);

                Array.from(document.getElementsByClassName("div-element-movie-like")).forEach(movielike => {
                    const deleteButton = movielike.querySelector(".delete-movie");
                    deleteButton.addEventListener("click", function () {
                        const movieTitle = movielike.querySelector('h5').innerText;
                        document.getElementById('deletePopup').style.display = 'block';

                        document.getElementById('yesBtn').addEventListener('click', async function () {
                            await apiDeleteMovieLike(movieTitle, currentAccount);
                            location.reload();
                            alert('Movie deleted!');
                            document.getElementById('deletePopup').style.display = 'none';
                        });

                        document.getElementById('noBtn').addEventListener('click', function () {
                            document.getElementById('deletePopup').style.display = 'none';
                        });

                        document.addEventListener('click', function (event) {
                            if (!event.target.closest('.yesNoPopup') && event.target !== document.getElementById('deleteBtn')) {
                                document.getElementById('deletePopup').style.display = 'none';
                            }
                        });
                    });
                });

            } catch (error) {
                console.error('Error:', error);
            }
        })();
    }

    // ##############################################################################################################
    // Change Profile
    // ##############################################################################################################
    if (document.getElementById("saveButton")) {
        document.getElementById("saveButton").addEventListener("click", async function () {
            var pfFName = document.getElementById('pf-f-name').value;
            var pfLName = document.getElementById('pf-l-name').value;
            var pfEmail = document.getElementById('pf-email').value;
            var pfId = document.getElementById('pf-id').value;

            if (pfFName == "") pfFName = document.getElementById('pf-f-name').placeholder;
            if (pfLName == "") pfLName = document.getElementById('pf-l-name').placeholder;
            if (pfEmail == "") pfEmail = document.getElementById('pf-email').placeholder;

            try {
                await apiChangeProfile(pfFName, pfLName, pfEmail, pfId);
                location.reload();
            } catch (error) {
                console.error('Error:', error);
            }
        });
    }




    // ##############################################################################################################
    // PAGE DETAIL
    // ##############################################################################################################
    // ##############################################################################################################
    // Load Detail
    // ##############################################################################################################
    if (document.getElementById('page_film')) {
        var movieName = localStorage.getItem('movie_name');
        var currentAccount = localStorage.getItem('currentAccount');

        (async () => {
            try {
                const data = await apiDetailMovie(movieName);
                LoadDetail(data, movieName);
                var video = document.getElementById("link-trailer-id");
                video.src = data.data[0].main_trailer;
                video.type = "video/mp4";

                var img = document.getElementById("img_movie");
                img.src = data.data[0].main_img;

                document.getElementById("add_to_list_detail").addEventListener("click", function () {
                    apiAddToList(movieName, currentAccount);
                });
            } catch (error) {
                console.error('Error:', error);
                // Xử lý lỗi khi gọi các hàm API
            }
        })();
    }

    // ##############################################################################################################
    // Load Genres
    // ##############################################################################################################
    if (document.getElementById('page_film')) {
        (async () => {
            try {
                var movieName = localStorage.getItem('movie_name');
                const data = await apiGenresMovie(movieName);
                LoadGenres(data);
            } catch (error) {
                console.error('Error:', error);
                // Xử lý lỗi khi gọi apiGenresMovie()
            }
        })();
    }


    // ##############################################################################################################
    // Load Director
    // ##############################################################################################################
    if (document.getElementById('page_film')) {
        (async () => {
            try {
                var movieName = localStorage.getItem('movie_name');
                const data = await apiDirectorMovie(movieName);
                LoadDirector(data);
            } catch (error) {
                console.error('Error:', error);
                // Xử lý lỗi khi gọi apiDirectorMovie()
            }
        })();
    }


    // ##############################################################################################################
    // Load Writers
    // ##############################################################################################################
    if (document.getElementById('page_film')) {
        (async () => {
            try {
                var movieName = localStorage.getItem('movie_name');
                const data = await apiWritersMovie(movieName);
                LoadWriter(data);
            } catch (error) {
                console.error('Error:', error);
                // Xử lý lỗi khi gọi apiWritersMovie()
            }
        })();
    }


    // ##############################################################################################################
    // Load Total Reviews
    // ##############################################################################################################
    if (document.getElementById('page_film')) {
        (async () => {
            try {
                var movieName = localStorage.getItem('movie_name');
                const data = await apiUserReviewMovie(movieName);
                var totalReviewElement = document.querySelector('#p-movie-total-review-detail');
                totalReviewElement.textContent = data.data.length + 1;
            } catch (error) {
                console.error('Error:', error);
            }
        })();
    }


    // ##############################################################################################################
    // Load Cast
    // ##############################################################################################################
    if (document.getElementById('page_film')) {
        (async () => {
            try {
                var movieName = localStorage.getItem('movie_name');
                const data = await apiCastMovie(movieName);
                LoadStar(data);
                LoadCast(data);
            } catch (error) {
                console.error('Error:', error);
            }
        })();
    }


    // ##############################################################################################################
    // Load Taglines
    // ##############################################################################################################
    if (document.getElementById('page_film')) {
        (async () => {
            try {
                var movieName = localStorage.getItem('movie_name');
                const data = await apiTaglineMovie(movieName);
                LoadTagline(data);
            } catch (error) {
                console.error('Error:', error);
            }
        })();
    }


    // ##############################################################################################################
    // Load Did you know
    // ##############################################################################################################
    if (document.getElementById('page_film')) {
        (async () => {
            try {
                var movieName = localStorage.getItem('movie_name');
                const data = await apiDidYouKnowMovie(movieName);
                LoadDidyouknow(data);
            } catch (error) {
                console.error('Error:', error);
            }
        })();
    }


    // ##############################################################################################################
    // Load User review
    // ##############################################################################################################
    if (document.getElementById('page_film')) {
        (async () => {
            try {
                var movieName = localStorage.getItem('movie_name');
                const data = await apiUserReviewMovie(movieName);
                LoadReview(data);
                LikeAndDisLikeEvent();
            } catch (error) {
                console.error('Error:', error);
            }
        })();
    }


    // ##############################################################################################################
    // Load Country Origin
    // ##############################################################################################################
    if (document.getElementById('page_film')) {
        (async () => {
            try {
                var movieName = localStorage.getItem('movie_name');
                const data = await apiCountryOriginMovie(movieName);
                LoadCountry(data);
            } catch (error) {
                console.error('Error:', error);
                // Xử lý lỗi khi gọi apiCountryOriginMovie()
            }
        })();
    }


    // ##############################################################################################################
    // Load Official Sites
    // ##############################################################################################################
    if (document.getElementById('page_film')) {
        (async () => {
            try {
                var movieName = localStorage.getItem('movie_name');
                const data = await apiOfficialSitesMovie(movieName);
                LoadOfficialSite(data);
            } catch (error) {
                console.error('Error:', error);
                // Xử lý lỗi khi gọi apiOfficialSitesMovie()
            }
        })();
    }


    // ##############################################################################################################
    // Load Language
    // ##############################################################################################################
    if (document.getElementById('page_film')) {
        (async () => {
            try {
                var movieName = localStorage.getItem('movie_name');
                const data = await apiLanguageMovie(movieName);
                LoadLanguage(data);
            } catch (error) {
                console.error('Error:', error);
                // Xử lý lỗi khi gọi apiLanguageMovie()
            }
        })();
    }


    // ##############################################################################################################
    // Load Filming locations
    // ##############################################################################################################
    if (document.getElementById('page_film')) {
        (async () => {
            try {
                var movieName = localStorage.getItem('movie_name');
                const data = await apiFilmingLocationsMovie(movieName);
                LoadLocation(data);
            } catch (error) {
                console.error('Error:', error);
                // Xử lý lỗi khi gọi apiFilmingLocationsMovie()
            }
        })();
    }


    // ##############################################################################################################
    // Load Production Companies
    // ##############################################################################################################
    if (document.getElementById('page_film')) {
        (async () => {
            try {
                var movieName = localStorage.getItem('movie_name');
                const data = await apiProductionCompaniesMovie(movieName);
                LoadCompany(data);
            } catch (error) {
                console.error('Error:', error);
                // Xử lý lỗi khi gọi apiProductionCompaniesMovie()
            }
        })();
    }


    // ##############################################################################################################
    // Load Box Office
    // ##############################################################################################################
    if (document.getElementById('page_film')) {
        (async () => {
            try {
                var movieName = localStorage.getItem('movie_name');
                const data = await apiBoxOfficeMovie(movieName);
                LoadBoxOffice(data);
            } catch (error) {
                console.error('Error:', error);
                // Xử lý lỗi khi gọi apiBoxOfficeMovie()
            }
        })();
    }


    // ##############################################################################################################
    // Load Maybe you like
    // ##############################################################################################################
    if (document.getElementById('page_film')) {
        var movieName = localStorage.getItem('movie_name');
        var currentAccount = localStorage.getItem('currentAccount');

        (async () => {
            try {
                const data = await apiMaybeYouLikeMovie(movieName);
                // console.log(data);
                LoadMovieMaybeLike(data);

                $(".a-movie-maybe-like").each(async function () {
                    let aTag = $(this);
                    let movieNameTag = aTag.find('h5').text();
                    try {
                        let dataDetailMovie = await apiDetailMovie(movieNameTag);
                        let srcImg = dataDetailMovie.main_img;
                        let imgTag = $(aTag.find('img'));
                        imgTag.attr('src', srcImg);
                    } catch (error) {
                        console.error('Error:', error);
                    }
                });

                $(".a-movie-maybe-like").click(function () {
                    let movie_name = $(this).find('h5').text();
                    console.log(movie_name);
                    localStorage.setItem("movie_name", movie_name);
                    window.location.href = "detail.html";
                });

            } catch (error) {
                console.error('Error:', error);
                // Xử lý lỗi khi gọi apiMaybeYouLikeMovie()
            }
        })();
    }


    // ##############################################################################################################
    // PAGE CAST AND CREW
    // ##############################################################################################################
    // ##############################################################################################################
    // Load Director
    // ##############################################################################################################
    if (document.getElementById('page_cast_and_crew')) {
        var imgTitle = document.querySelector('.img-title-all');

        (async () => {
            try {
                var movieName = localStorage.getItem('movie_name');
                const data = await apiDirectorMovie(movieName);
                const dataDetail = await apiDetailMovie(movieName);
                imgTitle.src = dataDetail.data[0].main_img;
                // console.log(data);
                LoadDirectorAll(data, movieName);
            } catch (error) {
                console.error('Error:', error);
                // Xử lý lỗi khi gọi apiDirectorMovie()
            }
        })();
    }


    // ##############################################################################################################
    // Load Writers
    // ##############################################################################################################
    if (document.getElementById('page_cast_and_crew')) {
        (async () => {
            try {
                var movieName = localStorage.getItem('movie_name');
                const data = await apiWritersMovie(movieName);
                LoadWriterAll(data);
            } catch (error) {
                console.error('Error:', error);
                // Xử lý lỗi khi gọi apiWritersMovie()
            }
        })();
    }


    // ##############################################################################################################
    // Load Cast
    // ##############################################################################################################
    if (document.getElementById('page_cast_and_crew')) {
        (async () => {
            try {
                var movieName = localStorage.getItem('movie_name');
                const data = await apiCastMovie(movieName);
                LoadCastAll(data);
            } catch (error) {
                console.error('Error:', error);
                // Xử lý lỗi khi gọi apiCastMovie()
            }
        })();
    }


    // ##############################################################################################################
    // Load Produced
    // ##############################################################################################################
    if (document.getElementById('page_cast_and_crew')) {
        (async () => {
            try {
                var movieName = localStorage.getItem('movie_name');
                const data = await apiProducedMovie(movieName);
                LoadProducedAll(data);
            } catch (error) {
                console.error('Error:', error);
                // Xử lý lỗi khi gọi apiProducedMovie()
            }
        })();
    }


    // ##############################################################################################################
    // Load Cinematography
    // ##############################################################################################################
    if (document.getElementById('page_cast_and_crew')) {
        (async () => {
            try {
                var movieName = localStorage.getItem('movie_name');
                const data = await apiCinematographyMovie(movieName);
                LoadCinematographyAll(data);
            } catch (error) {
                console.error('Error:', error);
                // Xử lý lỗi khi gọi apiCinematographyMovie()
            }
        })();
    }


    // ##############################################################################################################
    // Load Editing
    // ##############################################################################################################
    if (document.getElementById('page_cast_and_crew')) {
        (async () => {
            try {
                var movieName = localStorage.getItem('movie_name');
                const data = await apiEditingMovie(movieName);
                LoadEditingAll(data);
            } catch (error) {
                console.error('Error:', error);
                // Xử lý lỗi khi gọi apiEditingMovie()
            }
        })();
    }


    // ##############################################################################################################
    // Load Special Effects
    // ##############################################################################################################
    if (document.getElementById('page_cast_and_crew')) {
        (async () => {
            try {
                var movieName = localStorage.getItem('movie_name');
                const data = await apiSpecialEffectsMovie(movieName);
                LoadSpecialEffectsAll(data);
            } catch (error) {
                console.error('Error:', error);
            }
        })();
    }


    // ##############################################################################################################
    // Load Music
    // ##############################################################################################################
    if (document.getElementById('page_cast_and_crew')) {
        (async () => {
            try {
                var movieName = localStorage.getItem('movie_name');
                const data = await apiMusicMovie(movieName);
                LoadMusicAll(data);
            } catch (error) {
                console.error('Error:', error);
            }
        })();
    }


    // ##############################################################################################################
    // PAGE REVIEW
    // ##############################################################################################################
    // ##############################################################################################################
    // Load Review
    // ##############################################################################################################

    if (document.querySelector('.total-review')) {
        var imgTitle = document.querySelector('.img-title-all');
        var currentAccount = localStorage.getItem('currentAccount');

        (async () => {
            try {
                var movieName = localStorage.getItem('movie_name');
                var totalReviewElement = document.querySelector('.total-review');

                const data = await apiUserReviewMovie(movieName);
                const dataDetail = await apiDetailMovie(movieName);

                imgTitle.src = dataDetail.data[0].main_img;

                LoadReviewElement(data, totalReviewElement, movieName, currentAccount);
                LikeAndDisLikeEventPageReview();

                Array.from(document.getElementsByClassName("btnEditReview")).forEach(function (element) {
                    element.addEventListener("click", function () {
                        document.getElementById("review-popup").style.display = "block";
                        let divParent = element.parentElement.parentElement.parentElement;

                        let starReview = document.getElementById('rating');
                        let titleReview = document.getElementById('title');
                        let contentReview = document.getElementById('content');

                        let voteRateElement = divParent.getElementsByClassName("vote-rate")[0];
                        let titleReviewElement = divParent.getElementsByClassName("h-title-review")[0];
                        let contentReviewElement = divParent.querySelector(".review-content > p");

                        // console.log(voteRateElement);

                        if (voteRateElement) {
                            starReview.value = voteRateElement.textContent;
                        }
                        if (titleReviewElement) {
                            titleReview.value = titleReviewElement.textContent;
                        }
                        if (contentReviewElement) {
                            contentReview.value = contentReviewElement.textContent;
                        }
                    });
                });

                Array.from(document.getElementsByClassName("btnDeleteReview")).forEach(function (element) {
                    element.addEventListener("click", function () {
                        document.getElementById("deleteReviewPopup").style.display = "block";
                    });
                });

                document.getElementById('yesBtnReview').addEventListener('click', async function () {
                    location.reload();
                    alert('Review deleted!');
                    document.getElementById('deleteReviewPopup').style.display = 'none';
                });

                document.getElementById('noBtnReview').addEventListener('click', function () {
                    document.getElementById('deleteReviewPopup').style.display = 'none';
                });

                document.addEventListener('click', function (event) {
                    if (!event.target.closest('.yesNoPopup') && event.target !== document.getElementById('deleteBtn')) {
                        document.getElementById('deleteReviewPopup').style.display = 'none';
                    }
                });

            } catch (error) {
                console.error('Error:', error);
            }
        })();
    }


    // ##############################################################################################################
    // Submit Review 
    // ##############################################################################################################
    if (document.getElementById('submit-review')) {
        var movieName = localStorage.getItem('movie_name');
        var imgTitle1 = document.querySelector('.img-title-review');
        var titelMovieReview = document.querySelector('.movie-name-popup');
        titelMovieReview.innerHTML = movieName;
        (async () => {
            try {
                const dataDetail = await apiDetailMovie(movieName);
                imgTitle1.src = dataDetail.data[0].main_img;

            } catch (error) {
                console.error('Error:', error);
            }
        })();

        document.getElementById('submit-review').addEventListener('click', async function (event) {
            event.preventDefault(); // Prevent the default submit behavior

            var movieName = localStorage.getItem('movie_name');
            var starReview = document.getElementById('rating').value;
            var titleReview = document.getElementById('title').value;
            var contentReview = document.getElementById('content').value;
            var currentAccount = localStorage.getItem('currentAccount');

            if (!currentAccount) {
                alert('Please log in to submit a review.');
                window.location.href = 'login.html';
                return;
            }
            
            if (!starReview || !titleReview || !contentReview || !movieName) {
                alert('Please fill in all review information.');
                return;
            }

            try {
                const data = await apiSubmitReviewMovie(movieName, currentAccount, starReview, titleReview, contentReview);
                alert(data.message);
                console.log("Success");
                document.getElementById("review-popup").style.display = "none"; // Close the popup on successful submission
                location.reload();
            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred while submitting the review. Please try again later.');
            }
        });
    }



    // ##############################################################################################################
    // PAGE AWARD
    // ##############################################################################################################
    // ##############################################################################################################
    // Load Award
    // ##############################################################################################################

    if (document.querySelector('#page_award')) {
        var movieName = localStorage.getItem('movie_name');
        document.querySelector('#name-movie-award').textContent = movieName;

        (async () => {
            try {
                const data = await apiAwardMovie(movieName);
                LoadAwardAll(data);
            } catch (error) {
                console.error('Error:', error);
            }
        })();
    }

    // ##############################################################################################################
    // PAGE SEARCH
    // ##############################################################################################################
    // ##############################################################################################################
    // Load Result
    // ##############################################################################################################

    if (document.querySelector('#result')) {
        (async () => {
            try {
                const data = await apiAllMovie();
                LoadResultSearch(data);
            } catch (error) {
                console.error('Error:', error);
            }
        })();
    }

    // ##############################################################################################################
    // PAGE IMAGE
    // ##############################################################################################################
    // ##############################################################################################################
    // Load Img
    // ##############################################################################################################

    if (document.querySelector('#imageContainer')) {
        var movieName = localStorage.getItem('movie_name');
        document.querySelector('#name-movie-img').textContent = movieName;

        (async () => {
            try {
                const data = await apiImgMovie(movieName);
                LoadImg(data);
            } catch (error) {
                console.error('Error:', error);
            }
        })();
    }

    if (document.querySelector('#page_award')) {
        var movieName = localStorage.getItem('movie_name');
        var imgTitle = document.querySelector('.img-title-all');

        (async () => {
            try {
                const data = await apiDetailMovie(movieName);
                imgTitle.src = data.data[0].main_img;
            } catch (error) {
                console.error('Error:', error);
            }
        })();
    }

    if (document.querySelector('#page_rating')) {
        var movieName = localStorage.getItem('movie_name');
        var imgTitle = document.querySelector('.img-title-all');
        var movieNameRating = document.querySelector('#name-movie-rating');
        movieNameRating.innerHTML = movieName;

        (async () => {
            try {
                const dataDetail = await apiDetailMovie(movieName);
                imgTitle.src = dataDetail.data[0].main_img;

                const data = await apiRatingMovie(movieName);
                LoadGraphRating(data, dataDetail);

            } catch (error) {
                console.error('Error:', error);
            }
        })();
    }

});