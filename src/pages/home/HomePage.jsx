import React from 'react'
import './homePage.css';
import { NavbarHome } from '../../components/navs/NavbarHome'
import { PostsFeed } from '../../components/post/PostHome';

export const HomePage = () => {
  return (
    <div>
        <NavbarHome />
        <PostsFeed />
    </div>
  )
}