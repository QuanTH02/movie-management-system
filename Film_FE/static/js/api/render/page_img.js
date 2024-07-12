function LoadImg(data) {
    console.log(data);

    document.getElementById("img-main-page-img").src = data[0].link_img;

    var parentElement = document.getElementById("imageContainer");

    data.forEach(movie => {
        var imgElement = document.createElement('img');

        imgElement.setAttribute('src', movie.link_img);
        imgElement.setAttribute('alt', 'img');
        imgElement.classList.add('all_img');

        parentElement.appendChild(imgElement);
    });


}

export { LoadImg }
