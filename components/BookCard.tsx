import React from 'react';
import { FaHeart, FaRegHeart, FaTrash, FaCheck, FaBook } from 'react-icons/fa';
import styles from '../styles/BookCard.module.css';
import { Book } from '../types/Book';


interface BookCardProps {
  book: Book;
  isFavorite?: boolean;
  isRead?: boolean;
  onFavorite?: (book: Book) => void;
  onRemove?: (book: Book) => void;
  onMarkAsRead?: (book: Book) => void;
  showFavorite?: boolean;
  showRead?: boolean;
}

const BookCard = ({ 
  book, 
  isFavorite = false,
  isRead = false,
  onFavorite,
  onRemove,
  onMarkAsRead,
  showFavorite = true,
  showRead = true
}: BookCardProps) => {
  return (
    <div className={styles.bookCard}>
      <div className={styles.imageContainer}>
        {book.volumeInfo?.imageLinks?.thumbnail ? (
          <img 
            src={book.volumeInfo.imageLinks.thumbnail} 
            alt={book.volumeInfo.title}
            className={styles.bookImage}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://via.placeholder.com/128x192?text=No+Image';
            }}
          />
        ) : (
          <div className={styles.noImage}>No image available</div>
        )}
      </div>

      <h2 className={styles.title}>{book.volumeInfo?.title || 'Unknown Title'}</h2>

      {book.volumeInfo.authors && (
        <p className={styles.author}>
          Author: {book.volumeInfo.authors.join(', ')}
        </p>
      )}

      <div className={styles.buttonContainer}>
        {book.volumeInfo?.previewLink && (
          <a 
            href={book.volumeInfo.previewLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.button}
          >
            <FaBook className={styles.checkIcon} />
            <span className={styles.buttonText}>Read</span>
          </a>
        )}

        {showRead && onMarkAsRead && (
          <button 
            onClick={() => onMarkAsRead(book)}
            className={`${styles.button} ${isRead ? styles.readButton : ''}`}
          >
            <FaCheck className={styles.checkIcon} />
            <span className={styles.buttonText}>
              {isRead ? 'Done' : 'Read'}
            </span>
          </button>
        )}

        {onRemove && (
          <button 
            onClick={() => onRemove(book)}
            className={styles.button}
            title="Remove"
          >
            <FaTrash className={styles.checkIcon} />
            <span className={styles.buttonText}>Delete</span>
          </button>
        )}

        {showFavorite && onFavorite && (
          <button 
            onClick={() => onFavorite(book)}
            className={styles.heartButton}
            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? (
              <FaHeart className={`${styles.heartIcon} ${styles.filled}`} />
            ) : (
              <FaRegHeart className={styles.heartIcon} />
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default BookCard;
