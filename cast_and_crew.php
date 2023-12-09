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

    <div class="div-container" style="width: 60%;">
        <div class="bg-cast-and-crew">
            <div class="cast-and-crew-intro p-3">
                <img src="img/vebinh1.jpg" alt="" class="d-inline-block mb-5" style="width: 72px; height: 102px;">
                <div class="d-inline-block ml-3 mb-4" style="vertical-align: middle;">
                    <a href="detail.php" style="color: rgb(92, 0, 252);">
                        <h5>Ve binh giai ngan ha</h5>
                    </a>
                    <h3>Full Cast & Crew</h3>
                </div>

                <hr class="mt-0">
                <div class="cast-and-crew-list">
                    <!-- Director -->
                    <div class="cast-and-crew-director mb-4">
                        <h6>Directed by</h6>
                        <table>
                            <tr>
                                <td style="vertical-align: top;" class="cast-and-crew-name"><a href="#">
                                        <p>James Gunn</p>
                                    </a></td>
                                <td style="vertical-align: top;" class="cast-and-crew-role">
                                    <p></p>
                                </td>
                            </tr>

                        </table>
                    </div>

                    <!-- Writing Credits -->
                    <hr class="mt-0">
                    <div class="cast-and-crew-writing mb-4">
                        <h6>Writing Credits</h6>
                        <table>
                            <tr>
                                <td style="vertical-align: top;" class="cast-and-crew-name"><a href="#">
                                        <p>James Gunn</p>
                                    </a></td>
                                <td style="vertical-align: top;" class="cast-and-crew-role">
                                    <p>(screenplay by)</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="vertical-align: top;" class="cast-and-crew-name"><a href="#">
                                        <p>Jim Starlin</p>
                                    </a></td>
                                <td style="vertical-align: top;" class="cast-and-crew-role">
                                    <p>(Drax & Gamora created by)</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="vertical-align: top;" class="cast-and-crew-name"><a href="#">
                                        <p>Stan Lee</p>
                                    </a></td>
                                <td style="vertical-align: top;" class="cast-and-crew-role">
                                    <p>(Groot created by) &</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="vertical-align: top;" class="cast-and-crew-name"><a href="#">
                                        <p>Larry Lieber</p>
                                    </a></td>
                                <td style="vertical-align: top;" class="cast-and-crew-role">
                                    <p>(Groot created by) and</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="vertical-align: top;" class="cast-and-crew-name"><a href="#">
                                        <p>Jack Kirby</p>
                                    </a></td>
                                <td style="vertical-align: top;" class="cast-and-crew-role">
                                    <p>(Groot created by)</p>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <!-- Cast  -->
                    <hr class="mt-0">
                    <div class="cast-and-crew-cast mb-4">
                        <h6>Cast</h6>
                        <table>
                            <tr>
                                <td style="vertical-align: top;" class="cast-and-crew-name"><a href="#">
                                        <p>James Gunn</p>
                                    </a></td>
                                <td style="vertical-align: top;" class="cast-and-crew-role">
                                    <p>(screenplay by)</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="vertical-align: top;" class="cast-and-crew-name"><a href="#">
                                        <p>Jim Starlin</p>
                                    </a></td>
                                <td style="vertical-align: top;" class="cast-and-crew-role">
                                    <p>(Drax & Gamora created by)</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="vertical-align: top;" class="cast-and-crew-name"><a href="#">
                                        <p>Stan Lee</p>
                                    </a></td>
                                <td style="vertical-align: top;" class="cast-and-crew-role">
                                    <p>(Groot created by) &</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="vertical-align: top;" class="cast-and-crew-name"><a href="#">
                                        <p>Larry Lieber</p>
                                    </a></td>
                                <td style="vertical-align: top;" class="cast-and-crew-role">
                                    <p>(Groot created by) and</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="vertical-align: top;" class="cast-and-crew-name"><a href="#">
                                        <p>Jack Kirby</p>
                                    </a></td>
                                <td style="vertical-align: top;" class="cast-and-crew-role">
                                    <p>(Groot created by)</p>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <!-- Produced by  -->
                    <hr class="mt-0">
                    <div class="cast-and-crew-producer mb-4">
                        <h6>Produced by</h6>
                        <table>
                            <tr>
                                <td style="vertical-align: top;" class="cast-and-crew-name"><a href="#">
                                        <p>James Gunn</p>
                                    </a></td>
                                <td style="vertical-align: top;" class="cast-and-crew-role">
                                    <p>(screenplay by)</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="vertical-align: top;" class="cast-and-crew-name"><a href="#">
                                        <p>Jim Starlin</p>
                                    </a></td>
                                <td style="vertical-align: top;" class="cast-and-crew-role">
                                    <p>(Drax & Gamora created by)</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="vertical-align: top;" class="cast-and-crew-name"><a href="#">
                                        <p>Stan Lee</p>
                                    </a></td>
                                <td style="vertical-align: top;" class="cast-and-crew-role">
                                    <p>(Groot created by) &</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="vertical-align: top;" class="cast-and-crew-name"><a href="#">
                                        <p>Larry Lieber</p>
                                    </a></td>
                                <td style="vertical-align: top;" class="cast-and-crew-role">
                                    <p>(Groot created by) and</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="vertical-align: top;" class="cast-and-crew-name"><a href="#">
                                        <p>Jack Kirby</p>
                                    </a></td>
                                <td style="vertical-align: top;" class="cast-and-crew-role">
                                    <p>(Groot created by)</p>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <!-- Cinematography by  -->
                    <hr class="mt-0">
                    <div class="cast-and-crew-cinematography mb-4">
                        <h6>Cinematography by</h6>
                        <table>
                            <tr>
                                <td style="vertical-align: top;" class="cast-and-crew-name"><a href="#">
                                        <p>James Gunn</p>
                                    </a></td>
                                <td style="vertical-align: top;" class="cast-and-crew-role">
                                    <p>(screenplay by)</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="vertical-align: top;" class="cast-and-crew-name"><a href="#">
                                        <p>Jim Starlin</p>
                                    </a></td>
                                <td style="vertical-align: top;" class="cast-and-crew-role">
                                    <p>(Drax & Gamora created by)</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="vertical-align: top;" class="cast-and-crew-name"><a href="#">
                                        <p>Stan Lee</p>
                                    </a></td>
                                <td style="vertical-align: top;" class="cast-and-crew-role">
                                    <p>(Groot created by) &</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="vertical-align: top;" class="cast-and-crew-name"><a href="#">
                                        <p>Larry Lieber</p>
                                    </a></td>
                                <td style="vertical-align: top;" class="cast-and-crew-role">
                                    <p>(Groot created by) and</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="vertical-align: top;" class="cast-and-crew-name"><a href="#">
                                        <p>Jack Kirby</p>
                                    </a></td>
                                <td style="vertical-align: top;" class="cast-and-crew-role">
                                    <p>(Groot created by)</p>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <!-- Editing by  -->
                    <hr class="mt-0">
                    <div class="cast-and-crew-editing mb-4">
                        <h6>Editing by</h6>
                        <table>
                            <tr>
                                <td style="vertical-align: top;" class="cast-and-crew-name"><a href="#">
                                        <p>James Gunn</p>
                                    </a></td>
                                <td style="vertical-align: top;" class="cast-and-crew-role">
                                    <p>(screenplay by)</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="vertical-align: top;" class="cast-and-crew-name"><a href="#">
                                        <p>Jim Starlin</p>
                                    </a></td>
                                <td style="vertical-align: top;" class="cast-and-crew-role">
                                    <p>(Drax & Gamora created by)</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="vertical-align: top;" class="cast-and-crew-name"><a href="#">
                                        <p>Stan Lee</p>
                                    </a></td>
                                <td style="vertical-align: top;" class="cast-and-crew-role">
                                    <p>(Groot created by) &</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="vertical-align: top;" class="cast-and-crew-name"><a href="#">
                                        <p>Larry Lieber</p>
                                    </a></td>
                                <td style="vertical-align: top;" class="cast-and-crew-role">
                                    <p>(Groot created by) and</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="vertical-align: top;" class="cast-and-crew-name"><a href="#">
                                        <p>Jack Kirby</p>
                                    </a></td>
                                <td style="vertical-align: top;" class="cast-and-crew-role">
                                    <p>(Groot created by)</p>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <!-- Special Effects by  -->
                    <hr class="mt-0">
                    <div class="cast-and-crew-special-effect mb-4">
                        <h6>Special Effects by</h6>
                        <table>
                            <tr>
                                <td style="vertical-align: top;" class="cast-and-crew-name"><a href="#">
                                        <p>James Gunn</p>
                                    </a></td>
                                <td style="vertical-align: top;" class="cast-and-crew-role">
                                    <p>(screenplay by)</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="vertical-align: top;" class="cast-and-crew-name"><a href="#">
                                        <p>Jim Starlin</p>
                                    </a></td>
                                <td style="vertical-align: top;" class="cast-and-crew-role">
                                    <p>(Drax & Gamora created by)</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="vertical-align: top;" class="cast-and-crew-name"><a href="#">
                                        <p>Stan Lee</p>
                                    </a></td>
                                <td style="vertical-align: top;" class="cast-and-crew-role">
                                    <p>(Groot created by) &</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="vertical-align: top;" class="cast-and-crew-name"><a href="#">
                                        <p>Larry Lieber</p>
                                    </a></td>
                                <td style="vertical-align: top;" class="cast-and-crew-role">
                                    <p>(Groot created by) and</p>
                                </td>
                            </tr>
                            <tr>
                                <td style="vertical-align: top;" class="cast-and-crew-name"><a href="#">
                                        <p>Jack Kirby</p>
                                    </a></td>
                                <td style="vertical-align: top;" class="cast-and-crew-role">
                                    <p>(Groot created by)</p>
                                </td>
                            </tr>
                        </table>
                    </div>

                    <!-- Music by  -->
                    <hr class="mt-0">
                    <div class="cast-and-crew-special-music mb-2">
                        <h6>Music by</h6>
                        <table>
                            <tr>
                                <td style="vertical-align: top;" class="cast-and-crew-name"><a href="#">
                                        <p>James Gunn</p>
                                    </a></td>
                                <td style="vertical-align: top;" class="cast-and-crew-role">
                                    <p>(screenplay by)</p>
                                </td>
                            </tr>
                        </table>
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