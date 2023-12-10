$(document).ready(function () {
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