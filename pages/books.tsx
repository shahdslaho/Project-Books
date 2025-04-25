import React from 'react';

import Books from '../components/Books';
import Navbar from '../components/Navbar';

export default function BooksPage() {
  return (
   
       <>
       <Navbar activePage="books" />
       <Books />
     </>
  );
}