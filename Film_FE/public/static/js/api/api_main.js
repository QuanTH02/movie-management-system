import { LoadReviewElement, LikeAndDisLikeEventPageReview } from "./render/page_review.js";
import { LoadFilmHome, MostPopularHome, MostFavouritesHome, toDetail } from "./render/page_home.js";
import { LoadDetail, LoadGenres, LoadDirector, LoadWriter, LoadStar, LoadCast, LoadTagline, LoadDidyouknow, LoadReview, LoadCountry, LoadOfficialSite, LoadLanguage, LoadLocation, LoadCompany, LoadBoxOffice, LikeAndDisLikeEvent, LoadMovieMaybeLike, LoadTrailer, LoadImg } from "./render/page_detail.js";
import { LoadDirectorAll, LoadWriterAll, LoadCastAll, LoadProducedAll, LoadCinematographyAll, LoadEditingAll, LoadSpecialEffectsAll, LoadMusicAll } from "./render/page_cast_and_crew.js";
import { LoadAwardAll } from "./render/page_award.js";
import { LoadFilmNav } from "./render/page_nav.js";
import { LoadProfile } from "./render/page_profile.js";

$(function () {
    var currentAccount = false;
    if (document.getElementById("btn-sign-in")) {
        // ##############################################################################################################
        // PAGE LOGIN
        // ##############################################################################################################
        // ##############################################################################################################
        // Login 
        // ##############################################################################################################
        $("#btn-sign-in").on("click", function () {
            var username = document.getElementById("login-account").value;
            var password = document.getElementById("passwordField1").value;

            // Sử dụng Fetch API để gửi yêu cầu POST đến API login
            fetch('/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.message == "Successfully logged in.") {
                        currentAccount = username;
                        localStorage.setItem('currentAccount', currentAccount);
                        window.location.href = "home.html"
                    } else {
                        alert(data.message);
                    }
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    alert('Error fetching data. See console for details.');
                });

            // 
        });
        // ##############################################################################################################
        // Register 
        // ##############################################################################################################
        $("#btn-sign-up").on("click", function () {
            var username = document.getElementById("register-account").value;
            var name = document.getElementById("nameField").value;
            var gmail = document.getElementById("emailField").value;
            var password = document.getElementById("passwordField2").value;
            var confirmPassword = document.getElementById("confirmPasswordField").value;

            if (password != confirmPassword) {
                alert("Password and Confirm Password must be the same!");
            } else {
                const data = {
                    account: username,
                    name: name,
                    gmail: gmail,
                    password: password,
                    confirm_password: confirmPassword
                };

                // Sử dụng Fetch API để gửi yêu cầu POST đến API
                fetch('/api/register/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                    .then(response => response.json())
                    .then(data => {
                        // Xử lý dữ liệu nhận được từ server
                        alert(data.message);

                    })
                    .catch(error => {
                        // Xử lý lỗi nếu có
                        console.error('Error:', error);
                    });
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
    //     fetch(`/api/film/`)
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
        fetch(`/api/film/`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // console.log(data);
                LoadFilmHome(data);
                LoadFilmNav(data);
                MostPopularHome(data);
                MostFavouritesHome(data);
                toDetail();
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Fetch error:', error);
            });
    }

    // if (document.getElementById('listRightVideo')) {
    //     fetch(`/api/ticketroom/`)
    //         .then(response => {
    //             return response.json();
    //         })
    //         .then(data => {
    //             HighestRevenueHome(data);
    //         })
    //         .catch(error => {
    //             // Xử lý lỗi nếu có
    //             console.error('Fetch error:', error);
    //         });
    // }

    // ##############################################################################################################
    // PAGE PROFILE
    // ##############################################################################################################
    // ##############################################################################################################
    // Load Profile
    // ##############################################################################################################
    if (document.getElementById('pf-f-name')) {
        var currentAccount = localStorage.getItem('currentAccount');

        // console.log(currentAccount);
        fetch(`/api/account/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currentAccount: currentAccount,
            }),
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                // console.log(data);
                LoadProfile(data);
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Fetch error:', error);
            });
    }

    // ##############################################################################################################
    // Change Profile
    // ##############################################################################################################
    if (document.getElementById("saveButton")) {
        document.getElementById("saveButton").addEventListener("click", function () {
            var pfFName = document.getElementById('pf-f-name').value;
            var pfLName = document.getElementById('pf-l-name').value;
            var pfEmail = document.getElementById('pf-email').value;
            var pfId = document.getElementById('pf-id');

            if (pfFName == "") pfFName = document.getElementById('pf-f-name').placeholder;
            if (pfLName == "") pfLName = document.getElementById('pf-l-name').placeholder;
            if (pfEmail == "") pfEmail = document.getElementById('pf-email').placeholder;

            fetch(`/api/account/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pfFName: pfFName,
                    pfLName: pfLName,
                    pfEmail: pfEmail,
                    pfId: pfId.placeholder,
                }),
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    // console.log(data);
                    location.reload();
                })
                .catch(error => {
                    // Xử lý lỗi nếu có
                    console.error('Fetch error:', error);
                });
        });
    }

    // ##############################################################################################################
    // PAGE DETAIL
    // ##############################################################################################################
    // ##############################################################################################################
    // Load Detail
    // ##############################################################################################################
    let linkTrailer;
    let linkImg;
    if (document.getElementById('page_film')) {
        var movieName = localStorage.getItem('movie_name');
        var currentAccount = localStorage.getItem('currentAccount');

        // console.log(currentAccount);
        fetch(`/api/movie/${encodeURIComponent(movieName)}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                currentAccount: currentAccount,
            }),
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                console.log(data);
                linkTrailer = data.data[0].link_trailer;
                linkImg = data.data[0].link_img;

                LoadDetail(data, movieName);

                // ##############################################################################################################
                // Load Trailer
                // ##############################################################################################################

                fetch(`/api/link_trailer/${encodeURIComponent(linkTrailer)}/`)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        LoadTrailer(data);
                    })
                    .catch(error => {
                        // Xử lý lỗi nếu có
                        console.error('Fetch error:', error);
                    });

                // ##############################################################################################################
                // Load Img
                // ##############################################################################################################
                fetch(`/api/link_img/${encodeURIComponent(linkImg)}/`)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        LoadImg(data);
                    })
                    .catch(error => {
                        // Xử lý lỗi nếu có
                        console.error('Fetch error:', error);
                    });

            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Fetch error:', error);
            });
    }



    // ##############################################################################################################
    // Load Genres
    // ##############################################################################################################
    if (document.getElementById('page_film')) {
        var movieName = localStorage.getItem('movie_name');

        fetch(`/api/movie/${encodeURIComponent(movieName)}/genres`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // console.log(data);
                LoadGenres(data);
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Fetch error:', error);
            });
    }

    // ##############################################################################################################
    // Load Director
    // ##############################################################################################################
    if (document.getElementById('page_film')) {
        var movieName = localStorage.getItem('movie_name');

        fetch(`/api/movie/${encodeURIComponent(movieName)}/director/`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // console.log(data);
                LoadDirector(data);
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Fetch error:', error);
            });
    }

    // ##############################################################################################################
    // Load Writers
    // ##############################################################################################################
    if (document.getElementById('page_film')) {
        var movieName = localStorage.getItem('movie_name');

        fetch(`/api/movie/${encodeURIComponent(movieName)}/writers/`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // console.log(data);
                LoadWriter(data);
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Fetch error:', error);
            });
    }

    // ##############################################################################################################
    // Load Total Reviews
    // ##############################################################################################################
    if (document.getElementById('page_film')) {
        var movieName = localStorage.getItem('movie_name');
        var totalReviewElement = document.querySelector('#p-movie-total-review-detail');
        fetch(`/api/movie/${encodeURIComponent(movieName)}/filmreview/`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                totalReviewElement.textContent = data.data.length + 1;
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Fetch error:', error);
            });
    }

    // ##############################################################################################################
    // Load Cast
    // ##############################################################################################################
    if (document.getElementById('page_film')) {
        var movieName = localStorage.getItem('movie_name');

        fetch(`/api/movie/${encodeURIComponent(movieName)}/cast/`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // console.log(data);
                LoadStar(data);
                LoadCast(data);
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Fetch error:', error);
            });
    }

    // ##############################################################################################################
    // Load Taglines
    // ##############################################################################################################
    if (document.getElementById('page_film')) {
        var movieName = localStorage.getItem('movie_name');

        fetch(`/api/movie/${encodeURIComponent(movieName)}/taglines/`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // console.log(data);
                LoadTagline(data);
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Fetch error:', error);
            });
    }

    // ##############################################################################################################
    // Load Did you know
    // ##############################################################################################################
    if (document.getElementById('page_film')) {
        var movieName = localStorage.getItem('movie_name');

        fetch(`/api/movie/${encodeURIComponent(movieName)}/didyouknow/`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // console.log(data);
                LoadDidyouknow(data);
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Fetch error:', error);
            });
    }

    // ##############################################################################################################
    // Load User review
    // ##############################################################################################################
    if (document.getElementById('page_film')) {
        var movieName = localStorage.getItem('movie_name');

        fetch(`/api/movie/${encodeURIComponent(movieName)}/filmreview/`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // console.log(data);
                LoadReview(data);
                LikeAndDisLikeEvent();
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Fetch error:', error);
            });
    }

    // ##############################################################################################################
    // Load Country Origin
    // ##############################################################################################################
    if (document.getElementById('page_film')) {
        var movieName = localStorage.getItem('movie_name');

        fetch(`/api/movie/${encodeURIComponent(movieName)}/countryorigin/`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // console.log(data);
                LoadCountry(data);
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Fetch error:', error);
            });
    }

    // ##############################################################################################################
    // Load Official Sites
    // ##############################################################################################################
    if (document.getElementById('page_film')) {
        var movieName = localStorage.getItem('movie_name');

        fetch(`/api/movie/${encodeURIComponent(movieName)}/officialsite/`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // console.log(data);
                LoadOfficialSite(data);
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Fetch error:', error);
            });
    }

    // ##############################################################################################################
    // Load Language
    // ##############################################################################################################
    if (document.getElementById('page_film')) {
        var movieName = localStorage.getItem('movie_name');

        fetch(`/api/movie/${encodeURIComponent(movieName)}/language/`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // console.log(data);
                LoadLanguage(data);
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Fetch error:', error);
            });
    }

    // ##############################################################################################################
    // Load Filming locations
    // ##############################################################################################################
    if (document.getElementById('page_film')) {
        var movieName = localStorage.getItem('movie_name');

        fetch(`/api/movie/${encodeURIComponent(movieName)}/filminglocations/`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // console.log(data);
                LoadLocation(data);
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Fetch error:', error);
            });
    }

    // ##############################################################################################################
    // Load Production Companies
    // ##############################################################################################################
    if (document.getElementById('page_film')) {
        var movieName = localStorage.getItem('movie_name');

        fetch(`/api/movie/${encodeURIComponent(movieName)}/productioncompanies/`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // console.log(data);
                LoadCompany(data);
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Fetch error:', error);
            });
    }

    // ##############################################################################################################
    // Load Box Office
    // ##############################################################################################################
    if (document.getElementById('page_film')) {
        var movieName = localStorage.getItem('movie_name');

        fetch(`/api/movie/${encodeURIComponent(movieName)}/ticketroom/`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                LoadBoxOffice(data);
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Fetch error:', error);
            });
    }

    // ##############################################################################################################
    // Load Maybe you like
    // ##############################################################################################################
    if (document.getElementById('page_film')) {
        var movieName = localStorage.getItem('movie_name');

        fetch(`/api/recommend/contentbased/${encodeURIComponent(movieName)}/`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                LoadMovieMaybeLike(data);
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Fetch error:', error);
            });
    }

    // ##############################################################################################################
    // PAGE CAST AND CREW
    // ##############################################################################################################
    // ##############################################################################################################
    // Load Director
    // ##############################################################################################################
    if (document.getElementById('page_cast_and_crew')) {
        var movieName = localStorage.getItem('movie_name');

        fetch(`/api/movie/${encodeURIComponent(movieName)}/director/`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // console.log(data);
                LoadDirectorAll(data, movieName);
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Fetch error:', error);
            });
    }

    // ##############################################################################################################
    // Load Writers
    // ##############################################################################################################
    if (document.getElementById('page_cast_and_crew')) {
        var movieName = localStorage.getItem('movie_name');

        fetch(`/api/movie/${encodeURIComponent(movieName)}/writers/`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // console.log(data);
                LoadWriterAll(data);
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Fetch error:', error);
            });
    }

    // ##############################################################################################################
    // Load Cast
    // ##############################################################################################################
    if (document.getElementById('page_cast_and_crew')) {
        var movieName = localStorage.getItem('movie_name');

        fetch(`/api/movie/${encodeURIComponent(movieName)}/cast/`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // console.log(data);
                LoadCastAll(data);
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Fetch error:', error);
            });
    }

    // ##############################################################################################################
    // Load Produced
    // ##############################################################################################################
    if (document.getElementById('page_cast_and_crew')) {
        var movieName = localStorage.getItem('movie_name');

        fetch(`/api/movie/${encodeURIComponent(movieName)}/produced/`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // console.log(data);
                LoadProducedAll(data);
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Fetch error:', error);
            });
    }

    // ##############################################################################################################
    // Load Cinematography
    // ##############################################################################################################
    if (document.getElementById('page_cast_and_crew')) {
        var movieName = localStorage.getItem('movie_name');

        fetch(`/api/movie/${encodeURIComponent(movieName)}/cinematography/`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // console.log(data);
                LoadCinematographyAll(data);
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Fetch error:', error);
            });
    }

    // ##############################################################################################################
    // Load Editing
    // ##############################################################################################################
    if (document.getElementById('page_cast_and_crew')) {
        var movieName = localStorage.getItem('movie_name');

        fetch(`/api/movie/${encodeURIComponent(movieName)}/editing/`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // console.log(data);
                LoadEditingAll(data);
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Fetch error:', error);
            });
    }

    // ##############################################################################################################
    // Load Special Effects
    // ##############################################################################################################
    if (document.getElementById('page_cast_and_crew')) {
        var movieName = localStorage.getItem('movie_name');

        fetch(`/api/movie/${encodeURIComponent(movieName)}/specialeffects/`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // console.log(data);
                LoadSpecialEffectsAll(data);
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Fetch error:', error);
            });
    }

    // ##############################################################################################################
    // Load Music
    // ##############################################################################################################
    if (document.getElementById('page_cast_and_crew')) {
        var movieName = localStorage.getItem('movie_name');

        fetch(`/api/movie/${encodeURIComponent(movieName)}/music/`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // console.log(data);
                LoadMusicAll(data);
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Fetch error:', error);
            });
    }


    // ##############################################################################################################
    // PAGE REVIEW
    // ##############################################################################################################
    // ##############################################################################################################
    // Load Review
    // ##############################################################################################################

    if (document.querySelector('.total-review')) {
        var movieName = localStorage.getItem('movie_name');
        var totalReviewElement = document.querySelector('.total-review');
        fetch(`/api/movie/${encodeURIComponent(movieName)}/filmreview/`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                LoadReviewElement(data, totalReviewElement, movieName);
                LikeAndDisLikeEventPageReview();
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Fetch error:', error);
            });
    }

    // ##############################################################################################################
    // Submit Review 
    // ##############################################################################################################
    var submitReview = document.getElementById('submit-review');

    if (submitReview) {
        var movieName = localStorage.getItem('movie_name');
        submitReview.addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the default submit behavior

            var starReview = document.getElementById('rating').value;
            var titleReview = document.getElementById('title').value;
            var contentReview = document.getElementById('content').value;
            var currentAccount = localStorage.getItem('currentAccount');

            // Check if all fields have data
            if (!starReview || !titleReview || !contentReview || !movieName) {
                alert('Please fill in all review information.');
                return;
            }

            // Gửi Review 
            fetch('/api/review/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name_review: currentAccount,
                    star_review: starReview,
                    title_review: titleReview,
                    content_review: contentReview,
                    movie: movieName,
                }),
            })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    // Handle the server response
                    alert(data.message);
                    console.log("Success");
                    document.getElementById("review-popup").style.display = "none"; // Close the popup on successful submission
                    location.reload();
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred. Check the console for details.');
                    // Log the response text for debugging
                    response.text().then(text => console.error('Response Text:', text));
                });
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

        fetch(`/api/movie/${encodeURIComponent(movieName)}/award/`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // console.log(data);
                LoadAwardAll(data);
            })
            .catch(error => {
                // Xử lý lỗi nếu có
                console.error('Fetch error:', error);
            });
    }

});