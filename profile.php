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
    <script src="js/profile.js"></script>
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

    <!-- Profle -->
    <div class="div-container" style="width: 60%;">
        <div class="bg-profile">
            <div class="profile">
                <div class="row">
                    <div class="col-2 pr-2 pl-2" style="background-color: #343a40!important;">
                        <ul class="p-2">
                            <li class="pb-3 pt-3"><button id="profile">Profile</button></li>
                            <li><button id="list-film">List film</button></li>
                        </ul>
                        <li style="position: absolute; bottom: 10px; right: 10px;"><button class="log-out">Log out</button></li>
                    </div>
                    <div class="col-10 pt-4 pl-5">
                        <h3>Profile</h3>
                        <div class="profile-content">
                            <div class="row">
                                <div class="col-6">
                                    <form class="userForm">
                                        <label>
                                            <span>User name</span>
                                            <input type="text" placeholder="Tran Hong Quan" readonly />
                                        </label>

                                        <label>
                                            <span>Account</span>
                                            <input type="text" placeholder="quanth" readonly />
                                        </label>

                                        <label>
                                            <span>Email</span>
                                            <input type="email" placeholder="quantn@gmail.com" readonly />
                                        </label>

                                        <label>
                                            <span>Password</span>
                                            <input type="password" placeholder="123456" readonly />
                                        </label>

                                        <label>
                                            <span>Home town</span>
                                            <input type="text" placeholder="Nghe An" readonly />
                                        </label>
                                    </form>
                                </div>
                                <div class="col-6 img-profile">
                                    <img src="img/vebinh1.jpg" alt="#">

                                    <form class="userForm">
                                        <label style="margin-top: 19px;">
                                            <span>Date of birth</span>
                                            <input type="date" placeholder="" readonly />
                                        </label>

                                        <label>
                                            <span>Home town</span>
                                            <input type="text" placeholder="0123456789" readonly />
                                        </label>
                                    </form>

                                </div>
                            </div>

                            <button id="editButton" style="margin-top: 15px;">Edit</button>

                            <button id="cancelButton"
                                style="margin-top: 15px; display: none; margin-right: 15px;">Cancel</button>
                            <button id="saveButton" style="margin-top: 15px; display: none;">Save</button>
                        </div>

                        <!--  -->
                        <!-- List Film -->
                        <br><br>
                        <h3>List film</h3>
                        <ul class="pl-0 mt-0">
                            <div class="row list-film-like mt-0">
                                <div class="col-6">
                                    <a href="detail.php">
                                        <img src="img/vebinh1.jpg">
                                        <div>
                                            <li>
                                                <h5>Vệ binh giải ngân hà</h5>
                                                <ul>
                                                    <li>2023</li>
                                                    <i class="fas fa-circle pl-1 pr-1"
                                                        style="font-size: 2px; vertical-align: middle;"></i>
                                                    <li>T18</li>
                                                    <i class="fas fa-circle pl-1 pr-1"
                                                        style="font-size: 2px; vertical-align: middle;"></i>
                                                    <li>2h 38m</li>
                                                </ul>
                                            </li>
                                        </div>
                                    </a>

                                    <a href="detail.php">
                                        <img src="img/vebinh1.jpg">
                                        <div>
                                            <li>
                                                <h5>John David Washington</h5>
                                                <ul>
                                                    <li>2023</li>
                                                    <i class="fas fa-circle pl-1 pr-1"
                                                        style="font-size: 2px; vertical-align: middle;"></i>
                                                    <li>T18</li>
                                                    <i class="fas fa-circle pl-1 pr-1"
                                                        style="font-size: 2px; vertical-align: middle;"></i>
                                                    <li>2h 38m</li>
                                                </ul>
                                            </li>
                                        </div>
                                    </a>

                                    <a href="detail.php">
                                        <img src="img/vebinh1.jpg">
                                        <div>
                                            <li>
                                                <h5>John David Washington</h5>
                                                <ul>
                                                    <li>2023</li>
                                                    <i class="fas fa-circle pl-1 pr-1"
                                                        style="font-size: 2px; vertical-align: middle;"></i>
                                                    <li>T18</li>
                                                    <i class="fas fa-circle pl-1 pr-1"
                                                        style="font-size: 2px; vertical-align: middle;"></i>
                                                    <li>2h 38m</li>
                                                </ul>
                                            </li>
                                        </div>
                                    </a>

                                    <a href="detail.php">
                                        <img src="img/vebinh1.jpg">
                                        <div>
                                            <li>
                                                <h5>John David Washington</h5>
                                                <ul>
                                                    <li>2023</li>
                                                    <i class="fas fa-circle pl-1 pr-1"
                                                        style="font-size: 2px; vertical-align: middle;"></i>
                                                    <li>T18</li>
                                                    <i class="fas fa-circle pl-1 pr-1"
                                                        style="font-size: 2px; vertical-align: middle;"></i>
                                                    <li>2h 38m</li>
                                                </ul>
                                            </li>
                                        </div>
                                    </a>

                                </div>
                                <div class="col-6">
                                    <a href="detail.php">
                                        <img src="img/vebinh1.jpg">
                                        <div>
                                            <li>
                                                <h5>John David Washington</h5>
                                                <ul>
                                                    <li>2023</li>
                                                    <i class="fas fa-circle pl-1 pr-1"
                                                        style="font-size: 2px; vertical-align: middle;"></i>
                                                    <li>T18</li>
                                                    <i class="fas fa-circle pl-1 pr-1"
                                                        style="font-size: 2px; vertical-align: middle;"></i>
                                                    <li>2h 38m</li>
                                                </ul>
                                            </li>
                                        </div>
                                    </a>

                                    <a href="detail.php">
                                        <img src="img/vebinh1.jpg">
                                        <div>
                                            <li>
                                                <h5>John David Washington</h5>
                                                <ul>
                                                    <li>2023</li>
                                                    <i class="fas fa-circle pl-1 pr-1"
                                                        style="font-size: 2px; vertical-align: middle;"></i>
                                                    <li>T18</li>
                                                    <i class="fas fa-circle pl-1 pr-1"
                                                        style="font-size: 2px; vertical-align: middle;"></i>
                                                    <li>2h 38m</li>
                                                </ul>
                                            </li>
                                        </div>
                                    </a>

                                    <a href="detail.php">
                                        <img src="img/vebinh1.jpg">
                                        <div>
                                            <li>
                                                <h5>John David Washington</h5>
                                                <ul>
                                                    <li>2023</li>
                                                    <i class="fas fa-circle pl-1 pr-1"
                                                        style="font-size: 2px; vertical-align: middle;"></i>
                                                    <li>T18</li>
                                                    <i class="fas fa-circle pl-1 pr-1"
                                                        style="font-size: 2px; vertical-align: middle;"></i>
                                                    <li>2h 38m</li>
                                                </ul>
                                            </li>
                                        </div>
                                    </a>


                                </div>
                            </div>
                        </ul>

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