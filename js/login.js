$(document).ready(function () {
    // Lấy phần tử trường nhập mật khẩu và biểu tượng mắt cho Password và Confirm Password
    var passwordField0 = document.getElementById("passwordField1");
    var passwordField = document.getElementById("passwordField2");
    var confirmPasswordField = document.getElementById("confirmPasswordField");

    var togglePassword0 = document.getElementById("togglePassword1");
    var togglePassword1 = document.getElementById("togglePassword2");
    var togglePassword2 = document.getElementById("toggleconfirmPassword");

    // Đặt sự kiện click cho biểu tượng mắt cho Password
    togglePassword0.addEventListener("click", function () {
        if (passwordField0.type === "password") {
            passwordField0.type = "text"; // Hiển thị mật khẩu
            togglePassword0.classList.remove("fa-eye-slash"); // Loại bỏ biểu tượng mắt đóng
            togglePassword0.classList.add("fa-eye"); // Thêm biểu tượng mắt mở
        } else {
            passwordField0.type = "password"; // Ẩn mật khẩu
            togglePassword0.classList.remove("fa-eye"); // Loại bỏ biểu tượng mắt mở
            togglePassword0.classList.add("fa-eye-slash"); // Thêm biểu tượng mắt đóng
        }
    });

    // Đặt sự kiện click cho biểu tượng mắt cho Password
    togglePassword1.addEventListener("click", function () {
        if (passwordField.type === "password") {
            passwordField.type = "text"; // Hiển thị mật khẩu
            togglePassword1.classList.remove("fa-eye-slash"); // Loại bỏ biểu tượng mắt đóng
            togglePassword1.classList.add("fa-eye"); // Thêm biểu tượng mắt mở
        } else {
            passwordField.type = "password"; // Ẩn mật khẩu
            togglePassword1.classList.remove("fa-eye"); // Loại bỏ biểu tượng mắt mở
            togglePassword1.classList.add("fa-eye-slash"); // Thêm biểu tượng mắt đóng
        }
    });

    // Đặt sự kiện click cho biểu tượng mắt cho Confirm Password
    togglePassword2.addEventListener("click", function () {
        if (confirmPasswordField.type === "password") {
            confirmPasswordField.type = "text"; // Hiển thị mật khẩu
            togglePassword2.classList.remove("fa-eye-slash"); // Loại bỏ biểu tượng mắt đóng
            togglePassword2.classList.add("fa-eye"); // Thêm biểu tượng mắt mở
        } else {
            confirmPasswordField.type = "password"; // Ẩn mật khẩu
            togglePassword2.classList.remove("fa-eye"); // Loại bỏ biểu tượng mắt mở
            togglePassword2.classList.add("fa-eye-slash"); // Thêm biểu tượng mắt đóng
        }
    });

    $(".submit").on("click", function () {
        window.location.href = "home.php";
        document.getElementById("dropdown-item-profile").style.display = "block";
        document.getElementById("dropdown-item-login").style.display = "none";
    });
});