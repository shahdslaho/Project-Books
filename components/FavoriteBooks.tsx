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

export default function FavoriteBooks() {
  const [favoriteBooks, setFavoriteBooks] = useState<Book[]>([]);
  const [readBooks, setReadBooks] = useState<string[]>([]);
  // استبدال استخدام المتجر بحالة محلية
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);

  useEffect(() => {
    const savedBooks = localStorage.getItem('favoriteBooks');
    const savedReadBooks = localStorage.getItem('readBooks');

    if (savedReadBooks) {
      setReadBooks(JSON.parse(savedReadBooks));
    }

    if (savedBooks) {
      try {
        const parsedData = JSON.parse(savedBooks);
        if (Array.isArray(parsedData) && parsedData.length > 0 && typeof parsedData[0] === 'string') {
          const fullBooksData = localStorage.getItem('favoriteBookDetails');
          if (fullBooksData) {
            const books = JSON.parse(fullBooksData);
            setFavoriteBooks(books);
            setFilteredBooks(books); // تعيين الكتب المصفاة أيضًا
          }
        } else {
          setFavoriteBooks(parsedData);
          setFilteredBooks(parsedData); // تعيين الكتب المصفاة أيضًا
        }
      } catch (error) {
        console.error("Error parsing favorite books:", error);
      }
    }
  }, []);

  // إضافة useEffect لتصفية الكتب عند تغيير قيمة البحث
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredBooks(favoriteBooks);
    } else {
      const filtered = favoriteBooks.filter(book => 
        book.volumeInfo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.volumeInfo.authors?.some(author =>
          author.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
      setFilteredBooks(filtered);
    }
  }, [searchQuery, favoriteBooks]);

  const handleRemoveFromFavorites = (book: Book) => {
    if (window.confirm('Are you sure you want to remove this book from favorites?')) {
      const updatedFavorites = favoriteBooks.filter(b => b.id !== book.id);
      setFavoriteBooks(updatedFavorites);
      localStorage.setItem('favoriteBookDetails', JSON.stringify(updatedFavorites));
      const favoriteIds = updatedFavorites.map(b => b.id);
      localStorage.setItem('favoriteBooks', JSON.stringify(favoriteIds));
    }
  };

  const handleMarkAsRead = (book: Book) => {
    const savedReadBooksDetails = JSON.parse(localStorage.getItem('readBooksDetails') || '[]');

    if (!readBooks.includes(book.id)) {
      const updatedReadBooks = [...readBooks, book.id];
      const updatedReadBooksDetails = [...savedReadBooksDetails, book];

      localStorage.setItem('readBooksDetails', JSON.stringify(updatedReadBooksDetails));
      localStorage.setItem('readBooks', JSON.stringify(updatedReadBooks));
      setReadBooks(updatedReadBooks);
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
