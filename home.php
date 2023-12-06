<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Movie Website</title>

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet" href="templates/home.css">


  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
  <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.1/dist/umd/popper.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
  <script src="js/home.js"></script>
  <style>
    /* Add your custom styles here */

    /* Fix for the container */
    body {
      padding-top: 56px;
      /* Adjust based on your navbar height */
    }
  </style>
</head>

<body>

  <!-- Navbar -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top all-page-navbar">
    <a class="navbar-brand ml-5" href="#">QuanFilm</a>

    <div class="collapse navbar-collapse" id="navbarNav">
      <form class="search-box form-inline ml-auto">
        <input class="form-control mr-2" type="search" placeholder="Search" aria-label="Search" style="width: 500px;">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>

      <ul class="navbar-nav ml-auto mr-4">
        <li class="nav-item">
          <a class="nav-link mode-page" href="#">Mode</a>
        </li>

        <li class="nav-item dropdown ml-4">
          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false">
            <i class="fas fa-cog"></i> Setting
          </a>
          <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">Log in</a>
            <!-- <a class="dropdown-item" href="#">Đăng Xuất</a> -->
          </div>
        </li>

      </ul>
    </div>

  </nav>

  <!-- Container -->
  <div class="div-container mt-4" style="width: 85%; margin-left: auto; margin-right: auto;">
    <!-- First div -->
    <!-- Banner Image -->
    <div class="row">
      <div class="col-md-8 banner-trailer-film">
        <div id="carouselBannerImg" class="carousel slide" data-ride="carousel">
          <!-- <ol class="carousel-indicators mb-1">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol> -->
          <div class="carousel-inner" style="border: solid rgb(60, 60, 60, 0.5) 2px; border-radius: 4px">
            <div class="carousel-item active">
              <video controls width="100%">
                <source
                  src="https://imdb-video.media-imdb.com/vi1964427033/1434659607842-pgv4ql-1701124208277.mp4?Expires=1701877503&Signature=QGwsSnk2m3o152buAYFCybpbNOp81jH~S7TaWGCtVI9ijKInA4D~gFCgZNogYVIE0afT6R4YR6xWrUNt2oMz7z6a2aWCi9U7O8WSbMwjUe7y0tM0LRcayfZLreV9mVaE3eJica34aaRAButHT48tzL6E4rZuf2Jo5qqhwkyl6~7YQr-yOScbjS0KbCjvokGqxH83QT5rBoRISsyG4giIZjxRYgKc6rupHsPvuT~BCHYHOyl2i3F-JqHUtKkqWl0nWGWfzSu1~9KsA2SxQHRdET4RFJja8e6sw~zPacGZIs2GvhdzoffEOyjzYGZYniHgGbXYb4KK6jZ6D0y84Lovtw__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA"
                  type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>

            <div class="carousel-item">
              <video controls width="100%">
                <source
                  src="https://imdb-video.media-imdb.com/vi1511835417/1434659607842-pgv4ql-1701537566529.mp4?Expires=1701929277&Signature=miL77aeBFchZmkLwp3Nx8duQpGEdBGwzkuQxcnMH4LfWoQtt54dMv~-tF9SoVetF7t3UBTP7KopqM7cxcUEXcxjUju3lWpdxyMwVJw2dDEEkUIBob5WVNU81l~Y~iFfwRSPXlINmHd3IaQIYx7GMdOo~2i8M8j-iURHdSfF-X4XHThPIF50uwP1qF2SyGC2PwSXBwALKK5prEcV3mLN6CtShduggvy2xncQUoW~SC54QVjjh7esaIzgw-B~viK6TUhn4qay4DOxp-4TSPZZDbTRoAj-frvvn9Xjgtia5~NTW39KO4fiTrGG1aMsH2YyPdrP8i~Qrn1EFOFG7y0-aXA__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA"
                  type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>

          </div>

          <a class="carousel-control-prev" href="#carouselBannerImg" role="button" data-slide="prev"
            style="width: 30px">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
          </a>
          <a class="carousel-control-next" href="#carouselBannerImg" role="button" data-slide="next"
            style="width: 30px">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
          </a>
        </div>
      </div>
      <div class="col-md-4 pr-0 list-trailer-play">
        <ul class="list-group">
          <h3 style="margin-top: -10px;">Trailer</h3>

          <!-- Right Video -->
          <?php for($i = 1; $i <= 3; $i++): ?>
            <li class="list-group-item pt-0 pb-0 mb-1 trailer-play">
              <div class="row">
                <div class="col-md-2 img-small">
                  <img src="img/vebinh<?= $i ?>.jpg" class="card-img-top" alt="Movie Image">
                </div>

                <div class="col-md-10 card-body d-flex flex-column mt-0 pt-0">
                  <p class="play-time"><i class="fa fa-play-circle-o mr-2" style="font-size:30px"></i> 0:49</p>
                  <h5 class="card-title mt-0 mb-1">Ve Binh Giai Ngan Ha Di giai cuu the gioi dong vat</h5>
                  <p class="des">Description</p>
                </div>
              </div>
            </li>
          <?php endfor; ?>

          <a href="#"><h2>Browse Trailer ></h2></a>
        </ul>
      </div>
    </div>

    <h1 class="mt-0">What to watch</h1>

    <!-- Most popular -->
    <div>
      <a href="#" style="color: black;">
        <h3 class="topic mb-0 mt-4">| Most popular <i class="fas fa-chevron-right"></i></h3>
      </a>
    </div>

    <!-- Second div -->
    <div id="carouselMostpopular" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="row mt-4">
            <?php for($i = 1; $i <= 6; $i++): ?>
              <!-- Repeat the following block for each movie -->
              <div class="col-md-2 mb-4 mr-0">
                <div class="card">
                  <div class="img-container">
                    <img src="img/vebinh<?= $i ?>.jpg" class="card-img-top" alt="Movie Image">
                  </div>

                  <div class="card-body d-flex flex-column align-items-center">
                    <p class="card-text mr-auto mb-2"><i class="fas fa-star" style="color: yellow;"></i>
                      4.9</p>
                    <h6 class="card-title mt-0">Ve Binh Giai Ngan Ha</h6>
                    <br>
                    <button class="btn btn-primary"><i class='fas fa-plus'></i> Add to List</button>
                    <button class="btn btn-success mt-2"><i class="fa fa-play"></i> Watch Movie</button>
                  </div>
                </div>
              </div>
            <?php endfor; ?>
          </div>
        </div>
        <div class="carousel-item">
          <div class="row mt-4">
            <?php for($i = 6; $i >= 1; $i--): ?>
              <!-- Repeat the following block for each movie -->
              <div class="col-md-2 mb-4 mr-0">
                <div class="card">
                  <div class="img-container">
                    <img src="img/vebinh<?= $i ?>.jpg" class="card-img-top" alt="Movie Image">
                  </div>

                  <div class="card-body d-flex flex-column align-items-center">
                    <p class="card-text mr-auto mb-2"><i class="fas fa-star" style="color: yellow;"></i>
                      4.9</p>
                    <h6 class="card-title mt-0">Ve Binh Giai Ngan Ha</h6>
                    <br>
                    <button class="btn btn-primary"><i class='fas fa-plus'></i> Add to List</button>
                    <button class="btn btn-success mt-2"><i class="fa fa-play"></i> Watch Movie</button>
                  </div>
                </div>
              </div>
            <?php endfor; ?>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselMostpopular" role="button" data-slide="prev"
        style="width: 30px">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselMostpopular" role="button" data-slide="next"
        style="width: 30px">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>


    <!-- Most favourites -->
    <div>
      <a href="#" style="color: black;">
        <h3 class="topic mb-0 mt-4">| Most favourites <i class="fas fa-chevron-right"></i></h3>
      </a>
    </div>

    <!-- Second div -->
    <div id="carouselMostfavourites" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="row mt-4">
            <?php for($i = 1; $i <= 6; $i++): ?>
              <!-- Repeat the following block for each movie -->
              <div class="col-md-2 mb-4 mr-0">
                <div class="card">
                  <div class="img-container">
                    <img src="img/vebinh<?= $i ?>.jpg" class="card-img-top" alt="Movie Image">
                  </div>

                  <div class="card-body d-flex flex-column align-items-center">
                    <p class="card-text mr-auto mb-2"><i class="fas fa-star" style="color: yellow;"></i>
                      4.9</p>
                    <h6 class="card-title mt-0">Ve Binh Giai Ngan Ha</h6>
                    <br>
                    <button class="btn btn-primary"><i class='fas fa-plus'></i> Add to List</button>
                    <button class="btn btn-success mt-2"><i class="fa fa-play"></i> Watch Movie</button>
                  </div>
                </div>
              </div>
            <?php endfor; ?>
          </div>
        </div>
        <div class="carousel-item">
          <div class="row mt-4">
            <?php for($i = 6; $i >= 1; $i--): ?>
              <!-- Repeat the following block for each movie -->
              <div class="col-md-2 mb-4 mr-0">
                <div class="card">
                  <div class="img-container">
                    <img src="img/vebinh<?= $i ?>.jpg" class="card-img-top" alt="Movie Image">
                  </div>

                  <div class="card-body d-flex flex-column align-items-center">
                    <p class="card-text mr-auto mb-2"><i class="fas fa-star" style="color: yellow;"></i>
                      4.9</p>
                    <h6 class="card-title mt-0">Ve Binh Giai Ngan Ha</h6>
                    <br>
                    <button class="btn btn-primary"><i class='fas fa-plus'></i> Add to List</button>
                    <button class="btn btn-success mt-2"><i class="fa fa-play"></i> Watch Movie</button>
                  </div>
                </div>
              </div>
            <?php endfor; ?>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselMostfavourites" role="button" data-slide="prev"
        style="width: 30px">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselMostfavourites" role="button" data-slide="next"
        style="width: 30px">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>

    <!-- Highest revenue -->
    <div>
      <a href="#" style="color: black;">
        <h3 class="topic mb-0 mt-4">| Highest revenue <i class="fas fa-chevron-right"></i></h3>
      </a>
    </div>

    <!-- Second div -->
    <div id="carouselHighestRevenue" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="row mt-4">
            <?php for($i = 1; $i <= 6; $i++): ?>
              <!-- Repeat the following block for each movie -->
              <div class="col-md-2 mb-4 mr-0">
                <div class="card">
                  <div class="img-container">
                    <img src="img/vebinh<?= $i ?>.jpg" class="card-img-top" alt="Movie Image">
                  </div>

                  <div class="card-body d-flex flex-column align-items-center">
                    <p class="card-text mr-auto mb-2"><i class="fas fa-star" style="color: yellow;"></i>
                      4.9</p>
                    <h6 class="card-title mt-0">Ve Binh Giai Ngan Ha</h6>
                    <br>
                    <button class="btn btn-primary"><i class='fas fa-plus'></i> Add to List</button>
                    <button class="btn btn-success mt-2"><i class="fa fa-play"></i> Watch Movie</button>
                  </div>
                </div>
              </div>
            <?php endfor; ?>
          </div>
        </div>
        <div class="carousel-item">
          <div class="row mt-4">
            <?php for($i = 6; $i >= 1; $i--): ?>
              <!-- Repeat the following block for each movie -->
              <div class="col-md-2 mb-4 mr-0">
                <div class="card">
                  <div class="img-container">
                    <img src="img/vebinh<?= $i ?>.jpg" class="card-img-top" alt="Movie Image">
                  </div>

                  <div class="card-body d-flex flex-column align-items-center">
                    <p class="card-text mr-auto mb-2"><i class="fas fa-star" style="color: yellow;"></i>
                      4.9</p>
                    <h6 class="card-title mt-0">Ve Binh Giai Ngan Ha</h6>
                    <br>
                    <button class="btn btn-primary"><i class='fas fa-plus'></i> Add to List</button>
                    <button class="btn btn-success mt-2"><i class="fa fa-play"></i> Watch Movie</button>
                  </div>
                </div>
              </div>
            <?php endfor; ?>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselHighestRevenue" role="button" data-slide="prev"
        style="width: 30px">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselHighestRevenue" role="button" data-slide="next"
        style="width: 30px">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>

    <!-- Latest -->
    <div>
      <a href="#" style="color: black;">
        <h3 class="topic mb-0 mt-4">| Latest <i class="fas fa-chevron-right"></i></h3>
      </a>
    </div>

    <!-- Second div -->
    <div id="carouselLatest" class="carousel slide" data-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <div class="row mt-4">
            <?php for($i = 1; $i <= 6; $i++): ?>
              <!-- Repeat the following block for each movie -->
              <div class="col-md-2 mb-4 mr-0">
                <div class="card">
                  <div class="img-container">
                    <img src="img/vebinh<?= $i ?>.jpg" class="card-img-top" alt="Movie Image">
                  </div>

                  <div class="card-body d-flex flex-column align-items-center">
                    <p class="card-text mr-auto mb-2"><i class="fas fa-star" style="color: yellow;"></i>
                      4.9</p>
                    <h6 class="card-title mt-0">Ve Binh Giai Ngan Ha</h6>
                    <br>
                    <button class="btn btn-primary"><i class='fas fa-plus'></i> Add to List</button>
                    <button class="btn btn-success mt-2"><i class="fa fa-play"></i> Watch Movie</button>
                  </div>
                </div>
              </div>
            <?php endfor; ?>
          </div>
        </div>
        <div class="carousel-item">
          <div class="row mt-4">
            <?php for($i = 6; $i >= 1; $i--): ?>
              <!-- Repeat the following block for each movie -->
              <div class="col-md-2 mb-4 mr-0">
                <div class="card">
                  <div class="img-container">
                    <img src="img/vebinh<?= $i ?>.jpg" class="card-img-top" alt="Movie Image">
                  </div>

                  <div class="card-body d-flex flex-column align-items-center">
                    <p class="card-text mr-auto mb-2"><i class="fas fa-star" style="color: yellow;"></i>
                      4.9</p>
                    <h6 class="card-title mt-0">Ve Binh Giai Ngan Ha</h6>
                    <br>
                    <button class="btn btn-primary"><i class='fas fa-plus'></i> Add to List</button>
                    <button class="btn btn-success mt-2"><i class="fa fa-play"></i> Watch Movie</button>
                  </div>
                </div>
              </div>
            <?php endfor; ?>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselLatest" role="button" data-slide="prev"
        style="width: 30px">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselLatest" role="button" data-slide="next"
        style="width: 30px">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>

  </div>

  <br><br><br><br><br><br>

  <h1 class="text-center">The end</h1>
  <!-- Footer -->
  <footer class="flex-bottom" style="background-color: #343a40;">
  <br>
    <div class="container">
      <div class="row">
        <div class="col-md-6 text-center">
          Tran Hong Quan
          <br>
          0123455678
        </div>
        <div class="col-md-6 text-center">
          <a href="#" class="f-fb">
            <i class="fab fa-facebook"></i> Facebook
          </a>
          <br>
          <a href="#" class="f-ins">
            <i class="fab fa-instagram"></i> Instagram
          </a>
        </div>
      </div>
    </div>
    <br>
  </footer>

  <!-- Settings Modal -->
  <div class="modal fade" id="settingsModal" tabindex="-1" role="dialog" aria-labelledby="settingsModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="settingsModalLabel">Settings</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <button class="btn btn-info btn-block mb-2">View Information</button>
          <button class="btn btn-danger btn-block">Log Out</button>
        </div>
      </div>
    </div>
  </div>

</body>

</html>