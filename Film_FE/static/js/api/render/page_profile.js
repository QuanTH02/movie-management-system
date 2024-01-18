function LoadProfile(data) {
    var pfAccount = document.getElementById('pf-account');
    var pfFName = document.getElementById('pf-f-name');
    var pfLName = document.getElementById('pf-l-name');
    var pfEmail = document.getElementById('pf-email');
    var pfId = document.getElementById('pf-id');
    var pfDateJoined = document.getElementById('pf-date-joined');

    let dateObject = new Date(data.data.date_joined);
    let formattedDate = dateObject.toISOString().split('T')[0];

    pfAccount.placeholder = data.data.username;
    pfFName.placeholder = data.data.first_name;
    pfLName.placeholder = data.data.last_name;
    pfEmail.placeholder = data.data.email;
    pfId.placeholder = data.data.id;
    pfDateJoined.placeholder = formattedDate;

    console.log(data.data.username);
    console.log(data.data.first_name);
    console.log(data.data.last_name);
    console.log(data.data.email);
    console.log(data.data.id);
    console.log(formattedDate);

    document.getElementById("saveButton").addEventListener("click", function () {
        // Xử lý lưu thông tin ở đây (có thể gửi dữ liệu lên máy chủ)
        alert("Thông tin đã được lưu.");

        // Khôi phục trạng thái readonly và ẩn nút "Save" và "Cancel"
        var inputs = document.querySelectorAll(".userForm input");
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].setAttribute("readonly", true);
        }

        document.getElementById("saveButton").style.display = "none";
        document.getElementById("cancelButton").style.display = "none";
        document.getElementById("editButton").style.display = "inline-block";

    });
};

export { LoadProfile }