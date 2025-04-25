import React from 'react';
import Navbar from '../components/Navbar';
import FavoriteBooks from '../components/FavoriteBooks';

export default function FavoritesPage() {
  return (
    <>
      <Navbar activePage="favorites" />
      <FavoriteBooks />
    </>
  );
}