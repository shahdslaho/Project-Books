import Navbar from '../components/Navbar';
import styles from '../styles/Home.module.css';

export default function Home() {
  const navigateToBooks = () => {
    window.location.href = '/books'; // Adjust the path as necessary
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.backgroundSection}>
          <div className={`${styles.glassCard} ${styles.swingingCard}`}>
            <h1 className={styles.title}>Online library</h1>
            <p className={styles.description}>
              Welcome to this cultural space, created specifically for programming enthusiasts and those who love learning its various languages.
              In our library, which is a distinguished collection of books covering multiple levels,
              We believe that programming is the language of the future, and that learning it is a step toward creative innovation.
              Whether you are a beginner learning the basics of programming or a professional programmer, our library is the right place for you.
              We are here to make your learning journey enjoyable, diverse, and beneficial.
            </p>
            <button className={styles.button} onClick={navigateToBooks}>
              Read More
            </button>
          </div>
        </div>
      </div>
    </>
  );
}