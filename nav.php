<!-- Navbar -->
<nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top all-page-navbar">
  <a class="navbar-brand ml-5" href="home.php">QuanFilm</a>

  <div class="collapse navbar-collapse" id="navbarNav">
    <form class="search-box form-inline ml-auto" id="searchForm">
      <input class="form-control mr-2" type="search" placeholder="Search" id="searchInput" aria-label="Search"
        style="width: 500px;">
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
          <a class="dropdown-item" id="dropdown-item-profile" href="profile.php">Profile</a>
          <a class="dropdown-item" id="dropdown-item-login" href="login.php">Log in</a>
        </div>
      </li>
    </ul>
  </div>
</nav>