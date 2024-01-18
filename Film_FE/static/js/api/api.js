import { LoadReviewElement } from "./render/page_review.js";

$(function () {
    // ##############################################################################################################
    // Load Review
    // ##############################################################################################################
    
    var movieName = document.getElementById('movie_name').innerHTML;
    var totalReviewElement = document.querySelector('.total-review');

    if (totalReviewElement) {
        fetch(`http://127.0.0.1:8000/api/movie/${encodeURIComponent(movieName)}/filmreview/`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                LoadReviewElement(data, totalReviewElement);
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
        fetch('http://127.0.0.1:8000/api/review/', {
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



});