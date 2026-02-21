import { useState } from 'react';
import { reviewApi } from '../services/api';

export const useCodeReview = () => {
  const [review, setReview] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const reviewCode = async (code, language) => {
    if (!code?.trim()) {
      setError('Please write some code first!');
      return false;
    }

    setIsLoading(true);
    setError(null);
    setReview('');

    try {
      const reviewData = await reviewApi.getReview(code, language);
      setReview(reviewData);
      return true;
    } catch (err) {
      setError(err.message || 'Failed to get review. Please check your connection.');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    review,
    isLoading,
    error,
    reviewCode,
    setReview,
    setError
  };
};