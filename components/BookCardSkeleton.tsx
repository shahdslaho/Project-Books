import React from 'react';
import skeletonStyles from '../styles/Skeleton.module.css';

const BookCardSkeleton = () => (
  <div className={skeletonStyles.skeletonCard}>
    <div className={skeletonStyles.skeletonImage} />
    <div className={skeletonStyles.skeletonTitle} />
    <div className={skeletonStyles.skeletonAuthor} />
    <div className={skeletonStyles.skeletonButtons}>
      <div className={skeletonStyles.skeletonButton} />
      <div className={skeletonStyles.skeletonButton} />
    </div>
  </div>
);

export default BookCardSkeleton;