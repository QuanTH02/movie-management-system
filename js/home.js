$(document).ready(function () {
    var navbar = $(".navbar");
    var searchBox = $(".search-box");
    var scrolled = false;

    $(window).scroll(function () {
        if ($(this).scrollTop() > 50) {
            if (!scrolled) {
                navbar.addClass('transparent-animate');
                searchBox.hide();
                scrolled = true;
            }
        } else {
            if (scrolled) {
                navbar.removeClass('transparent-animate');
                searchBox.show();
                scrolled = false;
            }
        }
    });

    let currentIndex = 0;

    function changeSlide(direction) {
        const carouselInner = document.getElementById('carouselInner');
        const cardWidth = document.querySelector('.col-md-3.mb-4').offsetWidth;
        const maxIndex = carouselInner.children.length - 1;

        currentIndex += direction;

        if (currentIndex < 0) {
            currentIndex = maxIndex;
        } else if (currentIndex > maxIndex) {
            currentIndex = 0;
        }

        const newTransformValue = -currentIndex * cardWidth;
        carouselInner.style.transform = `translateX(${newTransformValue}px)`;
    }

    // Thêm sự kiện click cho nút Next
    $(".next-btn").click(function () {
        changeSlide(1);
    });

    // Thêm sự kiện click cho nút Prev
    $(".prev-btn").click(function () {
        changeSlide(-1);
    });

    let mode = 0;
    var mode_page = $("body");
    // Thêm sự kiện click cho nút Prev
    $(".mode-page").click(function () {
        if (mode == 0) {
            mode++;
            mode_page.removeClass("light-mode");
            mode_page.addClass("dark-mode");
        } else {
            mode--;
            mode_page.removeClass("dark-mode");
            mode_page.addClass("light-mode");
        }
    });

    // Lặp qua tất cả các review và áp dụng các sự kiện click cho chúng
    $('.review').each(function () {
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


    // Mở popup khi nhấp vào nút "Write a Review"
    $(".open-popup").on("click", function () {
        document.getElementById("review-popup").style.display = "block";
    });

    // Đóng popup khi nhấp vào nút đóng hoặc nền đen xung quanh
    $(".close-popup").on("click", function () {
        document.getElementById("review-popup").style.display = "none";
    });

    // Đóng popup khi nhấn ESC
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            document.getElementById("review-popup").style.display = "none";
        }
    });

    // Ngăn sự kiện submit mặc định của form để có thể xử lý dữ liệu theo ý của bạn
    document.getElementById("review-form").addEventListener("submit", function (event) {
        event.preventDefault();

        // Lấy giá trị từ các trường thông tin trong form
        const rating = document.getElementById("rating").value;
        const title = document.getElementById("title").value;
        const content = document.getElementById("content").value;

        // Xử lý dữ liệu theo ý của bạn ở đây, ví dụ: hiển thị thông tin trong console
        console.log("Rating:", rating);
        console.log("Title:", title);
        console.log("Content:", content);

        // Sau khi xử lý xong, đóng popup (có thể thay đổi hành vi này)
        document.getElementById("review-popup").style.display = "none";
    });


});
