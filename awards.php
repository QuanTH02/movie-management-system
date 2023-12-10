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
    <!-- Nav bar -->
    <?php
    include 'nav.php';
    ?>

    <!-- Awards -->
    <div class="div-container" style="width: 60%;">
        <div class="bg-awards">
            <div class="awards-intro p-3">
                <img src="img/vebinh1.jpg" alt="" class="d-inline-block mb-5" style="width: 72px; height: 102px;">
                <div class="d-inline-block ml-3 mb-4" style="vertical-align: middle;">
                    <a href="detail.php" style="color: rgb(92, 0, 252);">
                        <h5>Ve binh giai ngan ha</h5>
                    </a>
                    <h3>Awards</h3>
                </div>
                <hr class="mt-0">
                <div class="awards">
                    <div class="awards-element">
                        <h5>Academy Awards, USA</h5>
                    </div>
                    <div class="awards-element">
                        <h5>Academy of Science Fiction, Fantasy & Horror Films, USA</h5>
                    </div>
                    <div class="awards-element">
                        <h5>American Cinema Editors, USA</h5>
                    </div>
                    <div class="awards-element">
                        <h5>American Society of Cinematographers, USA</h5>
                    </div>
                    <div class="awards-element">
                        <h5>BAFTA Awards</h5>
                    </div>
                    <div class="awards-element">
                        <h5>British Society of Cinematographers</h5>
                    </div>
                    <div class="awards-element">
                        <h5>Critics Choice Awards</h5>
                    </div>
                    <div class="awards-element">
                        <h5>Camerimage</h5>
                    </div>
                    <div class="awards-element">
                        <h5>Chicago Film Critics Association Awards</h5>
                    </div>
                    <div class="awards-element">
                        <h5>Cinema Audio Society, USA</h5>
                    </div>
                    <div class="awards-element">
                        <h5>Cinema Brazil Grand Prize</h5>
                    </div>
                    <div class="awards-element">
                        <h5>Costume Designers Guild Awards</h5>
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