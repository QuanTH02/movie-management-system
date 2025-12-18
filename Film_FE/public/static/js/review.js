$(function () {
    var totalReviewElement = document.querySelector('.total-review');
    var movieName = document.getElementById('movie_name').innerHTML;
    var movieNamePopup = document.getElementsByClassName('movie-name-popup')[0];

    movieNamePopup.textContent = movieName;

    // Chọn số sao để filter
    var ratingFilter = document.querySelector('select[name="ratingFilter"]');
    
    // Gán sự kiện change cho thẻ select
    ratingFilter.addEventListener('change', function () {
        // Lấy thẻ select và tất cả các thẻ review
        var reviewElements = document.querySelectorAll('.review-element');
        // Lấy giá trị đã chọn từ dropdown và chuyển đổi thành số nguyên
        var selectedValueString = ratingFilter.value;
        var selectedValue = parseInt(selectedValueString.split(" ")[0]);
        var displayedReviewCount = 0;
        // Duyệt qua tất cả các thẻ review
        reviewElements.forEach(function (reviewElement) {
            // Lấy thẻ voteRateValue từ thẻ review
            var voteRateValue = reviewElement.querySelector('.vote-rate');

            // Lấy giá trị số sao từ thẻ voteRateValue và chuyển đổi thành số nguyên
            var reviewValueString = voteRateValue.textContent;
            var reviewValue = parseInt(reviewValueString.split(" ")[0]);

            // Ẩn hoặc hiển thị thẻ review dựa trên giá trị đã chọn
            if (selectedValue === 0 || reviewValue === selectedValue) {
                reviewElement.style.display = 'block'; // Hiển thị
                displayedReviewCount++;
            } else {
                reviewElement.style.display = 'none'; // Ẩn
            }
        });

        totalReviewElement.textContent = displayedReviewCount;
    });

    // Open the popup when clicking the "Write a Review" button
    $(".open-popup").on("click", function () {
        document.getElementById("review-popup").style.display = "block";
    });

    // Close the popup when clicking the close button or the black background around
    $(".close-popup").on("click", function () {
        document.getElementById("review-popup").style.display = "none";
    });

    
});