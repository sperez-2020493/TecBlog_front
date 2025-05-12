import React from 'react'
import './homePage.css';
import { NavbarHome } from '../../components/navs/NavbarHome'
import { PostsFeed } from '../../components/post/PostHome';
import { Navbar } from '../../components/navigationBar/NavigationBar';
import { Footer } from '../../components/footer/Footer';

export const HomePage = () => {
  return (
    <div>
        <Navbar />
        <NavbarHome />
        <PostsFeed />
        <Footer />
    </div>
  )
}