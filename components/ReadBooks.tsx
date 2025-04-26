import React, { useEffect, useState } from 'react';
import styles from '../styles/BookList.module.css';
import SearchBar from './SearchBar';
import BookCard from './BookCard';
import { Book } from "../types/Book";
import { useBooks } from '../hooks/useBooks';

export default function ReadBooks() {
  
  const [readBooksDetails, setReadBooksDetails] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const { favorites, handleFavorite, handleMarkAsRead } = useBooks();

  useEffect(() => {
    const savedBooks = localStorage.getItem('readBooksDetails');
    
    if (savedBooks) {
      const books = JSON.parse(savedBooks);
      setReadBooksDetails(books);
      setFilteredBooks(books);
    }
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredBooks(readBooksDetails);
    } else {
      const filtered = readBooksDetails.filter(book => 
        book.volumeInfo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (book.volumeInfo.authors && book.volumeInfo.authors.some(author => 
          author.toLowerCase().includes(searchQuery.toLowerCase())
        ))
      );
      setFilteredBooks(filtered);
    }
  }, [searchQuery, readBooksDetails]);

  const handleRemoveBook = (book: Book) => {
    if (window.confirm('Are you sure you want to remove this book from read list?')) {
      // استخدام handleMarkAsRead لإزالة الكتاب من قائمة المقروءة
      handleMarkAsRead(book);
      
      // تحديث حالة readBooksDetails المحلية
      const updatedReadBooks = readBooksDetails.filter(b => b.id !== book.id);
      setReadBooksDetails(updatedReadBooks);
      setFilteredBooks(updatedReadBooks);
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
            onFavorite={handleFavorite}
            isFavorite={favorites.includes(book.id)}
            showRead={false}
            showFavorite={true}
          />
        ))}
      </div>
    </div>
  );
}