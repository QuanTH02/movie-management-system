"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import Button from "../Button";
import Input from "../Input";
import { useI18n } from "@/app/lib/i18n";

interface NavbarProps {
  currentAccount?: string | null;
}

function Navbar({ currentAccount }: NavbarProps) {
  const router = useRouter();
  const { t, language, setLanguage } = useI18n();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState("0");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("currentAccount");
      router.push("/login");
    }
    setShowDropdown(false);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(
        `/search?q=${encodeURIComponent(searchQuery)}&filter=${searchFilter}`,
      );
    }
  };

  const handleLanguageChange = (lang: "en" | "ja") => {
    setLanguage(lang);
    setShowLanguageDropdown(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-bg border-b border-dark-border shadow-navbar">
      <div className="w-container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-1 text-2xl font-display font-bold no-underline"
          >
            <span className="text-accent-orange">H</span>
            <span className="text-accent-blue">Y</span>
            <span className="text-accent-green">F</span>
            <span className="text-accent-yellow">M</span>
            <span className="text-accent-pink">o</span>
            <span className="text-accent-purple">v</span>
            <span className="text-accent-cyan">i</span>
            <span className="text-accent-orange">e</span>
          </Link>

          {/* Search Form */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex items-center gap-3 flex-1 max-w-2xl mx-8"
          >
            <select
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="px-3 py-2 rounded-input bg-dark-card border border-dark-border text-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="0">{t.navbar.searchFilter.all}</option>
              <option value="1">{t.navbar.searchFilter.movieName}</option>
              <option value="2">{t.navbar.searchFilter.year}</option>
              <option value="3">{t.navbar.searchFilter.rating}</option>
            </select>
            <input
              type="search"
              placeholder={t.navbar.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-4 py-2 rounded-input bg-dark-card border border-dark-border text-dark-text placeholder-dark-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <Button type="submit" variant="primary" size="md">
              {t.navbar.search}
            </Button>
          </form>

          {/* Right Menu */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center gap-2 px-3 py-2 rounded-input bg-dark-card hover:bg-dark-card-hover text-dark-text transition-colors duration-hover"
                aria-label="Select language"
                aria-expanded={showLanguageDropdown}
                aria-haspopup="true"
              >
                <i className="fas fa-globe text-sm" />
                <span className="hidden sm:inline text-sm font-medium">
                  {language.toUpperCase()}
                </span>
                <i
                  className={clsx(
                    "fas fa-chevron-down text-xs transition-transform duration-hover",
                    {
                      "rotate-180": showLanguageDropdown,
                    },
                  )}
                />
              </button>

              {showLanguageDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setShowLanguageDropdown(false)}
                  />
                  <div className="absolute right-0 mt-2 w-32 bg-dark-card border border-dark-border rounded-card shadow-card z-20">
                    <button
                      onClick={() => handleLanguageChange("en")}
                      className={clsx(
                        "w-full text-left px-4 py-2 text-dark-text hover:bg-dark-card-hover transition-colors duration-hover first:rounded-t-card last:rounded-b-card flex items-center gap-2",
                        {
                          "bg-primary-600/20": language === "en",
                        },
                      )}
                    >
                      <span className="text-sm">🇺🇸</span>
                      <span className="text-sm">{t.common.english}</span>
                      {language === "en" && (
                        <i className="fas fa-check text-primary-600 ml-auto" />
                      )}
                    </button>
                    <button
                      onClick={() => handleLanguageChange("ja")}
                      className={clsx(
                        "w-full text-left px-4 py-2 text-dark-text hover:bg-dark-card-hover transition-colors duration-hover first:rounded-t-card last:rounded-b-card flex items-center gap-2",
                        {
                          "bg-primary-600/20": language === "ja",
                        },
                      )}
                    >
                      <span className="text-sm">🇯🇵</span>
                      <span className="text-sm">{t.common.japanese}</span>
                      {language === "ja" && (
                        <i className="fas fa-check text-primary-600 ml-auto" />
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>

            <button
              className="text-dark-text-secondary hover:text-dark-text transition-colors duration-hover"
              aria-label={t.navbar.toggleTheme}
            >
              <i className="fas fa-moon text-lg" />
            </button>

            {currentAccount ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center gap-2 px-3 py-2 rounded-input bg-dark-card hover:bg-dark-card-hover text-dark-text transition-colors duration-hover"
                  aria-expanded={showDropdown}
                  aria-haspopup="true"
                >
                  <i className="fas fa-cog" />
                  <span className="hidden sm:inline">{t.navbar.settings}</span>
                  <i
                    className={clsx(
                      "fas fa-chevron-down text-xs transition-transform duration-hover",
                      {
                        "rotate-180": showDropdown,
                      },
                    )}
                  />
                </button>

                {showDropdown && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowDropdown(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-dark-card border border-dark-border rounded-card shadow-card z-20">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-dark-text hover:bg-dark-card-hover transition-colors duration-hover first:rounded-t-card last:rounded-b-card"
                        onClick={() => setShowDropdown(false)}
                      >
                        {t.navbar.profile}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-dark-text hover:bg-dark-card-hover transition-colors duration-hover first:rounded-t-card last:rounded-b-card"
                      >
                        {t.navbar.logout}
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link href="/login">
                <Button variant="outline" size="md">
                  {t.navbar.login}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
export type { NavbarProps };
