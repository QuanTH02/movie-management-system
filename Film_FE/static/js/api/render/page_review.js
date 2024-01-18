function LoadReviewElement(data, totalReviewElement) {
    var displayedReviewCount = 0;
    // Xử lý dữ liệu nhận được từ API ở đây
    data.data.forEach(jsonData => {
        displayedReviewCount++;
        // Tạo HTML từ dữ liệu JSON
        var reviewElement = document.createElement("div");
        reviewElement.classList.add("review-element", "p-3", "mb-2");

        // Tạo phần tử rate
        var rateElement = document.createElement("div");
        rateElement.classList.add("review-rate");

        var starIcon = document.createElement("i");
        starIcon.classList.add("fas", "fa-star", "pr-1");
        starIcon.style.color = "yellow";
        starIcon.style.display = "inline-block";
        starIcon.style.fontSize = "18px";

        var voteRateElement = document.createElement("div");
        voteRateElement.classList.add("d-inline-block");

        var voteRateValue = document.createElement("p");
        voteRateValue.classList.add("d-inline-block", "vote-rate");
        var starReview = jsonData.star_review;

        // Kiểm tra xem chuỗi có chứa dấu '/' hay không
        if (starReview.includes('/')) {
            // Nếu có, thực hiện tách chuỗi và lấy số
            var parts = starReview.split('/');
            var firstNumber = parseInt(parts[0]);

            // Kiểm tra xem firstNumber có phải là một số hợp lệ hay không
            if (!isNaN(firstNumber)) {
                // Đặt giá trị của voteRateValue là firstNumber
                voteRateValue.textContent = firstNumber;
            } else {
                console.error('Invalid number');
            }
        } else {
            // Nếu không có dấu '/', đặt giá trị của voteRateValue là toàn bộ chuỗi
            voteRateValue.textContent = starReview;
        }

        var voteRateSeparator = document.createElement("p");
        voteRateSeparator.classList.add("d-inline-block");
        voteRateSeparator.textContent = "/10";

        voteRateElement.appendChild(voteRateValue);
        voteRateElement.appendChild(voteRateSeparator);

        rateElement.appendChild(starIcon);
        rateElement.appendChild(voteRateElement);

        // Tạo phần tử title review
        var titleReviewElement = document.createElement("div");
        titleReviewElement.classList.add("title-review");

        var titleElement = document.createElement("h6");
        titleElement.classList.add("h-title-review");
        titleElement.textContent = jsonData.title_review;

        var nameLinkElement = document.createElement("a");
        nameLinkElement.classList.add("d-inline-block");
        nameLinkElement.href = "#";

        var nameElement = document.createElement("p");
        nameElement.classList.add("name-review");
        nameElement.textContent = jsonData.name_review;

        var dateElement = document.createElement("p");
        dateElement.classList.add("date-review", "d-inline-block", "ml-2");
        var dateTime = new Date(jsonData.date_review);

        // Lấy ngày, tháng và năm từ đối tượng Date
        var day = dateTime.getDate();
        var monthIndex = dateTime.getMonth();
        var year = dateTime.getFullYear();

        // Mảng các tháng
        var months = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        // Chuyển đổi chỉ số tháng thành tên tháng
        var monthName = months[monthIndex];

        // Kết hợp các giá trị để tạo chuỗi định dạng
        var formattedTime = `${day} ${monthName} ${year}`;
        dateElement.textContent = formattedTime;

        var reviewContentElement = document.createElement("div");
        reviewContentElement.classList.add("review-content");

        var contentParagraph = document.createElement("p");
        contentParagraph.textContent = jsonData.content_review;
        reviewContentElement.appendChild(contentParagraph);

        var reviewStatsElement = document.createElement("div");
        reviewStatsElement.classList.add("review");

        var thumbsUpIcon = document.createElement("i");
        thumbsUpIcon.classList.add("fa-regular", "fa-thumbs-up", "d-inline-block");
        thumbsUpIcon.style.fontSize = "20px";
        thumbsUpIcon.style.width = "100px";

        var likeCountElement = document.createElement("p");
        likeCountElement.classList.add("d-inline-block", "pl-2", "pr-4", "like-count");
        likeCountElement.style.fontSize = "14px";
        likeCountElement.textContent = "0";

        thumbsUpIcon.appendChild(likeCountElement);

        var thumbsDownIcon = document.createElement("i");
        thumbsDownIcon.classList.add("fa-regular", "fa-thumbs-down", "d-inline-block");
        thumbsDownIcon.style.fontSize = "20px";
        thumbsDownIcon.style.width = "100px";

        var dislikeCountElement = document.createElement("p");
        dislikeCountElement.classList.add("d-inline-block", "pl-2", "pr-4", "dislike-count");
        dislikeCountElement.style.fontSize = "14px";
        dislikeCountElement.textContent = "0";

        thumbsDownIcon.appendChild(dislikeCountElement);

        reviewStatsElement.appendChild(thumbsUpIcon);
        reviewStatsElement.appendChild(thumbsDownIcon);

        nameLinkElement.appendChild(nameElement);
        titleReviewElement.appendChild(titleElement);
        titleReviewElement.appendChild(nameLinkElement);
        titleReviewElement.appendChild(dateElement);
        titleReviewElement.appendChild(reviewContentElement);
        titleReviewElement.appendChild(reviewStatsElement);

        reviewElement.appendChild(rateElement);
        reviewElement.appendChild(titleReviewElement);

        // Thêm reviewElement vào div chứa tất cả các review (ví dụ: có id là "user-reviews")
        var userReviewsContainer = document.querySelector(".user-review-elements");
        userReviewsContainer.appendChild(reviewElement);
    });
    displayedReviewCount++;
    totalReviewElement.textContent = displayedReviewCount;
}

export { LoadReviewElement }