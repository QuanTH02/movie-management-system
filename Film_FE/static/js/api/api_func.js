// ##############################################################################################################
// Helper function to get auth headers
// ##############################################################################################################
function getAuthHeaders() {
    const token = sessionStorage.getItem('access_token');
    const headers = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
}

// ##############################################################################################################
// Login
// ##############################################################################################################
async function apiLogin(username, password) {
    try {
        const response = await fetch('/api/login/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to login');
        }

        const data = await response.json();
        // Save JWT tokens to sessionStorage
        if (data.access) {
            sessionStorage.setItem('access_token', data.access);
        }
        if (data.refresh) {
            sessionStorage.setItem('refresh_token', data.refresh);
        }
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error fetching data. See console for details.');
        return null;
    }
}

// ##############################################################################################################
// Register
// ##############################################################################################################
async function apiRegister(data_inp) {
    try {
        const response = await fetch('/api/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data_inp),
        });

        if (!response.ok) {
            throw new Error('Failed to register');
        }

        const data = await response.json();
        // Save JWT tokens to sessionStorage
        if (data.access) {
            sessionStorage.setItem('access_token', data.access);
        }
        if (data.refresh) {
            sessionStorage.setItem('refresh_token', data.refresh);
        }
        return data;
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

// ##############################################################################################################
// Api Return All Movie
// ##############################################################################################################
async function apiAllMovie() {
    try {
        const response = await fetch(`/api/film/`);
        if (!response.ok) {
            throw new Error('Failed to fetch movies');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

// ##############################################################################################################
// Api Return All Account
// ##############################################################################################################
async function apiAllAccount(currentAccount) {
    try {
        const response = await fetch(`/api/account/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                currentAccount: currentAccount,
            }),
        });
        if (!response.ok) {
            throw new Error('Failed to fetch accounts');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}


// ##############################################################################################################
// Api Change Profile
// ##############################################################################################################
async function apiChangeProfile(pfFName, pfLName, pfEmail, pfId) {
    try {
        const response = await fetch(`/api/account/`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                pfFName: pfFName,
                pfLName: pfLName,
                pfEmail: pfEmail,
                pfId: pfId.placeholder,
            }),
        });
        if (!response.ok) {
            throw new Error('Failed to change profile');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}


// ##############################################################################################################
// Api Return Detail Movie
// ##############################################################################################################
async function apiDetailMovie(movieName) {
    try {
        const response = await fetch(`/api/movie/${encodeURIComponent(movieName)}/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },

        });
        if (!response.ok) {
            throw new Error('Failed to fetch movie detail');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

// ##############################################################################################################
// Api Return All Genres Movie
// ##############################################################################################################
async function apiGenresMovie(movieName) {
    try {
        const response = await fetch(`/api/movie/${encodeURIComponent(movieName)}/genres/`);
        if (!response.ok) {
            throw new Error('Failed to fetch genres data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}


// ##############################################################################################################
// Api Return All Director Movie
// ##############################################################################################################
async function apiDirectorMovie(movieName) {
    try {
        const response = await fetch(`/api/movie/${encodeURIComponent(movieName)}/director/`);
        if (!response.ok) {
            throw new Error('Failed to fetch director data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}


// ##############################################################################################################
// Api Return All Writers Movie
// ##############################################################################################################
async function apiWritersMovie(movieName) {
    try {
        const response = await fetch(`/api/movie/${encodeURIComponent(movieName)}/writers/`);
        if (!response.ok) {
            throw new Error('Failed to fetch writers data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}


// ##############################################################################################################
// Api Return All Cast Movie
// ##############################################################################################################
async function apiCastMovie(movieName) {
    try {
        const response = await fetch(`/api/movie/${encodeURIComponent(movieName)}/cast/`);
        if (!response.ok) {
            throw new Error('Failed to fetch cast data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}


// ##############################################################################################################
// Api Return All Tagline Movie
// ##############################################################################################################
async function apiTaglineMovie(movieName) {
    try {
        const response = await fetch(`/api/movie/${encodeURIComponent(movieName)}/taglines/`);
        if (!response.ok) {
            throw new Error('Failed to fetch tagline data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}


// ##############################################################################################################
// Api Return All Did you know Movie
// ##############################################################################################################
async function apiDidYouKnowMovie(movieName) {
    try {
        const response = await fetch(`/api/movie/${encodeURIComponent(movieName)}/didyouknow/`);
        if (!response.ok) {
            throw new Error('Failed to fetch Did You Know data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}


// ##############################################################################################################
// Api Return All User review Movie
// ##############################################################################################################
async function apiUserReviewMovie(movieName) {
    try {
        const response = await fetch(`/api/movie/${encodeURIComponent(movieName)}/filmreview/`);
        if (!response.ok) {
            throw new Error('Failed to fetch User Reviews data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}


// ##############################################################################################################
// Api Return All Country Origin Movie
// ##############################################################################################################
async function apiCountryOriginMovie(movieName) {
    try {
        const response = await fetch(`/api/movie/${encodeURIComponent(movieName)}/countryorigin/`);
        if (!response.ok) {
            throw new Error('Failed to fetch Country Origin data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}


// ##############################################################################################################
// Api Return All Official Sites Movie
// ##############################################################################################################
async function apiOfficialSitesMovie(movieName) {
    try {
        const response = await fetch(`/api/movie/${encodeURIComponent(movieName)}/officialsite/`);
        if (!response.ok) {
            throw new Error('Failed to fetch Official Sites data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}


// ##############################################################################################################
// Api Return All Language Movie
// ##############################################################################################################
async function apiLanguageMovie(movieName) {
    try {
        const response = await fetch(`/api/movie/${encodeURIComponent(movieName)}/language/`);
        if (!response.ok) {
            throw new Error('Failed to fetch Language data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

// ##############################################################################################################
// Api Return All Filming locations Movie
// ##############################################################################################################
async function apiFilmingLocationsMovie(movieName) {
    try {
        const response = await fetch(`/api/movie/${encodeURIComponent(movieName)}/filminglocations/`);
        if (!response.ok) {
            throw new Error('Failed to fetch Filming Locations data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}


// ##############################################################################################################
// Api Return All Production Companies Movie
// ##############################################################################################################
async function apiProductionCompaniesMovie(movieName) {
    try {
        const response = await fetch(`/api/movie/${encodeURIComponent(movieName)}/productioncompanies/`);
        if (!response.ok) {
            throw new Error('Failed to fetch Production Companies data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}


// ##############################################################################################################
// Api Return All Box Office Movie
// ##############################################################################################################
async function apiBoxOfficeMovie(movieName) {
    try {
        const response = await fetch(`/api/movie/${encodeURIComponent(movieName)}/ticketroom/`);
        if (!response.ok) {
            throw new Error('Failed to fetch Box Office data');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}


// ##############################################################################################################
// Api Return All Maybe you like Movie (Recommend Movie Content-Based)
// ##############################################################################################################
async function apiMaybeYouLikeMovie(movieName) {
    try {
        const response = await fetch(`/api/recommend/contentbased/${encodeURIComponent(movieName)}/`);
        if (!response.ok) {
            throw new Error('Failed to fetch recommended movies');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

// ##############################################################################################################
// Api Return All Maybe you like Movie (Recommend Movie Content-Based)
// ##############################################################################################################
async function apiMaybeYouLikeMovieCollab(username) {
    try {
        const response = await fetch(`/api/recommend/collaborative/${encodeURIComponent(username)}/`);
        if (!response.ok) {
            throw new Error('Failed to fetch recommended movies');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}


// ##############################################################################################################
// Api Return All Produced Movie
// ##############################################################################################################
async function apiProducedMovie(movieName) {
    try {
        const response = await fetch(`/api/movie/${encodeURIComponent(movieName)}/produced/`);
        if (!response.ok) {
            throw new Error('Failed to fetch produced movies');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}


// ##############################################################################################################
// Api Return All Cinematography Movie
// ##############################################################################################################
async function apiCinematographyMovie(movieName) {
    try {
        const response = await fetch(`/api/movie/${encodeURIComponent(movieName)}/cinematography/`);
        if (!response.ok) {
            throw new Error('Failed to fetch cinematography information');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}


// ##############################################################################################################
// Api Return All Editing Movie
// ##############################################################################################################
async function apiEditingMovie(movieName) {
    try {
        const response = await fetch(`/api/movie/${encodeURIComponent(movieName)}/editing/`);
        if (!response.ok) {
            throw new Error('Failed to fetch editing information');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}


// ##############################################################################################################
// Api Return All Special Effects Movie
// ##############################################################################################################
async function apiSpecialEffectsMovie(movieName) {
    try {
        const response = await fetch(`/api/movie/${encodeURIComponent(movieName)}/specialeffects/`);
        if (!response.ok) {
            throw new Error('Failed to fetch special effects information');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}


// ##############################################################################################################
// Api Return All Music Movie
// ##############################################################################################################
async function apiMusicMovie(movieName) {
    try {
        const response = await fetch(`/api/movie/${encodeURIComponent(movieName)}/music/`);
        if (!response.ok) {
            throw new Error('Failed to fetch music information');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}


// ##############################################################################################################
// Api Return All Award Movie
// ##############################################################################################################
async function apiAwardMovie(movieName) {
    try {
        const response = await fetch(`/api/movie/${encodeURIComponent(movieName)}/award/`);
        if (!response.ok) {
            throw new Error('Failed to fetch award information');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}


// ##############################################################################################################
// Api Submit Review Movie
// ##############################################################################################################
async function apiSubmitReviewMovie(movieName, currentAccount, starReview, titleReview, contentReview) {
    try {
        const response = await fetch('/api/review/', {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                name_review: currentAccount,
                star_review: starReview,
                title_review: titleReview,
                content_review: contentReview,
                movie: movieName,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to submit review');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Check the console for details.');
        // Log the response text for debugging
        response.text().then(text => console.error('Response Text:', text));
        return null;
    }
}

// ##############################################################################################################
// Api Update Review Movie
// ##############################################################################################################
async function apiUpdateReviewMovie(movieName, currentAccount, starReview, titleReview, contentReview, film_review_id) {
    try {
        const response = await fetch('/api/review/', {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                film_review_id: film_review_id,
                name_review: currentAccount,
                star_review: starReview,
                title_review: titleReview,
                content_review: contentReview,
                movie: movieName,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to update review');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Check the console for details.');
        // Log the response text for debugging
        response.text().then(text => console.error('Response Text:', text));
        return null;
    }
}

// ##############################################################################################################
// Api Update Review Movie
// ##############################################################################################################
async function apiDeleteReviewMovie(film_review_id) {
    try {
        const response = await fetch('/api/review/', {
            method: 'DELETE',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                film_review_id: film_review_id,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to update review');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Check the console for details.');
        // Log the response text for debugging
        response.text().then(text => console.error('Response Text:', text));
        return null;
    }
}



// ##############################################################################################################
// Api Return All Img on Movie
// ##############################################################################################################
async function apiImgMovie(movieName) {
    try {
        const response = await fetch(`/api/movie/${encodeURIComponent(movieName)}/linkimg/`);
        if (!response.ok) {
            throw new Error('Failed to fetch award information');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

// ##############################################################################################################
// Api Return All Trailer on Movie
// ##############################################################################################################
async function apiTrailerMovie(movieName) {
    try {
        const response = await fetch(`/api/movie/${encodeURIComponent(movieName)}/linktrailer/`);
        if (!response.ok) {
            throw new Error('Failed to fetch award information');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

// ##############################################################################################################
// Api Add To List
// ##############################################################################################################
async function apiAddToList(movieName, userName) {
    try {
        const response = await fetch('/api/likemovie/', {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                userName: userName,
                movieName: movieName,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed add to list');
        }

        alert('Movie has been added to your list!');
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed add to list!');
        return null;
    }
}

async function apiDeleteMovieLike(movieName, userName) {
    try {
        const response = await fetch('/api/likemovie/', {
            method: 'DELETE',
            headers: getAuthHeaders(),
            body: JSON.stringify({
                userName: userName,
                movieName: movieName,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed add to list');
        }

        alert('Movie deleted from the list successfully!');
    } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed delete!');
        return null;
    }
}

async function apiGetMovieLikes(userName) {
    try {
        const response = await fetch(`/api/likemovie/?userName=${userName}`, {
            method: 'GET',
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch movie likes');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

async function apiRatingMovie(movieName) {
    try {
        const response = await fetch(`/api/movie/${encodeURIComponent(movieName)}/ratingfilm/`);
        if (!response.ok) {
            throw new Error('Failed to fetch music information');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}


export { apiLogin, apiRegister, apiAllMovie, apiAllAccount, apiChangeProfile, apiDetailMovie, apiTrailerMovie, apiImgMovie, apiGenresMovie, apiDirectorMovie, apiWritersMovie, apiCastMovie, apiTaglineMovie, apiDidYouKnowMovie, apiUserReviewMovie, apiCountryOriginMovie, apiOfficialSitesMovie, apiLanguageMovie, apiFilmingLocationsMovie, apiProductionCompaniesMovie, apiBoxOfficeMovie, apiMaybeYouLikeMovie, apiProducedMovie, apiCinematographyMovie, apiEditingMovie, apiSpecialEffectsMovie, apiMusicMovie, apiAwardMovie, apiSubmitReviewMovie, apiMaybeYouLikeMovieCollab, apiAddToList, apiGetMovieLikes, apiRatingMovie, apiDeleteMovieLike, apiUpdateReviewMovie, apiDeleteReviewMovie }
