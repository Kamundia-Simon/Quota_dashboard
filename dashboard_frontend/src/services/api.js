// API configuration
const API_BASE_URL = 'http://localhost:8000';

// API service functions
export const fetchSurveys = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/surveys/running`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching surveys:', error);
    throw new Error('Failed to fetch surveys. Please check your connection.');
  }
};

export const fetchQuotaData = async (surveyId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/surveys/${surveyId}/quota`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching quota data:', error);
    throw new Error('Failed to fetch quota data. Please check your connection.');
  }
};