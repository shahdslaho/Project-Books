import React from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from '../styles/BookList.module.css';
import SearchBar from './SearchBar';
import BookCard from './BookCard';
import LoadingMessage from './BookCardSkeleton';
import { useBooks } from '../hooks/useBooks';
import { Book } from '../types/Book'; 
export default function Books() {
  const {
    books,
    hasMore,
    query,
    readBooks,
    favorites,
    handleSearch,
    fetchMoreData,
    handleFavorite, 
    handleMarkAsRead, 
    setQuery
  } = useBooks();

  return (
    <div className={styles.container}>
      <SearchBar
        searchQuery={query}
        setSearchQuery={(value) => {
          setQuery(value);
          handleSearch({ target: { value } } as React.ChangeEvent<HTMLInputElement>);
        }}
        placeholder="Search books..."
      />

      <InfiniteScroll
        dataLength={books.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<LoadingMessage />}
        endMessage={
          <p style={{ textAlign: 'center', margin: '20px 0' }}>
            <b>All books loaded</b>
          </p>
        }
      >
        <div className={styles.booksGrid}>
          {books.map((book) => {
            // تحويل الكتاب إلى النوع المتوقع بشكل صريح
            const bookForCard: Book = {
              id: book.id,
              volumeInfo: {
                title: book.volumeInfo.title,
                authors: book.volumeInfo.authors,
                imageLinks: book.volumeInfo.imageLinks,
                previewLink: book.volumeInfo.previewLink
              }
            };
            
            return (
              <BookCard
                key={book.id}
                book={bookForCard}
                isFavorite={favorites.includes(book.id)}
                isRead={readBooks.includes(book.id)}
                onFavorite={handleFavorite}
                onMarkAsRead={handleMarkAsRead}
              />
            );
          })}
        </div>
      </InfiniteScroll>
    </div>
  );
}
