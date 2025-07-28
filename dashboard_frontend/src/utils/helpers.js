// Date formatting utility
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-UK', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Status color mapping
export const getStatusColor = (status) => {
  switch (status) {
    case 'Minimum reached':
      return 'text-black-600 bg-green-100';
    case 'In progress':
      return 'text-black-600 bg-blue-100';
    case 'Maximum reached':
      return 'text-black-600 bg-red-100';
    case 'Over target':
      return 'text-black-600 bg-yellow-100'
  }
};

// Over target color mapping
export const getOverTargetColor = (allowOverTarget) => {
  switch (allowOverTarget) {
    case 'Always':
      return 'text-black-600 bg-blue-100';
    case 'Never':
      return 'text-black-600 bg-blue-100';
    case 'Agent decides':
      return 'text-black-600 bg-blue-100';
    case 'Survey routing':
      return 'text-black-600 bg-blue-100';
    default:
      return 'text-black-600 bg-blue-100';
  }
};

// Progress percentage calculation
export const getProgressPercentage = (completed, minTarget) => {
  return Math.min((completed / minTarget) * 100, 150);
};
