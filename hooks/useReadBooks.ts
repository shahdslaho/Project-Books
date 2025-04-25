import { useState, useEffect } from 'react';

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

export const useReadBooks = () => {
  // State for managing read books, filtered results and search query
  const [readBooks, setReadBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Load saved books from localStorage on component mount
  useEffect(() => {
    const savedBooks = localStorage.getItem('readBooksDetails');
    if (savedBooks) {
      const books = JSON.parse(savedBooks);
      setReadBooks(books);
      setFilteredBooks(books);
    }
  }, []);

  // Filter books based on search query
  useEffect(() => {
    const filtered = readBooks.filter(book => 
      book.volumeInfo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.volumeInfo.authors?.some(author => 
        author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredBooks(filtered);
  }, [searchQuery, readBooks]);

  // Handle removing a book from read list
  const handleRemoveBook = (book: Book) => {
    if (window.confirm('Are you sure you want to remove this book from read list?')) {
      // Remove book from state
      const updatedBooks = readBooks.filter(b => b.id !== book.id);
      setReadBooks(updatedBooks);
      
      // Update localStorage with new book list
      localStorage.setItem('readBooksDetails', JSON.stringify(updatedBooks));
      localStorage.setItem('readBooks', JSON.stringify(updatedBooks.map(b => b.id)));
    }
  };

  // Return values and functions needed by components
  return {
    readBooks,
    filteredBooks,
    searchQuery,
    setSearchQuery,
    handleRemoveBook
  };
};
