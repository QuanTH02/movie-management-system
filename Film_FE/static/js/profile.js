$(document).ready(function () {
    document.getElementById("editButton").addEventListener("click", function () {
        // Cho phép chỉnh sửa thông tin
        var inputs = document.querySelectorAll(".userForm input");
        inputs[1].removeAttribute("readonly");
        inputs[2].removeAttribute("readonly");
        inputs[3].removeAttribute("readonly");
        // inputs[4].removeAttribute("readonly");

        // Hiển thị nút "Save" và "Cancel"
        document.getElementById("saveButton").style.display = "inline-block";
        document.getElementById("cancelButton").style.display = "inline-block";
        document.getElementById("editButton").style.display = "none";
    });

    document.getElementById("cancelButton").addEventListener("click", function () {
        // Hủy chỉnh sửa và khôi phục trạng thái readonly
        var inputs = document.querySelectorAll(".userForm input");
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].setAttribute("readonly", true);
        }

        // Ẩn nút "Save" và "Cancel", hiển thị lại nút "Edit"
        document.getElementById("saveButton").style.display = "none";
        document.getElementById("cancelButton").style.display = "none";
        document.getElementById("editButton").style.display = "inline-block";
    });

    // document.getElementById("saveButton").addEventListener("click", function () {
    //     // Xử lý lưu thông tin ở đây (có thể gửi dữ liệu lên máy chủ)
    //     alert("Thông tin đã được lưu.");

    //     // Khôi phục trạng thái readonly và ẩn nút "Save" và "Cancel"
    //     var inputs = document.querySelectorAll(".userForm input");
    //     for (var i = 0; i < inputs.length; i++) {
    //         inputs[i].setAttribute("readonly", true);
    //     }

    //     document.getElementById("saveButton").style.display = "none";
    //     document.getElementById("cancelButton").style.display = "none";
    //     document.getElementById("editButton").style.display = "inline-block";
    // });

    document.getElementById("list_film").addEventListener("click", function () {
        var element = document.getElementById("h3_list_film");

        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });

    document.getElementById("profile").addEventListener("click", function () {
        var element = document.getElementById("h3_profile");

        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });

    document.getElementById("btn-log-out").addEventListener("click", function () {
        localStorage.removeItem('currentAccount');
        window.location.href = "login.html";
    });

});