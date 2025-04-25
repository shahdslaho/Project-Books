import { useState, useEffect } from 'react';
import { Book } from '../types/Book';

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [readBooks, setReadBooks] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [query, setQuery] = useState<string>('');
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
  
  const maxResults = 20;

  const fetchBooks = async (start: number, searchQuery: string): Promise<Book[]> => {
    try {
      setLoading(true);
      const finalQuery = searchQuery.trim() || 'javascript';
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(finalQuery)}&maxResults=${maxResults}&startIndex=${start}&langRestrict=ar`
      );
      
      if (!response.ok) {
        throw new Error(`Connection error: ${response.status}`);
      }
      
      const data = await response.json();
      const newBooks = data.items || [];
      
      if (newBooks.length < maxResults) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
      
      return newBooks;
    } catch (err) {
      setError((err as Error).message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    const timeout = setTimeout(async () => {
      setStartIndex(0);
      const searchResults = await fetchBooks(0, newQuery);
      setBooks(searchResults);
    }, 500);

    setSearchTimeout(timeout);
  };

  const fetchMoreData = async () => {
    if (!loading) {
      const nextIndex = startIndex + maxResults;
      const newBooks = await fetchBooks(nextIndex, query);
      if (newBooks.length > 0) {
        setBooks(prevBooks => [...prevBooks, ...newBooks]);
        setStartIndex(nextIndex);
      }
    }
  };

  const handleFavorite = (book: Book) => {
    const newFavorites = favorites.includes(book.id) 
      ? favorites.filter(id => id !== book.id)
      : [...favorites, book.id];
  
    const savedBooks = JSON.parse(localStorage.getItem('favoriteBookDetails') || '[]');
    const updatedBooks = savedBooks.filter((b: Book) => b.id !== book.id);
    
    if (!favorites.includes(book.id)) {
      updatedBooks.push(book);
    }
  
    localStorage.setItem('favoriteBookDetails', JSON.stringify(updatedBooks));
    setFavorites(newFavorites);
    localStorage.setItem('favoriteBooks', JSON.stringify(newFavorites));
  };

  const handleMarkAsRead = (book: Book) => {
    const newReadBooks = [...readBooks];
    const bookIndex = newReadBooks.indexOf(book.id);
    
    if (bookIndex === -1) {
      newReadBooks.push(book.id);
      const savedBooks = JSON.parse(localStorage.getItem('readBooksDetails') || '[]');
      savedBooks.push(book);
      localStorage.setItem('readBooksDetails', JSON.stringify(savedBooks));
    } else {
      newReadBooks.splice(bookIndex, 1);
      const savedBooks = JSON.parse(localStorage.getItem('readBooksDetails') || '[]');
      const filteredBooks = savedBooks.filter((savedBook: Book) => savedBook.id !== book.id);
      localStorage.setItem('readBooksDetails', JSON.stringify(filteredBooks));
    }
    
    setReadBooks(newReadBooks);
    localStorage.setItem('readBooks', JSON.stringify(newReadBooks));
  };

  useEffect(() => {
    const loadInitialData = async () => {
      const initialBooks = await fetchBooks(0, query);
      setBooks(initialBooks);
      
      const savedReadBooks = localStorage.getItem('readBooks');
      const savedFavorites = localStorage.getItem('favoriteBooks');
      
      if (savedReadBooks) setReadBooks(JSON.parse(savedReadBooks));
      if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    };

    loadInitialData();
  }, []);

  return {
    books,
    loading,
    error,
    hasMore,
    query,
    readBooks,
    favorites,
    handleSearch,
    fetchMoreData,
    handleFavorite,
    handleMarkAsRead,
    setQuery
  };
};