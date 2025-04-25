import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import useBookSearchStore from '../store/bookSearchStore';
import styles from '../styles/SearchBar.module.css';

const BookSearchBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { searchTerm, setSearchTerm } = useBookSearchStore();

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  // وظيفة toggleSearch
  const toggleSearch = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm(''); // إفراغ البحث عند إغلاق الشريط
    }
  };

  return (
    <div className={styles.searchContainer}>
      {/* زر لتبديل حالة شريط البحث */}
      <button onClick={toggleSearch} className={styles.toggleButton}>
        {isOpen ? 'Close Search' : 'Open Search'}
      </button>

      {/* عرض شريط البحث فقط إذا كانت isOpen = true */}
      {isOpen && (
        <div className={styles.searchInputWrapper}>
          <div className={styles.iconContainer}>
            <FaSearch className={styles.searchIcon} />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search books..."
            className={styles.searchInput}
          />
        </div>
      )}
    </div>
  );
};

export default BookSearchBar;
