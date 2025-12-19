"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useI18n } from "@/app/lib/i18n";

function Footer() {
  const { t } = useI18n();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full bg-primary-600 hover:bg-primary-700 text-white shadow-lg hover:shadow-xl transition-all duration-hover flex items-center justify-center group"
          aria-label="Scroll to top"
        >
          <i className="fas fa-arrow-up text-lg group-hover:translate-y-[-2px] transition-transform duration-hover" />
        </button>
      )}

      {/* Footer */}
      <footer className="bg-dark-surface border-t border-dark-border">
        <div className="w-container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Brand Section */}
            <div className="space-y-4">
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
              <p className="text-dark-text-secondary text-sm leading-relaxed">
                {t.footer.description}
              </p>
              {/* Social Media Links */}
              <div className="flex items-center space-x-4 pt-2">
                <a
                  href="https://www.facebook.com/quanth02/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-dark-card hover:bg-primary-600 flex items-center justify-center text-dark-text-secondary hover:text-white transition-all duration-hover group"
                  aria-label="Facebook"
                >
                  <i className="fab fa-facebook-f text-sm group-hover:scale-110 transition-transform duration-hover" />
                </a>
                <a
                  href="https://www.instagram.com/quanth2002/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-dark-card hover:bg-primary-600 flex items-center justify-center text-dark-text-secondary hover:text-white transition-all duration-hover group"
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram text-sm group-hover:scale-110 transition-transform duration-hover" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-dark-card hover:bg-primary-600 flex items-center justify-center text-dark-text-secondary hover:text-white transition-all duration-hover group"
                  aria-label="Twitter"
                >
                  <i className="fab fa-twitter text-sm group-hover:scale-110 transition-transform duration-hover" />
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-dark-card hover:bg-primary-600 flex items-center justify-center text-dark-text-secondary hover:text-white transition-all duration-hover group"
                  aria-label="YouTube"
                >
                  <i className="fab fa-youtube text-sm group-hover:scale-110 transition-transform duration-hover" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-dark-text font-semibold text-lg mb-4">
                {t.footer.quickLinks}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    className="text-dark-text-secondary hover:text-primary-600 transition-colors duration-hover text-sm flex items-center group"
                  >
                    <i className="fas fa-home text-xs mr-2 group-hover:translate-x-1 transition-transform duration-hover" />
                    {t.footer.home}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/browse"
                    className="text-dark-text-secondary hover:text-primary-600 transition-colors duration-hover text-sm flex items-center group"
                  >
                    <i className="fas fa-film text-xs mr-2 group-hover:translate-x-1 transition-transform duration-hover" />
                    {t.footer.browseMovies}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/search"
                    className="text-dark-text-secondary hover:text-primary-600 transition-colors duration-hover text-sm flex items-center group"
                  >
                    <i className="fas fa-search text-xs mr-2 group-hover:translate-x-1 transition-transform duration-hover" />
                    {t.footer.search}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/profile"
                    className="text-dark-text-secondary hover:text-primary-600 transition-colors duration-hover text-sm flex items-center group"
                  >
                    <i className="fas fa-user text-xs mr-2 group-hover:translate-x-1 transition-transform duration-hover" />
                    {t.footer.myProfile}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-dark-text font-semibold text-lg mb-4">
                {t.footer.categories}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/browse?genre=action"
                    className="text-dark-text-secondary hover:text-primary-600 transition-colors duration-hover text-sm flex items-center group"
                  >
                    <i className="fas fa-fire text-xs mr-2 group-hover:scale-110 transition-transform duration-hover" />
                    {t.footer.action}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/browse?genre=drama"
                    className="text-dark-text-secondary hover:text-primary-600 transition-colors duration-hover text-sm flex items-center group"
                  >
                    <i className="fas fa-theater-masks text-xs mr-2 group-hover:scale-110 transition-transform duration-hover" />
                    {t.footer.drama}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/browse?genre=comedy"
                    className="text-dark-text-secondary hover:text-primary-600 transition-colors duration-hover text-sm flex items-center group"
                  >
                    <i className="fas fa-laugh text-xs mr-2 group-hover:scale-110 transition-transform duration-hover" />
                    {t.footer.comedy}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/browse?genre=thriller"
                    className="text-dark-text-secondary hover:text-primary-600 transition-colors duration-hover text-sm flex items-center group"
                  >
                    <i className="fas fa-exclamation-triangle text-xs mr-2 group-hover:scale-110 transition-transform duration-hover" />
                    {t.footer.thriller}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-dark-text font-semibold text-lg mb-4">
                {t.footer.contactUs}
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start text-dark-text-secondary text-sm">
                  <i className="fas fa-user text-primary-600 mr-3 mt-1" />
                  <span>Trần Hồng Quân</span>
                </li>
                <li className="flex items-center text-dark-text-secondary text-sm">
                  <i className="fas fa-phone text-primary-600 mr-3" />
                  <a
                    href="tel:0836632666"
                    className="hover:text-primary-600 transition-colors duration-hover"
                  >
                    0836632666
                  </a>
                </li>
                <li className="flex items-center text-dark-text-secondary text-sm">
                  <i className="fas fa-envelope text-primary-600 mr-3" />
                  <a
                    href="mailto:anhquankaka113@gmail.com"
                    className="hover:text-primary-600 transition-colors duration-hover"
                  >
                    anhquankaka113@gmail.com
                  </a>
                </li>
                <li className="flex items-start text-dark-text-secondary text-sm">
                  <i className="fas fa-map-marker-alt text-primary-600 mr-3 mt-1" />
                  <span>Ha Noi, Viet Nam</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-dark-border pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <p className="text-dark-text-secondary text-sm text-center md:text-left">
                © {new Date().getFullYear()} HYF Movie.{" "}
                {t.footer.allRightsReserved}
              </p>
              <div className="flex items-center space-x-6">
                <Link
                  href="/privacy"
                  className="text-dark-text-secondary hover:text-primary-600 transition-colors duration-hover text-sm"
                >
                  {t.footer.privacyPolicy}
                </Link>
                <Link
                  href="/terms"
                  className="text-dark-text-secondary hover:text-primary-600 transition-colors duration-hover text-sm"
                >
                  {t.footer.termsOfService}
                </Link>
                <Link
                  href="/about"
                  className="text-dark-text-secondary hover:text-primary-600 transition-colors duration-hover text-sm"
                >
                  {t.footer.aboutUs}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
export type {};
