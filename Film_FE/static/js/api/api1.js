// ##############################################################################################################
// PAGE LOGIN
// ##############################################################################################################
// ##############################################################################################################
// Login 
// ##############################################################################################################
function apiLogin(username, password) {
    fetch('http://127.0.0.1:8000/api/login/', {
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
}

// ##############################################################################################################
// Register 
// ##############################################################################################################
function apiRegister(data_inp) {
    fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data_inp),
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

// ##############################################################################################################
// PAGE HOME
// ##############################################################################################################
// ##############################################################################################################
// Load Film Home
// ##############################################################################################################
function apiLoadFilmHome() {
    fetch(`http://127.0.0.1:8000/api/film/`)
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

// ##############################################################################################################
// PAGE PROFILE
// ##############################################################################################################
// ##############################################################################################################
// Load Profile
// ##############################################################################################################
function apiLoadProfile(currentAccount) {
    fetch(`http://127.0.0.1:8000/api/account/`, {
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
function apiChangeProfile(pfFName, pfLName, pfEmail, pfId) {
    fetch(`http://127.0.0.1:8000/api/account/`, {
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
}

// ##############################################################################################################
// PAGE DETAIL
// ##############################################################################################################
// ##############################################################################################################
// Load Detail
// ##############################################################################################################
function apiLoadDetail(movieName, currentAccount) {
    fetch(`http://127.0.0.1:8000/api/movie/${encodeURIComponent(movieName)}/`, {
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
            let linkTrailer = data.data[0].link_trailer;
            let linkImg = data.data[0].link_img;

            LoadDetail(data, movieName);

            apiLoadTrailer(linkTrailer);
            apiLoadImg(linkImg);
        })
        .catch(error => {
            // Xử lý lỗi nếu có
            console.error('Fetch error:', error);
        });
}

// ##############################################################################################################
// Load Trailer
// ##############################################################################################################
function apiLoadTrailer(linkTrailer) {
    fetch(`http://127.0.0.1:8000/api/link_trailer/${encodeURIComponent(linkTrailer)}/`)
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
}

// ##############################################################################################################
// Load Img
// ##############################################################################################################
function apiLoadImg(linkImg) {
    fetch(`http://127.0.0.1:8000/api/link_img/${encodeURIComponent(linkImg)}/`)
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
}

// ##############################################################################################################
// Load Genres
// ##############################################################################################################
function apiLoadGenres(movieName) {
    fetch(`http://127.0.0.1:8000/api/movie/${encodeURIComponent(movieName)}/genres`)
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
function apiLoadDirector(movieName) {
    fetch(`http://127.0.0.1:8000/api/movie/${encodeURIComponent(movieName)}/director/`)
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
function apiLoadWriters(movieName) {
    fetch(`http://127.0.0.1:8000/api/movie/${encodeURIComponent(movieName)}/writers/`)
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
function apiLoadTotalReviews(movieName, totalReviewElement) {
    fetch(`http://127.0.0.1:8000/api/movie/${encodeURIComponent(movieName)}/filmreview/`)
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
function apiLoadCast(movieName) {
    fetch(`http://127.0.0.1:8000/api/movie/${encodeURIComponent(movieName)}/cast/`)
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