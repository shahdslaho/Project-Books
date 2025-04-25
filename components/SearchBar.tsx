import React from 'react';
import { FaSearch } from 'react-icons/fa';
import styles from '../styles/SearchBar.module.css';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  placeholder?: string;
}

const SearchBar = ({ searchQuery, setSearchQuery, placeholder = "Search in favorite books..." }: SearchBarProps) => {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchInputWrapper}>
        <FaSearch className={styles.searchIcon} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className={styles.searchInput}
        />
      </div>
    </div>
  );
};

export default SearchBar;