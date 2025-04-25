import React, { useEffect, useState } from 'react';
import styles from '../styles/BookList.module.css';
import BookSearchBar from './SearchBar';
import BookCard from './BookCard';
import useBookSearchStore from '../store/bookSearchStore';

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
  const { searchTerm, setSearchTerm } = useBookSearchStore(); // 🟢 Added setSearchTerm

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
          }
        } else {
          setFavoriteBooks(parsedData);
        }
      } catch (error) {
        console.error("Error parsing favorite books:", error);
      }
    }
  }, []);

  const filteredBooks = favoriteBooks.filter(book =>
    book.volumeInfo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.volumeInfo.authors?.some(author =>
      author.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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
      {/* 🟢 Passing props to BookSearchBar */}
      <BookSearchBar 
        searchQuery={searchTerm} 
        setSearchQuery={setSearchTerm}
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
