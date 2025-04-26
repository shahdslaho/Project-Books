import React, { useEffect, useState } from 'react';
import styles from '../styles/BookList.module.css';
import SearchBar from './SearchBar';
import BookCard from './BookCard';
import { Book } from "../types/Book";
import { useBooks } from '../hooks/useBooks';

export default function FavoriteBooks() {
  
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { readBooks, handleMarkAsRead, handleFavorite } = useBooks();
  const [favoriteBookDetails, setFavoriteBookDetails] = useState<Book[]>([]);

  useEffect(() => {
    
    const fullBooksData = localStorage.getItem('favoriteBookDetails');
    if (fullBooksData) {
      const books = JSON.parse(fullBooksData);
      setFavoriteBookDetails(books);
      setFilteredBooks(books);
    }
  }, []);

  // تحديث الكتب المصفاة عند تغيير البحث أو قائمة المفضلة
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredBooks(favoriteBookDetails);
    } else {
      const filtered = favoriteBookDetails.filter(book => 
        book.volumeInfo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.volumeInfo.authors?.some(author =>
          author.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredBooks(filtered);
    }
  }, [searchQuery, favoriteBookDetails]);

  // يمكن استخدام handleFavorite من useBooks بدلاً من هذه الدالة
  const handleRemoveFromFavorites = (book: Book) => {
    if (window.confirm('Are you sure you want to remove this book from favorites?')) {
      handleFavorite(book); // استخدام دالة handleFavorite من useBooks
      
      // تحدية favoriteBookDetails المحلية
      const updatedFavorites = favoriteBookDetails.filter(b => b.id !== book.id);
      setFavoriteBookDetails(updatedFavorites);
    }
  };

  return (
    <div className={styles.container}>
      <SearchBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery}
        placeholder="Search in your favorite books..."
      />
      <div className={styles.booksGrid}>
        {filteredBooks.map(book => (
          <BookCard
            key={book.id}
            book={book}
            onRemove={handleRemoveFromFavorites}
            onMarkAsRead={handleMarkAsRead} 
            showRead={true}
            showFavorite={false}
            isRead={readBooks.includes(book.id)}
          />
        ))}
      </div>
    </div>
  );
}
