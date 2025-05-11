import { useState, useEffect } from 'react';
import '../../pages/home/navbar.css';

export const Navbar = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(prev => !prev);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="/fox_logo.png" alt="Logo" className="navbar-logo" />
        <span className="navbar-title">TecBlog</span>
      </div>
      <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
        <a href="#" className="navbar-link">Inicio</a>
        <a href="#" className="navbar-link">Acerca de</a>
        <a href="#" className="navbar-link">Blog</a>
        <a href="#" className="navbar-link">Contacto</a>
      </div>
      <div className="navbar-menu" onClick={toggleMenu}>
        <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} />
      </div>
    </nav>
  );
};
