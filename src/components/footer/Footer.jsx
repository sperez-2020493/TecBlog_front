import React from 'react';
import '../../pages/home/footer.css';
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa';
import logo from '/logo_foot.png';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Contacto</h3>
          <p>TecBlog@gmail.org.gt</p>
          <p>+(502) 7458-7458</p>
        </div>

        <div className="footer-logo">
          <img src={logo} alt="Logo Kinal" />
        </div>

        <div className="footer-empleos">
          <h3>Soporte</h3>
          <a href="#">soporteTec@gmail.org.gt</a>
          <a href="#">+(502) 4512-4512</a>
        </div>
      </div>

      <div className="footer-bottom">
        <button className="admisiones-btn">
          ¡Unete a nuestra comunidad!
        </button>
      </div>

      <div className="footer-bottom">
        <div className="footer-social">
          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaYoutube /></a>
            <a href="#"><FaWhatsapp /></a>
          </div>
        </div>
    </div>

      <p className="footer-copy">© 2025 Samuel Perez. Todos los derechos reservados.</p>
    </footer>
  );
};