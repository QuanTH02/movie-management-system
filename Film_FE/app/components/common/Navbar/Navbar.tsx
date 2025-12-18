"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NavbarProps {
  currentAccount?: string | null;
}

function Navbar({ currentAccount }: NavbarProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState("0");

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("currentAccount");
      router.push("/login");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(
        `/search?q=${encodeURIComponent(searchQuery)}&filter=${searchFilter}`,
      );
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top all-page-navbar"
      style={{ zIndex: 1000 }}
    >
      <Link
        className="navbar-brand ml-5"
        href="/"
        style={{
          fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          fontSize: "24px",
          textDecoration: "none",
          fontWeight: "bold",
        }}
      >
        <span style={{ color: "#ff5722" }}>H</span>
        <span style={{ color: "#1976d2" }}>Y</span>
        <span style={{ color: "#4caf50" }}>F</span>
        <span style={{ color: "#ff9800" }}>M</span>
        <span style={{ color: "#e91e63" }}>o</span>
        <span style={{ color: "#9c27b0" }}>v</span>
        <span style={{ color: "#673ab7" }}>i</span>
        <span style={{ color: "#ff5722" }}>e</span>
      </Link>

      <div className="collapse navbar-collapse" id="navbarNav">
        <form
          className="search-box form-inline ml-auto"
          onSubmit={handleSearch}
        >
          <select
            id="filmFilter"
            name="filmFilter"
            className="d-inline-block mr-2"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            style={{ padding: "7px", borderRadius: "3px" }}
          >
            <option value="0">Filter</option>
            <option value="1">Movie Name</option>
            <option value="2">Year</option>
            <option value="3">Rating</option>
          </select>

          <input
            className="form-control mr-2"
            type="search"
            placeholder="Search"
            id="searchInput"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "500px" }}
          />
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="submit"
          >
            Search
          </button>
        </form>

        <ul className="navbar-nav ml-auto mr-4">
          <li className="nav-item">
            <a className="nav-link mode-page" href="#">
              Mode
            </a>
          </li>

          {currentAccount ? (
            <li className="nav-item dropdown ml-4">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div>
                  <i className="fas fa-cog"></i> Setting
                </div>
              </a>
              <div
                className="dropdown-menu dropdown-menu-right"
                aria-labelledby="navbarDropdown"
              >
                <a
                  className="dropdown-item"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    alert("Profile page coming soon");
                  }}
                >
                  Profile
                </a>
                <a className="dropdown-item" href="#" onClick={handleLogout}>
                  Log out
                </a>
              </div>
            </li>
          ) : (
            <li className="nav-item dropdown ml-4">
              <Link className="nav-link dropdown-toggle" href="/login">
                <div>Login</div>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
export type { NavbarProps };
