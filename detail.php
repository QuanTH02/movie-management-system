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
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.1/dist/umd/popper.min.js"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    <script src="js/home.js"></script>
    <style>
        /* Add your custom styles here */

        /* Fix for the container */
        body {
            padding-top: 65px;
            /* Adjust based on your navbar height */
        }
    </style>
</head>

<body>
    <!-- Navbar -->
    <?php
    include 'nav.php';
    ?>

    <!-- Film -->
    <div>
        <div class="bg-film" style="margin-top: 0px;">
            <div class="div-container pt-2 pb-3">
                <div class="menu-float" style="width: 100%; text-align: right;">
                    <ul>
                        <li><a href="cast_and_crew.php">
                                <h6>Cast & Crew</h6>
                            </a> </li>
                        <i class="fas fa-circle pl-1 pr-1" style="font-size: 2px; vertical-align: middle;"></i>
                        <li><a href="user_review.php">
                                <h6>User review</h6>
                            </a></li>
                    </ul>
                </div>

                <!-- Description -->
                <div class="row">
                    <div class="col-4">
                        <h1>Vệ binh giải ngân hà</h1>
                        <div class="float-left">
                            <ul class="pl-0">
                                <li>2023</li>
                                <i class="fas fa-circle pl-1 pr-1" style="font-size: 2px; vertical-align: middle;"></i>
                                <li>T18</li>
                                <i class="fas fa-circle pl-1 pr-1" style="font-size: 2px; vertical-align: middle;"></i>
                                <li>2h 38m</li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-4"></div>
                    <div class="col-4" style="text-align: right;">
                        <h6 class="mb-0 pb-0">IMDb RATING</h6>
                        <a href="#" class="imdb-rating">
                            <div class="mr-0 pr-0 div-imdb-rating"
                                style="display: flex; align-items: center; justify-content: flex-end;">
                                <i class="fas fa-star pr-2"
                                    style="color: yellow; display: inline-block; font-size: 24px;"></i>
                                <div style="display: inline-block;">
                                    <p class="m-0">6.6/10</p>
                                    <p class="m-0">51K</p>
                                </div>
                            </div>
                        </a>
                    </div>
                </div>

                <!-- Image and trailer -->
                <div class="row">
                    <div class="col-3 pr-0">
                        <img src="img/vebinh1.jpg" alt="Image" style="width: 100%; height: 100%;">
                    </div>
                    <div class="col-7 pl-1 pr-0 video-trailer">
                        <video controls width="100%">
                            <source
                                src="https://imdb-video.media-imdb.com/vi2046936089/1434659607842-pgv4ql-1680706385480.mp4?Expires=1702237252&Signature=nB3k4f2J6Qhha0-0ITJ31nPHzmWtEMGTnkaQhtTvo7Orx3d38wC0fvM~eYe9b1~0qJc2xggxGut1IgPANOZS8OKiWi5QBoQQ6ZpHzwtjcUqXTamHixM7wFomhcX-tm9cLt3ei~WoiOTaqw9QAwwFFxflW3DY5CWI2mbFgDoDpnMfF89Ebj7UN8jK3SBqNC62woXDvzdZR5QiihP7KZm~NcJs7Rjgc7aFodsWUGwZZDjaqRICbhhB~z9BFMHkPacBR8Y3triiYNC9wgvNGzfjx-qIR81QSftfcCfgbH5VpzjMcJ3RqIfy5rYHaK9nrTQQFQE8c2BCe7-6tEAfggpwPg__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA"
                                type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div class="col-2 pl-1">
                        <div class="right-trailer-center">
                            <div>
                                <i class="fa-solid fa-play mb-2"></i>
                                <p class="mb-0">Video</p>
                            </div>
                        </div>

                        <div class="right-trailer-center">
                            <div>
                                <i class="fa-solid fa-image mb-2"></i>
                                <p class="mb-0">Image</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Intro -->
                <div class="mt-3 div-intro">
                    <div class="row">
                        <div class="col-8">
                            <!-- Genres -->
                            <div class="genres">
                                <ul class="pl-0">
                                    <li><a href="#">Action</a></li>
                                    <li><a href="#">Adventure</a></li>
                                    <li><a href="#">Biography</a></li>
                                </ul>
                            </div>
                            <!-- Des -->
                            <div>
                                <p class="intro" style="font-size: 18px;">An epic that details the checkered rise and
                                    fall
                                    of French Emperor Napoleon
                                    Bonaparte and his relentless journey to power through the prism of his addictive,
                                    volatile relationship with his wife, Josephine.</p>
                            </div>

                            <hr>
                            <div class="director-writer-star">
                                <!-- Director -->
                                <div class="text-inline">
                                    <p>Director</p>
                                    <a href="#">Ridley Scott</a>
                                </div>
                                <!-- Writer -->
                                <hr class="mt-0">
                                <div class="text-inline">
                                    <p>Writer</p>
                                    <a href="#">David Scarpa</a>
                                </div>
                                <!-- Stars -->
                                <hr class="mt-0">
                                <div class="intro-stars text-inline-link">
                                    <p class="mb-0">Stars</p>
                                    <a href="#">John</a>
                                    <i class="fas fa-circle pl-1 pr-1"
                                        style="font-size: 2px; vertical-align: middle;"></i>
                                    <a href="#">David</a>
                                    <i class="fas fa-circle pl-1 pr-1"
                                        style="font-size: 2px; vertical-align: middle;"></i>
                                    <a href="#">Tahar</a>

                                    <div class="link-stars" style="display: inline; float: right; margin-right: 12px;">
                                        <a href="#"><i class="fa-solid fa-chevron-right"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-4 intro-user-review">
                            <p class="intro-user-review-icon">20</p>
                            <p>User review</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <!-- Background Content -->
        <div class="bg-content">
            <div class="div-container">
                <!-- Content -->
                <div class="content pt-4">
                    <div class="row">
                        <!-- Content left -->
                        <div class="col-8">
                            <!-- Awards-->
                            <a href="awards.php">
                                <div class="content-awards pb-0 pt-0">
                                    <p class="mb-0 pt-2 pb-2 pl-2 d-inline-block">Awards</p>
                                    <div class="link-stars pb-0 pr-2"
                                        style="display: inline; float: right; padding-top: 8px;">
                                        <a href="awards.php"><i class="fa-solid fa-chevron-right"></i></a>
                                    </div>
                                </div>
                            </a>

                            <!-- Top cast -->
                            <div class="top-cast">
                                <a href="#">
                                    <h3 class="topic mb-0 mt-4">| Top cast <i class="fas fa-chevron-right"></i></h3>
                                </a>

                                <ul class="pl-0 mt-3">
                                    <div class="row">
                                        <div class="col-6">
                                            <li>
                                                <h5>John David Washington</h5>
                                                <p>Joshua</p>
                                            </li>
                                            <li>
                                                <h5>Madeleine Yuna Voyles</h5>
                                                <p> Alphie</p>
                                            </li>
                                            <li>
                                                <h5>Gemma Chan</h5>
                                                <p> Maya</p>
                                            </li>
                                            <li>
                                                <h5>Allison Janney</h5>
                                                <p>Colonel Howell</p>
                                            </li>
                                            <li>
                                                <h5>Allison Janney</h5>
                                                <p>Colonel Howell</p>
                                            </li>
                                        </div>

                                        <div class="col-6">
                                            <li>
                                                <h5>Ken Watanabe</h5>
                                                <p>Harun</p>
                                            </li>
                                            <li>
                                                <h5>Ken Watanabe</h5>
                                                <p>Drew</p>
                                            </li>
                                            <li>
                                                <h5>Sturgill Simpson</h5>
                                                <p>Omni / Sek-on / Sergeant Bui</p>
                                            </li>
                                            <li>
                                                <h5>Amar Chadha-Patel</h5>
                                                <p>McBride</p>
                                            </li>
                                            <li>
                                                <h5>Allison Janney</h5>
                                                <p>Colonel Howell</p>
                                            </li>
                                        </div>
                                    </div>
                                </ul>

                                <div class="director-writer-star">
                                    <!-- Director -->
                                    <div class="text-inline">
                                        <p>Director</p>
                                        <a href="#">Ridley Scott</a>
                                    </div>
                                    <!-- Writer -->
                                    <hr class="mt-0">
                                    <div class="text-inline">
                                        <p>Writer</p>
                                        <a href="#">David Scarpa</a>
                                    </div>
                                    <!-- All cast and crew -->
                                    <hr class="mt-0">
                                    <a href="cast_and_crew.php" class="intro-stars text-inline-link">
                                        <p class="mb-0">All cast & crew</p>
                                        <div class="link-stars"
                                            style="display: inline; float: right; margin-right: 12px;">
                                            <a href="cast_and_crew.php"><i class="fa-solid fa-chevron-right"></i></a>
                                        </div>
                                    </a>
                                    <hr class="">
                                </div>
                            </div>

                            <!-- Storyline -->
                            <div class="storyline mt-4">
                                <a href="#">
                                    <h3 class="topic mb-0 mt-2">| Storyline <i class="fas fa-chevron-right"></i></h3>
                                </a>

                                <div class="storyline-content">
                                    <p class="mt-3" style="font-size: 16px;">Amid a future war between the human race
                                        and the forces of artificial intelligence, Joshua, a hardened ex-special forces
                                        agent grieving the disappearance of his wife, is recruited to hunt down and kill
                                        the Creator, the elusive architect of advanced AI who has developed a mysterious
                                        weapon with the power to end the war-and mankind itself. —20th Century Studios
                                    </p>

                                    <!-- Tagline -->
                                    <hr class="mt-0">
                                    <div class="tagline text-inline-link">
                                        <p class="mb-0">Taglines</p>
                                        <p style="font-weight: 400;">Humanity evolves.</p>
                                        <div class="link-stars"
                                            style="display: inline; float: right; margin-right: 12px;">
                                            <a href="#"><i class="fa-solid fa-chevron-right"></i></a>
                                        </div>
                                    </div>
                                    <!-- Genres -->
                                    <hr class="mt-0">
                                    <div class="tagline text-inline-link">
                                        <p class="mb-0">Genres</p>
                                        <div style="font-weight: 400; display: inline-block;">
                                            <a href="#">Action</a>
                                            <i class="fas fa-circle pl-1 pr-1"
                                                style="font-size: 2px; vertical-align: middle;"></i>
                                            <a href="#">Adventure</a>
                                            <i class="fas fa-circle pl-1 pr-1"
                                                style="font-size: 2px; vertical-align: middle;"></i>
                                            <a href="#">Drama</a>
                                        </div>
                                        <div class="link-stars"
                                            style="display: inline; float: right; margin-right: 12px;">
                                            <a href="#"><i class="fa-solid fa-chevron-right"></i></a>
                                        </div>
                                    </div>
                                    <hr>
                                </div>
                            </div>

                            <!-- Did you know -->
                            <div class="did-you-know mt-4">
                                <a href="#">
                                    <h3 class="topic mb-0 mt-2">| Did you know <i class="fas fa-chevron-right"></i></h3>
                                </a>

                                <div class="did-you-know-content mt-4">
                                    <div class="did-you-know-content-element p-3 mb-2">
                                        <p class="did-you-know-content-element-name mb-0">Trivia</p>
                                        <p class="did-you-know-content-element-content mb-0">Freelance has a 0% rating
                                            on Rotten Tomatoes, but it's not John Cena's first film with a 0% score as.
                                            His first 0% rating film on Rotten Tomatoes was Fred: The Movie (2010).</p>
                                    </div>
                                    <div class="did-you-know-content-element p-3 mb-2">
                                        <p class="did-you-know-content-element-name mb-0">Plot summary</p>
                                        <p class="did-you-know-content-element-content mb-0">Jason Statham has expressed
                                            his love for The Expendables. On co-star Sylvester Stallone, he said
                                            "Working with Sylvester Stallone is beyond a pinch yourself moment. I
                                            remember growing up watching his films, and to be directed by him, and to be
                                            in a movie that he's produced, and to be shoulder to shoulder with Sly is a
                                            privilege any man who loves action movies would never turn their nose up at.
                                            I mean, it's terrific. I'll do as many as he wants."</p>
                                    </div>
                                    <div class="did-you-know-content-element p-3 mb-2">
                                        <p class="did-you-know-content-element-name mb-0">Trivia</p>
                                        <p class="did-you-know-content-element-content mb-0">Freelance has a 0% rating
                                            on Rotten Tomatoes, but it's not John Cena's first film with a 0% score as.
                                            His first 0% rating film on Rotten Tomatoes was Fred: The Movie (2010).</p>
                                    </div>
                                    <div class="did-you-know-content-element p-3 mb-2">
                                        <p class="did-you-know-content-element-name mb-0">Plot summary</p>
                                        <p class="did-you-know-content-element-content mb-0">Jason Statham has expressed
                                            his love for The Expendables. On co-star Sylvester Stallone, he said
                                            "Working with Sylvester Stallone is beyond a pinch yourself moment. I
                                            remember growing up watching his films, and to be directed by him, and to be
                                            in a movie that he's produced, and to be shoulder to shoulder with Sly is a
                                            privilege any man who loves action movies would never turn their nose up at.
                                            I mean, it's terrific. I'll do as many as he wants."</p>
                                    </div>

                                </div>
                            </div>

                            <!-- User reviews -->
                            <div class="user-reviews mt-4">
                                <a href="#">
                                    <h3 class="topic mb-0 mt-2">| User reviews <i class="fas fa-chevron-right"></i></h3>
                                </a>

                                <a href="user_review.php" class="mt-2 link-to-review"
                                    style="float: right; align-items: center;">
                                    <p class="mb-0 p-1" style="color: rgb(92, 0, 252);;"><i class="fa-solid fa-plus"
                                            style="color: rgb(92, 0, 252);;"></i> Review</p>
                                </a>


                                <div class="user-reviews-content mt-4">
                                    <!-- Content element -->
                                    <div class="user-reviews-content-element p-3 mb-2">
                                        <a href="#">
                                            <p class="user-reviews-content-element-name mb-2"
                                                style="display: inline-block; font-size: 18px;">poseyfan</p>
                                            <p class="user-reviews-content-element-rate mb-0" style="float: right;"><i
                                                    class="fas fa-star pr-2"
                                                    style="color: yellow; display: inline-block; font-size: 14px;"></i>8/10
                                            </p>
                                            <p class="user-reviews-content-element-content mb-0">This is a lesson to the
                                                movie industry on how to use a budget. 80 million dollars was used
                                                splendidly. The cinematography was amazing, (Not terribly surprising
                                                because
                                                Rogue One) acting was great, and the story was decent.

                                                It wasn't without problems though. The story moves at an increasing pace
                                                and
                                                at some points you lose track of what's happening. Suspension of
                                                disbelief
                                                will be needed in some moments.

                                                The theme of the story was to make AI to be more than just robots. I
                                                think
                                                they succeeded there, but at the expense of the humans. Most of the
                                                humans
                                                in the story ended up being one faced - except for Joshua.

                                                The dynamic between Joshua and Alfie was by far the best part of the
                                                movie.
                                                The acting was great between the two.

                                                It was a good movie. Not great by any means, but I'm all for supporting
                                                a
                                                movie that is trying something new.

                                                Overall, I think Gareth Edwards should be given some more projects. AND
                                                filmmakers everywhere should learn how a budget should be used.</p>
                                        </a>
                                        <br><br>
                                        <div class="review">
                                            <i class="fa-regular fa-thumbs-up d-inline-block"
                                                style="font-size: 20px; width: 100px;">
                                                <p class="d-inline-block pl-2 pr-4 like-count" style="font-size: 14px;">
                                                    200</p>
                                            </i>
                                            <i class="fa-regular fa-thumbs-down d-inline-block"
                                                style="font-size: 20px; width: 100px;">
                                                <p class="d-inline-block pl-2 pr-4 dislike-count"
                                                    style="font-size: 14px;">20</p>
                                            </i>
                                        </div>

                                    </div>

                                    <!-- Content element -->
                                    <div class="user-reviews-content-element p-3 mb-2">
                                        <a href="#">
                                            <p class="user-reviews-content-element-name mb-2"
                                                style="display: inline-block; font-size: 18px;">ethanbresnett</p>
                                            <p class="user-reviews-content-element-rate mb-0" style="float: right;"><i
                                                    class="fas fa-star pr-2"
                                                    style="color: yellow; display: inline-block; font-size: 14px;"></i>8/10
                                            </p>
                                            <p class="user-reviews-content-element-content mb-0">The Creator seemed to
                                                promise so much through its trailer, and although it is still a very
                                                enjoyable film it feels a little too safe and run of the mill.

                                                It's story follows the familiar tropes of humanity against AI, super
                                                weapons, chosen ones, and the reluctant guardian. None of these are
                                                overly original but they are decently executed in this film nonetheless.

                                                The emotion of the piece is a bit hit and miss. Even though the
                                                performances are good, particularly Madeleine Yuna Voyles in the role of
                                                Alfie, I just didn't really connect to any of the characters. This lack
                                                of connection and emotion is one of the biggest things missing from this
                                                film.

                                                There is no denying however that this film is beautiful. The natural
                                                landscapes are used well and the grainy camera style really adds a nice
                                                element. It also has a good score and the direction is very solid.

                                                Ultimately The Creator is a really solid sci-fi film, but it just feels
                                                a little safe and derivative. Perhaps my expectations were too high as
                                                the trailer suggested this was potential a more high concept and
                                                emotionally gripping sci-fi, when I don't think that is the case. Still
                                                a good film though.</p>
                                        </a>
                                        <br><br>
                                        <div class="review">
                                            <i class="fa-regular fa-thumbs-up d-inline-block"
                                                style="font-size: 20px; width: 100px;">
                                                <p class="d-inline-block pl-2 pr-4 like-count" style="font-size: 14px;">
                                                    200</p>
                                            </i>
                                            <i class="fa-regular fa-thumbs-down d-inline-block"
                                                style="font-size: 20px; width: 100px;">
                                                <p class="d-inline-block pl-2 pr-4 dislike-count"
                                                    style="font-size: 14px;">20</p>
                                            </i>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Details -->
                            <div class="details mt-4">
                                <a href="#">
                                    <h3 class="topic mb-4 mt-2">| Details <i class="fas fa-chevron-right"></i></h3>
                                </a>

                                <div class="details-content">
                                    <hr class="mt-0">
                                    <!-- Release date -->
                                    <div class="text-inline">
                                        <p>Release date</p>
                                        <p style="font-weight: 400;">May 3, 2020</p>
                                    </div>
                                    <hr class="mt-0">
                                    <!-- Countries of origin -->
                                    <div class="text-inline-link">
                                        <p>Countries of origin</p>
                                        <a href="#">
                                            United States</a>
                                        <i class="fas fa-circle pl-1 pr-1"
                                            style="font-size: 2px; vertical-align: middle;"></i>
                                        <a href="#">New Zealand</a>
                                        <i class="fas fa-circle pl-1 pr-1"
                                            style="font-size: 2px; vertical-align: middle;"></i>
                                        <a href="#">France</a>
                                        <i class="fas fa-circle pl-1 pr-1"
                                            style="font-size: 2px; vertical-align: middle;"></i>
                                        <a href="#">Canada</a>
                                    </div>
                                    <hr class="mt-0">
                                    <!-- Official sites -->
                                    <div class="text-inline-link">
                                        <p>Official sites</p>
                                        <a href="#">
                                            Instagram</a>
                                        <i class="fas fa-circle pl-1 pr-1"
                                            style="font-size: 2px; vertical-align: middle;"></i>
                                        <a href="#">
                                            Official Marvel</a>
                                    </div>
                                    <hr class="mt-0">
                                    <!-- Language -->
                                    <div class="text-inline-link">
                                        <p>Language</p>
                                        <p style="font-weight: 400;">English</p>
                                        <i class="fas fa-circle pl-1 pr-1"
                                            style="font-size: 2px; vertical-align: middle; color: rgb(239, 239, 239);"></i>
                                        <p style="font-weight: 400;">
                                            Vietnamese</p>
                                    </div>
                                    <hr class="mt-0">
                                    <!-- Filming Locations -->
                                    <div class="text-inline">
                                        <p>Filming locations</p>
                                        <p style="font-weight: 400;">Landschaftspark, Duisburg, North Rhine-Westphalia,
                                            Germany</p>
                                    </div>
                                    <hr class="mt-0">
                                    <!-- Production companies  -->
                                    <div class="text-inline-link">
                                        <p>Production companies</p>
                                        <a href="#">
                                            Marvel Studios</a>
                                        <i class="fas fa-circle pl-1 pr-1"
                                            style="font-size: 2px; vertical-align: middle;"></i>
                                        <a href="#">Film New Zealand</a>
                                        <i class="fas fa-circle pl-1 pr-1"
                                            style="font-size: 2px; vertical-align: middle;"></i>
                                        <a href="#">Marvel Entertainment</a>
                                    </div>
                                    <hr class="mt-0">
                                </div>
                            </div>

                            <!-- Box office -->
                            <div class="box-office mt-4">
                                <a href="#">
                                    <h3 class="topic mb-4 mt-2">| Box office <i class="fas fa-chevron-right"></i></h3>
                                </a>

                                <div class="box-office-content">
                                    <ul class="pl-0 mt-3">
                                        <div class="row">
                                            <div class="col-6">
                                                <li>
                                                    <h5>Budget</h5>
                                                    <p>$250,000,000 (estimated)</p>
                                                </li>
                                                <br>
                                                <li>
                                                    <h5>Opening weekend</h5>
                                                    <p>$14,079,512 - Oct 1, 2023</p>
                                                </li>

                                            </div>

                                            <div class="col-6">
                                                <li>
                                                    <h5>Gross</h5>
                                                    <p>$358,995,815</p>
                                                </li>
                                                <br>
                                                <li>
                                                    <h5>Gross worldwide</h5>
                                                    <p>$845,555,777</p>
                                                </li>
                                            </div>
                                        </div>
                                    </ul>
                                </div>
                            </div>

                        </div>







                        <!-- Content right -->
                        <div class="col-4">
                            <div class="content-right">

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <?php
    include 'footer.php';
    ?>

</body>

</html>