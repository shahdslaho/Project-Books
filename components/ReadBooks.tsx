import React, { useEffect, useState } from 'react';
import styles from '../styles/BookList.module.css';
import SearchBar from './SearchBar';
import BookCard from './BookCard';

interface Book {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    imageLinks?: {
      thumbnail: string;
    };
    previewLink?: string;
  };
}

export default function ReadBooks() {
  const [readBooks, setReadBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    const savedBooks = localStorage.getItem('readBooksDetails');
    const savedFavorites = localStorage.getItem('favoriteBooks');
    
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    if (savedBooks) {
      const books = JSON.parse(savedBooks);
      setReadBooks(books);
      setFilteredBooks(books);
    }
  }, []);

  // إضافة useEffect جديد لتصفية الكتب عند تغيير قيمة البحث
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredBooks(readBooks);
    } else {
      const filtered = readBooks.filter(book => 
        book.volumeInfo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (book.volumeInfo.authors && book.volumeInfo.authors.some(author => 
          author.toLowerCase().includes(searchQuery.toLowerCase())
        ))
      );
      setFilteredBooks(filtered);
    }
  }, [searchQuery, readBooks]);

  const handleAddToFavorites = (book: Book) => {
    const savedFavorites = JSON.parse(localStorage.getItem('favoriteBookDetails') || '[]');
    const favoriteIds = JSON.parse(localStorage.getItem('favoriteBooks') || '[]');
    
    if (!favoriteIds.includes(book.id)) {
      savedFavorites.push(book);
      favoriteIds.push(book.id);
      
      localStorage.setItem('favoriteBookDetails', JSON.stringify(savedFavorites));
      localStorage.setItem('favoriteBooks', JSON.stringify(favoriteIds));
      setFavorites(favoriteIds);
    }
  };

  const handleRemoveBook = (book: Book) => {
    if (window.confirm('Are you sure you want to remove this book from read list?')) {
      // Remove from read books
      const updatedReadBooks = readBooks.filter(b => b.id !== book.id);
      setReadBooks(updatedReadBooks);
      setFilteredBooks(updatedReadBooks);
      
      // Update localStorage
      localStorage.setItem('readBooksDetails', JSON.stringify(updatedReadBooks));
      localStorage.setItem('readBooks', JSON.stringify(updatedReadBooks.map(b => b.id)));
    }
  };

  return (
    <div className={styles.container}>
  
      
      <SearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        placeholder="Search in read books..."
      />
      
      <div className={styles.booksGrid}>
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onRemove={handleRemoveBook}
            onFavorite={handleAddToFavorites}
            isFavorite={favorites.includes(book.id)}
            showRead={false}
            showFavorite={true}
          />
        ))}
      </div>
    </div>
  );
}