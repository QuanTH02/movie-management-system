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

    // console.log(data.data.username);
    // console.log(data.data.first_name);
    // console.log(data.data.last_name);
    // console.log(data.data.email);
    // console.log(data.data.id);
    // console.log(formattedDate);

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

function LoadMovieLike(data) {
    const lenData = data.length;
    const colLeft = Math.floor(lenData / 2);

    var divLeftElement = document.getElementById("movie_like_col_1");
    var divRightElement = document.getElementById("movie_like_col_2");


    data.forEach((movie, index) => {
        var link = document.createElement("a");
        link.href = "detail.html";

        var img = document.createElement("img");
        img.src = movie.main_img;

        var div = document.createElement("div");

        var listItem = document.createElement("li");
        var title = document.createElement("h5");
        title.textContent = movie.movie_name;

        var ul = document.createElement("ul");
        var year = document.createElement("li");
        year.textContent = movie.year_manufacture;
        var dot1 = document.createElement("i");
        dot1.className = "fas fa-circle pl-1 pr-1";
        dot1.style.fontSize = "2px";
        dot1.style.verticalAlign = "middle";
        var genre = document.createElement("li");
        genre.textContent = "T18";
        var dot2 = document.createElement("i");
        dot2.className = "fas fa-circle pl-1 pr-1";
        dot2.style.fontSize = "2px";
        dot2.style.verticalAlign = "middle";
        var duration = document.createElement("li");
        duration.textContent = movie.time;

        ul.appendChild(year);
        ul.appendChild(dot1);
        ul.appendChild(genre);
        ul.appendChild(dot2);
        ul.appendChild(duration);

        listItem.appendChild(title);
        listItem.appendChild(ul);

        div.appendChild(listItem);

        link.appendChild(img);
        link.appendChild(div);

        // console.log(index);

        if (index <= colLeft) divLeftElement.appendChild(link);
        else divRightElement.appendChild(link);
    });
}

export { LoadProfile, LoadMovieLike }