import React from 'react'
import './homePage.css';
import { NavbarHome } from '../../components/navs/NavbarHome'
import { PostsFeed } from '../../components/post/PostHome';
import { Navbar } from '../../components/navigationBar/NavigationBar';

export const HomePage = () => {
  return (
    <div>
        <Navbar />
        <NavbarHome />
        <PostsFeed />
    </div>
  )
}