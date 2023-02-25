import React from "react";

export default function Footer() {
  return (
    <div>
      <div className="footer-container">
        <div className="footer-links">
          <div className="footer-link-wrapper">
            <div className="footer-link-items">
              <h2>Om oss</h2>
              <a>Hur det fungerar</a>
              <a>Rekommendation</a>
              <a>Jobb</a>
              <a>Användarvillkor</a>
            </div>
            <div className="footer-link-items">
              <h2>Kontakta oss</h2>
              <a>Kontakt</a>
              <a>Support</a>
              <a>Plats</a>
              <a>Sponsor</a>
            </div>
          </div>
          <div className="footer-link-wrapper">
            <div className="footer-link-items">
              <h2>Video</h2>
              <a>Skicka in video</a>
              <a>Ambassadör</a>
              <a>Byrå</a>
              <a>Influencer</a>
            </div>
            <div className="footer-link-items">
              <h2>Social media</h2>
              <a>Instagram</a>
              <a>Facebook</a>
              <a>Youtube</a>
              <a>Twitter</a>
            </div>
          </div>
        </div>
        <div className="social-media">
          <div className="social-media-wrap">
            <div className="footer-logo">
              <a id="footer-logo">
                <i className="fa-solid fa-film"></i> IRONBOY FILMS
              </a>
            </div>
            <p className="website-rights">
              &copy; IRONBOY FILMS 2023. Alla rättigheter förbehållna
            </p>
            <div className="social-icons">
              <a className="social-icon-link">
                <i className="fab fa-facebook"></i>
              </a>
              <a className="social-icon-link">
                <i className="fab fa-instagram"></i>
              </a>
              <a className="social-icon-link">
                <i className="fab fa-youtube"></i>
              </a>
              <a className="social-icon-link">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
