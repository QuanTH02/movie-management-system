$(document).ready(function () {
    var navbar = $(".navbar");
    var searchBox = $(".search-box");
    var scrolled = false;

    // Cuộn xuống thì mất Navbar
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



    // SEARCH
    // Lấy phần tử biểu mẫu và ô input bằng ID
    // var searchForm = document.getElementById("searchForm");
    // var searchInput = document.getElementById("searchInput");

    // // Đặt sự kiện submit cho biểu mẫu
    // if (searchForm) {
    //     searchForm.addEventListener("submit", function (event) {
    //         // Ngăn sự kiện submit mặc định của biểu mẫu
    //         event.preventDefault();

    //         // Lấy giá trị từ ô input
    //         var searchText = searchInput.value.trim().toLowerCase();

    //         localStorage.setItem("movie_name", searchText);
    //         window.location.href = "detail.html";
    //     });
    // }


    // $(".log-out").on("click", function () {
    //     window.location.href = "home.html";
    // });

    
});
