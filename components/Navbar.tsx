import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Navbar.module.css';
import { FaHeart, FaBook } from 'react-icons/fa';

const Navbar: React.FC = () => {  // حذف NavbarProps لأنه ما في داعي للـ activePage
  const router = useRouter();
  const currentPath = router.pathname;

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoText}>Book</span>
          <FaBook className={styles.logoIcon} />
        </Link>
      </div>
      
      <div className={styles.navLinks}>
        <Link href="/" className={`${styles.navLink} ${currentPath === '/' ? styles.active : ''}`}>
          Home
        </Link>
        <Link href="/books" className={`${styles.navLink} ${currentPath === '/books' ? styles.active : ''}`}>
          Books
        </Link>
        <Link href="/read" className={`${styles.navLink} ${currentPath === '/read' ? styles.active : ''}`}>
          Read
        </Link>
        <Link href="/favorites" className={`${styles.navLink} ${currentPath === '/favorites' ? styles.active : ''}`}>
          <FaHeart 
            className={`${styles.navFavoriteIcon} ${currentPath === '/favorites' ? styles.active : ''}`}
            title="Favorites"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
