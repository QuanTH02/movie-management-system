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
  <?php
  include 'nav.php';
  ?>

  <!-- Container -->
  <div class="div-container mt-4">
    <!-- First div -->
    <!-- Banner Image -->
    <div class="row">
      <div class="col-md-8 banner-trailer-film">
        <div id="carouselBannerImg" class="carousel slide">
          <!-- <ol class="carousel-indicators mb-1">
            <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
          </ol> -->
          <div class="carousel-inner video-trailer" data-ride="false">
            <div class="carousel-item active">
              <video controls width="100%">
                <source
                  src="https://imdb-video.media-imdb.com/vi2046936089/1434659607842-pgv4ql-1680706385480.mp4?Expires=1702237252&Signature=nB3k4f2J6Qhha0-0ITJ31nPHzmWtEMGTnkaQhtTvo7Orx3d38wC0fvM~eYe9b1~0qJc2xggxGut1IgPANOZS8OKiWi5QBoQQ6ZpHzwtjcUqXTamHixM7wFomhcX-tm9cLt3ei~WoiOTaqw9QAwwFFxflW3DY5CWI2mbFgDoDpnMfF89Ebj7UN8jK3SBqNC62woXDvzdZR5QiihP7KZm~NcJs7Rjgc7aFodsWUGwZZDjaqRICbhhB~z9BFMHkPacBR8Y3triiYNC9wgvNGzfjx-qIR81QSftfcCfgbH5VpzjMcJ3RqIfy5rYHaK9nrTQQFQE8c2BCe7-6tEAfggpwPg__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA"
                  type="video/mp4">
                Your browser does not support the video tag.
              </video>
            </div>

            <div class="carousel-item video-trailer">
              <video controls width="100%">
                <source
                  src="https://imdb-video.media-imdb.com/vi2046936089/1434659607842-pgv4ql-1680706385480.mp4?Expires=1702237252&Signature=nB3k4f2J6Qhha0-0ITJ31nPHzmWtEMGTnkaQhtTvo7Orx3d38wC0fvM~eYe9b1~0qJc2xggxGut1IgPANOZS8OKiWi5QBoQQ6ZpHzwtjcUqXTamHixM7wFomhcX-tm9cLt3ei~WoiOTaqw9QAwwFFxflW3DY5CWI2mbFgDoDpnMfF89Ebj7UN8jK3SBqNC62woXDvzdZR5QiihP7KZm~NcJs7Rjgc7aFodsWUGwZZDjaqRICbhhB~z9BFMHkPacBR8Y3triiYNC9wgvNGzfjx-qIR81QSftfcCfgbH5VpzjMcJ3RqIfy5rYHaK9nrTQQFQE8c2BCe7-6tEAfggpwPg__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA"
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
          <h3 style="margin-top: -10px;">Next Trailer</h3>

          <!-- Right Video -->
          <?php for ($i = 1; $i <= 3; $i++): ?>
            <li class="list-group-item pt-0 pb-0 mb-1 trailer-play">
              <div class="row">
                <div class="col-md-2 img-small">
                  <img src="img/vebinh<?= $i ?>.jpg" class="card-img-top" alt="Movie Image">
                </div>

                <div class="col-md-10 card-body d-flex flex-column mt-0 pt-0">
                  <p class="play-time"><i class="fa fa-play-circle-o mr-2" style="font-size:30px"></i> 0:49</p>
                  <h5 class="card-title mt-0 mb-1" style="color: rgba(255, 255, 255, 0.9);">Ve Binh Giai Ngan Ha di giai
                    cuu the gioi dong vat</h5>
                  <p class="des">Description</p>
                </div>
              </div>
            </li>
          <?php endfor; ?>

          <a href="#">
            <h2>Browse Trailer ></h2>
          </a>
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
            <?php for ($i = 1; $i <= 6; $i++): ?>
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
                    <a href="detail.php" class="mt-2" style="width: 150px; text-align:center;"><button
                        class="btn btn-success p-2"><i class="fa fa-play mr-1"></i> Watch Movie</button></a>

                  </div>
                </div>
              </div>
            <?php endfor; ?>
          </div>
        </div>
        <div class="carousel-item">
          <div class="row mt-4">
            <?php for ($i = 6; $i >= 1; $i--): ?>
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
                    <a href="detail.php" class="mt-2" style="width: 150px; text-align:center;"><button
                        class="btn btn-success p-2"><i class="fa fa-play mr-1"></i> Watch Movie</button></a>
                  </div>
                </div>
              </div>
            <?php endfor; ?>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselMostpopular" role="button" data-slide="prev" style="width: 30px">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselMostpopular" role="button" data-slide="next" style="width: 30px">
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
            <?php for ($i = 1; $i <= 6; $i++): ?>
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
                    <a href="detail.php" class="mt-2" style="width: 150px; text-align:center;"><button
                        class="btn btn-success p-2"><i class="fa fa-play mr-1"></i> Watch Movie</button></a>
                  </div>
                </div>
              </div>
            <?php endfor; ?>
          </div>
        </div>
        <div class="carousel-item">
          <div class="row mt-4">
            <?php for ($i = 6; $i >= 1; $i--): ?>
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
                    <a href="detail.php" class="mt-2" style="width: 150px; text-align:center;"><button
                        class="btn btn-success p-2"><i class="fa fa-play mr-1"></i> Watch Movie</button></a>
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
            <?php for ($i = 1; $i <= 6; $i++): ?>
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
                    <a href="detail.php" class="mt-2" style="width: 150px; text-align:center;"><button
                        class="btn btn-success p-2"><i class="fa fa-play mr-1"></i> Watch Movie</button></a>
                  </div>
                </div>
              </div>
            <?php endfor; ?>
          </div>
        </div>
        <div class="carousel-item">
          <div class="row mt-4">
            <?php for ($i = 6; $i >= 1; $i--): ?>
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
                    <a href="detail.php" class="mt-2" style="width: 150px; text-align:center;"><button
                        class="btn btn-success p-2"><i class="fa fa-play mr-1"></i> Watch Movie</button></a>
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
            <?php for ($i = 1; $i <= 6; $i++): ?>
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
                    <a href="detail.php" class="mt-2" style="width: 150px; text-align:center;"><button
                        class="btn btn-success p-2"><i class="fa fa-play mr-1"></i> Watch Movie</button></a>
                  </div>
                </div>
              </div>
            <?php endfor; ?>
          </div>
        </div>
        <div class="carousel-item">
          <div class="row mt-4">
            <?php for ($i = 6; $i >= 1; $i--): ?>
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
                    <a href="detail.php" class="mt-2" style="width: 150px; text-align:center;"><button
                        class="btn btn-success p-2"><i class="fa fa-play mr-1"></i> Watch Movie</button></a>
                  </div>
                </div>
              </div>
            <?php endfor; ?>
          </div>
        </div>
      </div>
      <a class="carousel-control-prev" href="#carouselLatest" role="button" data-slide="prev" style="width: 30px">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="sr-only">Previous</span>
      </a>
      <a class="carousel-control-next" href="#carouselLatest" role="button" data-slide="next" style="width: 30px">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="sr-only">Next</span>
      </a>
    </div>

  </div>

  <!-- Footer -->
  <?php
  include 'footer.php';
  ?>

</body>

</html>