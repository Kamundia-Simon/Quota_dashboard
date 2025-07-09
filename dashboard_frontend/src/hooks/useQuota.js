import { useState, useEffect } from 'react';
import { fetchQuotaData } from '../services/api';

export const useQuota = (surveyId) => {
  const [quotaData, setQuotaData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!surveyId) return;
      
      try {
        setLoading(true);
        setError(null);
        const data = await fetchQuotaData(surveyId);
        setQuotaData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [surveyId]);

  return {
    quotaData,
    loading,
    error
  };
};